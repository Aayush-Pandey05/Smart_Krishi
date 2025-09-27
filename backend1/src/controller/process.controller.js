import DiseaseDetection from '../models/data.model.js';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/disease-images');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `disease-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
    }
  }
});

// Backend2 (FastAPI) configuration
const BACKEND2_URL = process.env.BACKEND2_URL || 'http://localhost:5000';

const processRequest = async (req, res) => {
  const startTime = Date.now();
  let savedRecord = null;
  
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Create initial record in database
    savedRecord = new DiseaseDetection({
      userId,
      imagePath: req.file.path,
      originalFilename: req.file.originalname,
      status: 'processing'
    });
    await savedRecord.save();

    // Prepare form data for Backend2
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path));

    // Send request to Backend2 (FastAPI model)
    console.log(`🔄 Sending image to Backend2: ${BACKEND2_URL}/predict`);
    
    const modelResponse = await axios.post(`${BACKEND2_URL}/predict`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 30000 // 30 second timeout
    });

    if (!modelResponse.data.success) {
      throw new Error('Model prediction failed');
    }

    const { predictions, model_info } = modelResponse.data;
    const topPrediction = predictions[0]; // First prediction is the highest confidence

    // Get AI recommendations from Backend2
    console.log('🤖 Getting AI recommendations...');
    const recommendationResponse = await axios.post(`${BACKEND2_URL}/get-recommendations`, {
      disease: topPrediction.disease,
      confidence: topPrediction.confidence,
      plant_type: extractPlantType(topPrediction.disease)
    }, {
      timeout: 30000
    });

    const aiRecommendation = recommendationResponse.data.recommendation;

    // Update the database record
    const processingTime = Date.now() - startTime;
    
    savedRecord.predictions = predictions;
    savedRecord.topPrediction = topPrediction;
    savedRecord.aiRecommendation = aiRecommendation;
    savedRecord.modelInfo = model_info;
    savedRecord.processingTime = processingTime;
    savedRecord.status = 'completed';
    
    await savedRecord.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Disease detection completed successfully',
      data: {
        id: savedRecord._id,
        predictions: predictions,
        topPrediction: topPrediction,
        aiRecommendation: aiRecommendation,
        processingTime: processingTime,
        modelInfo: model_info,
        createdAt: savedRecord.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Error in processRequest:', error.message);
    
    // Update record status to failed if it exists
    if (savedRecord) {
      savedRecord.status = 'failed';
      await savedRecord.save().catch(console.error);
    }

    // Handle different types of errors
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: 'AI model service is currently unavailable. Please try again later.',
        error: 'SERVICE_UNAVAILABLE'
      });
    }

    if (error.response?.status === 400) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format or corrupted file',
        error: 'INVALID_IMAGE'
      });
    }

    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your image',
      error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_ERROR'
    });
  } finally {
    // Clean up uploaded file if processing failed
    if (req.file && savedRecord?.status === 'failed') {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Failed to cleanup file:', cleanupError.message);
      }
    }
  }
};

// Get user's disease detection history
const getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, status } = req.query;

    const query = { userId };
    if (status) query.status = status;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      select: 'topPrediction aiRecommendation status createdAt originalFilename processingTime'
    };

    const results = await DiseaseDetection.paginate(query, options);

    res.status(200).json({
      success: true,
      data: results.docs,
      pagination: {
        currentPage: results.page,
        totalPages: results.totalPages,
        totalResults: results.totalDocs,
        hasNext: results.hasNextPage,
        hasPrev: results.hasPrevPage
      }
    });

  } catch (error) {
    console.error('Error fetching user history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch detection history'
    });
  }
};

// Get specific detection details
const getDetectionDetails = async (req, res) => {
  try {
    const { detectionId } = req.params;
    const { userId } = req.query;

    const detection = await DiseaseDetection.findOne({
      _id: detectionId,
      userId: userId
    });

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: 'Detection record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: detection
    });

  } catch (error) {
    console.error('Error fetching detection details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch detection details'
    });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const stats = await DiseaseDetection.getUserStats(userId);
    const recentPredictions = await DiseaseDetection.getRecentPredictions(userId, 5);

    const totalDetections = stats.reduce((sum, stat) => sum + stat.count, 0);
    const successfulDetections = stats.find(s => s._id === 'completed')?.count || 0;
    const avgConfidence = stats.find(s => s._id === 'completed')?.avgConfidence || 0;

    res.status(200).json({
      success: true,
      data: {
        totalDetections,
        successfulDetections,
        successRate: totalDetections > 0 ? (successfulDetections / totalDetections * 100).toFixed(1) : 0,
        averageConfidence: avgConfidence.toFixed(1),
        recentPredictions: recentPredictions
      }
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics'
    });
  }
};

// Helper function to extract plant type from disease name
const extractPlantType = (diseaseName) => {
  const plantTypes = ['Apple', 'Tomato', 'Potato', 'Corn', 'Grape', 'Cherry', 'Peach', 'Pepper', 'Strawberry', 'Blueberry', 'Orange', 'Raspberry', 'Soybean', 'Squash'];
  
  for (const plant of plantTypes) {
    if (diseaseName.toLowerCase().includes(plant.toLowerCase())) {
      return plant;
    }
  }
  return 'Unknown';
};

export {
  upload,
  processRequest,
  getUserHistory,
  getDetectionDetails,
  getUserStats
};

// Create the upload middleware
export const uploadMiddleware = upload.single('image');