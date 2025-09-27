import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import dotenv from "dotenv";
import Irrigation from "../models/irrigation.model.js";

dotenv.config();

// Input validation schema
const IrrigationRequestSchema = z.object({
  location: z.string().min(1, "Location is required"),
  cropType: z.string().min(1, "Crop type is required"),
  soilType: z.enum(["Loam", "Clay", "Sandy", "Silt"]),
  plantingDate: z.string().optional(),
  lastIrrigation: z.string().optional(),
  weatherData: z
    .object({
      temp: z.number(),
      humidity: z.number(),
      wind: z.number(),
      precip: z.number(),
      condition: z.string(),
      city: z.string(),
      forecast: z.array(z.any()).optional(),
    })
    .optional(),
});

// Initialize OpenAI model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Create the prompt template
const irrigationPromptTemplate = ChatPromptTemplate.fromTemplate(`
You are an expert agricultural irrigation advisor with extensive knowledge of crop water requirements, soil types, and weather patterns. 

Based on the following information, provide specific, actionable irrigation recommendations:

FARM DETAILS:
- Location: {location}
- Crop Type: {cropType}
- Soil Type: {soilType}
- Planting Date: {plantingDate}
- Last Irrigation: {lastIrrigation}

CURRENT WEATHER CONDITIONS:
- Temperature: {temperature}°C
- Humidity: {humidity}%
- Wind Speed: {windSpeed} km/h
- Recent Precipitation: {precipitation}mm
- Weather Condition: {weatherCondition}

TASK: Provide comprehensive irrigation advice in the following format:

**Irrigation Recommendation:**
[Provide specific irrigation timing, frequency, and amount recommendations based on the crop, soil, and weather conditions]

**Fertilization Advice:**
[Recommend fertilization timing and types that complement the irrigation schedule]

**Pest & Disease Control:**
[Advise on pest and disease management considering the moisture conditions and crop type]

**Additional Tips:**
[Include any other relevant agricultural advice for optimal crop health]

Keep recommendations practical, specific, and suitable for the given crop and conditions. Consider water efficiency and sustainable farming practices.
`);

// Create the chain
const outputParser = new StringOutputParser();
const chain = irrigationPromptTemplate.pipe(model).pipe(outputParser);

export const getIrrigationAdvice = async (req, res) => {
  const startTime = Date.now();
  let savedRecord = null;

  try {
    // Validate input
    const validatedData = IrrigationRequestSchema.parse(req.body);

    const {
      location,
      cropType,
      soilType,
      plantingDate,
      lastIrrigation,
      weatherData,
    } = validatedData;

    // Get userId from the authenticated user (from auth middleware)
    console.log("User object:", req.user); // Debug log
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API key is not configured",
      });
    }

    console.log(
      `Getting irrigation advice for ${cropType} in ${location} for user ${userId}`
    );

    // Create initial record in database
    savedRecord = new Irrigation({
      userId,
      location,
      cropType,
      soilType,
      plantingDate: plantingDate || null,
      lastIrrigation: lastIrrigation || null,
      weatherData: weatherData || {},
      status: "pending",
    });

    // Prepare data for the AI model
    const promptData = {
      location: location,
      cropType: cropType,
      soilType: soilType,
      plantingDate: plantingDate || "Not specified",
      lastIrrigation: lastIrrigation || "Not specified",
      temperature: weatherData?.temp || "Not available",
      humidity: weatherData?.humidity || "Not available",
      windSpeed: weatherData?.wind || "Not available",
      precipitation: weatherData?.precip || "Not available",
      weatherCondition: weatherData?.condition || "Not available",
    };

    // Generate advice using LangChain
    const advice = await chain.invoke(promptData);

    // Parse the response to extract different sections
    const parsedAdvice = parseAdviceResponse(advice);

    // Calculate processing time
    const processingTime = Date.now() - startTime;

    // Update the record with the advice and mark as completed
    savedRecord.advice = parsedAdvice;
    savedRecord.processingTime = processingTime;
    savedRecord.status = "completed";

    await savedRecord.save();

    res.status(200).json({
      success: true,
      message: "Irrigation advice generated successfully",
      data: {
        id: savedRecord._id,
        location: location,
        cropType: cropType,
        soilType: soilType,
        advice: parsedAdvice,
        processingTime: processingTime,
        generatedAt: savedRecord.createdAt,
        weatherData: weatherData,
      },
    });
  } catch (error) {
    console.error("Error generating irrigation advice:", error);

    // Update record status to failed if it exists
    if (savedRecord) {
      savedRecord.status = "failed";
      savedRecord.processingTime = Date.now() - startTime;
      await savedRecord.save().catch(console.error);
    }

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
        errors: error.errors,
      });
    }

    if (error.message?.includes("API key")) {
      return res.status(401).json({
        success: false,
        message: "Invalid OpenAI API key",
      });
    }

    if (error.message?.includes("rate limit")) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to generate irrigation advice",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// Get user's irrigation history with pagination
export const getUserIrrigationHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50); // Max 50 records per request

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const result = await Irrigation.getUserHistory(userId, page, limit);

    res.status(200).json({
      success: true,
      message: "Irrigation history retrieved successfully",
      data: result.irrigations,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Error getting irrigation history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve irrigation history",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// Get specific irrigation advice details
export const getIrrigationDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const { irrigationId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const irrigation = await Irrigation.findOne({
      _id: irrigationId,
      userId: userId,
    });

    if (!irrigation) {
      return res.status(404).json({
        success: false,
        message: "Irrigation record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Irrigation details retrieved successfully",
      data: irrigation,
    });
  } catch (error) {
    console.error("Error getting irrigation details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve irrigation details",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// Get user's irrigation statistics
export const getUserIrrigationStats = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const stats = await Irrigation.getUserStats(userId);

    res.status(200).json({
      success: true,
      message: "Irrigation statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Error getting irrigation stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve irrigation statistics",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// Helper function to parse AI response into structured format
const parseAdviceResponse = (response) => {
  try {
    const sections = response.split("**").filter((section) => section.trim());

    let irrigation = "";
    let fertilization = "";
    let pest_control = "";
    let additional_tips = "";

    sections.forEach((section) => {
      const lowerSection = section.toLowerCase();
      if (lowerSection.includes("irrigation")) {
        irrigation = section.replace(/irrigation[^:]*:/i, "").trim();
      } else if (lowerSection.includes("fertilization")) {
        fertilization = section.replace(/fertilization[^:]*:/i, "").trim();
      } else if (lowerSection.includes("pest")) {
        pest_control = section.replace(/pest[^:]*:/i, "").trim();
      } else if (
        lowerSection.includes("additional") ||
        lowerSection.includes("tips")
      ) {
        additional_tips = section.replace(/additional[^:]*:/i, "").trim();
      }
    });

    // Fallback: if parsing fails, use the entire response
    if (!irrigation && !fertilization && !pest_control) {
      return {
        irrigation: response.substring(0, 300) + "...",
        fertilization:
          "Please follow standard fertilization practices for your crop type.",
        pest_control:
          "Monitor your crops regularly for signs of pests or diseases.",
        additional_tips:
          "Consult with local agricultural experts for region-specific advice.",
      };
    }

    return {
      irrigation:
        irrigation ||
        "Follow standard irrigation practices for your crop and soil type.",
      fertilization:
        fertilization ||
        "Apply balanced fertilizers according to your crop's growth stage.",
      pest_control:
        pest_control || "Implement integrated pest management practices.",
      additional_tips:
        additional_tips ||
        "Monitor soil moisture regularly and adjust irrigation based on weather conditions.",
    };
  } catch (error) {
    console.error("Error parsing advice response:", error);
    return {
      irrigation:
        "Unable to parse specific irrigation advice. Please consult with agricultural experts.",
      fertilization:
        "Apply fertilizers according to standard recommendations for your crop.",
      pest_control: "Follow integrated pest management practices.",
      additional_tips: "Regular monitoring of crop health is essential.",
    };
  }
};
