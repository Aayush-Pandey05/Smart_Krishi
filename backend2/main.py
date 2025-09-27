#!/usr/bin/env python3
"""
FastAPI Backend2 for Plant Disease Classification
Run with: uvicorn main:app --host 0.0.0.0 --port 5000 --reload
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import json
import time
import logging
from typing import List
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Plant Disease API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class PredictionResult(BaseModel):
    disease: str
    confidence: float
    class_id: int

class ModelInfo(BaseModel):
    classes: int
    input_size: str

class PredictionResponse(BaseModel):
    success: bool
    predictions: List[PredictionResult]
    model_info: ModelInfo
    processing_time: float

class RecommendationRequest(BaseModel):
    disease: str
    confidence: float
    plant_type: str

class AIRecommendation(BaseModel):
    treatment: str
    prevention: str
    fertilizers: List[str]
    watering_schedule: str
    general_care: str

class RecommendationResponse(BaseModel):
    success: bool
    recommendation: AIRecommendation
    confidence_level: str

class PlantDiseaseAPI:
    def __init__(self):
        self.model = None
        self.class_names = None
        self.img_height = 224
        self.img_width = 224
        self.llm = None
        self.load_model()
        self.load_classes()
        self.setup_ai()
    
    def setup_ai(self):
        openai_api_key = os.getenv('OPENAI_API_KEY')
        if openai_api_key:
            self.llm = ChatOpenAI(
                model="gpt-3.5-turbo",
                temperature=0.7,
                openai_api_key=openai_api_key
            )
            logger.info("AI recommendations enabled")
        else:
            logger.warning("OpenAI API key not found - using fallback recommendations")
    
    def load_model(self):
        model_path = "model/best_plant_disease_model.h5"
        if not os.path.exists(model_path):
            logger.error(f"Model not found at {model_path}")
            raise FileNotFoundError(f"Model not found at {model_path}")
        
        logger.info(f"Loading model from {model_path}")
        self.model = tf.keras.models.load_model(model_path)
        logger.info("Model loaded successfully")
    
    def load_classes(self):
        classes_file = "model/plant_disease_classes.json"
        
        if os.path.exists(classes_file):
            with open(classes_file, 'r') as f:
                self.class_names = json.load(f)
        else:
            self.class_names = [
                "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
                "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
                "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
                "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
                "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
                "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
                "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight",
                "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
                "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
                "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
                "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite",
                "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus",
                "Tomato___healthy"
            ]
            
            os.makedirs("model", exist_ok=True)
            with open(classes_file, 'w') as f:
                json.dump(self.class_names, f)
    
    def preprocess_image(self, image: Image.Image):
        image = image.resize((self.img_width, self.img_height))
        if image.mode != 'RGB':
            image = image.convert('RGB')
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    
    async def predict(self, image: Image.Image):
        processed_img = self.preprocess_image(image)
        predictions = self.model.predict(processed_img, verbose=0)
        top_indices = np.argsort(predictions[0])[::-1][:3]
        
        results = []
        for idx in top_indices:
            class_name = self.class_names[idx]
            confidence = float(predictions[0][idx] * 100)
            display_name = class_name.replace('___', ' - ').replace('_', ' ')
            
            results.append(PredictionResult(
                disease=display_name,
                confidence=round(confidence, 2),
                class_id=int(idx)
            ))
        
        return results
    
    async def get_recommendations(self, disease: str, confidence: float, plant_type: str):
        if self.llm:
            try:
                prompt = f"""You are an agricultural expert. Provide specific recommendations for:
                
Disease: {disease}
Plant: {plant_type}
Detection Confidence: {confidence}%

Provide practical advice in these categories:
1. Treatment (immediate action needed)
2. Prevention (long-term strategies)  
3. Fertilizers (specific types)
4. Watering (schedule and method)
5. General care (monitoring and maintenance)

Keep responses concise and actionable for farmers."""

                messages = [
                    SystemMessage(content="You are an expert agricultural consultant providing practical farming advice."),
                    HumanMessage(content=prompt)
                ]
                
                response = await self.llm.ainvoke(messages)
                return self.parse_ai_response(response.content, disease, plant_type)
                
            except Exception as e:
                logger.error(f"AI recommendation failed: {e}")
        
        return self.get_fallback_recommendations(disease, plant_type)
    
    def parse_ai_response(self, ai_response: str, disease: str, plant_type: str):
        # Simple parsing - you can enhance this
        lines = [line.strip() for line in ai_response.split('\n') if line.strip()]
        
        treatment = "Apply appropriate treatment based on disease type."
        prevention = "Maintain good plant hygiene and proper spacing."
        fertilizers = ["Balanced NPK fertilizer"]
        watering = "Water at soil level to avoid leaf wetness."
        general_care = "Monitor plants regularly for early detection."
        
        # Extract specific recommendations
        current_section = ""
        for line in lines:
            lower_line = line.lower()
            if 'treatment' in lower_line:
                current_section = "treatment"
            elif 'prevention' in lower_line:
                current_section = "prevention"
            elif 'fertilizer' in lower_line:
                current_section = "fertilizer"
            elif 'water' in lower_line:
                current_section = "watering"
            elif 'care' in lower_line or 'monitor' in lower_line:
                current_section = "care"
            elif current_section and not any(x in lower_line for x in ['treatment', 'prevention', 'fertilizer', 'water', 'care']):
                if current_section == "treatment":
                    treatment = line
                elif current_section == "prevention":
                    prevention = line
                elif current_section == "fertilizer":
                    fertilizers = [line]
                elif current_section == "watering":
                    watering = line
                elif current_section == "care":
                    general_care = line
        
        return AIRecommendation(
            treatment=treatment,
            prevention=prevention,
            fertilizers=fertilizers,
            watering_schedule=watering,
            general_care=general_care
        )
    
    def get_fallback_recommendations(self, disease: str, plant_type: str):
        disease_lower = disease.lower()
        
        if 'healthy' in disease_lower:
            return AIRecommendation(
                treatment="No treatment needed - plant is healthy",
                prevention="Continue current care routine and monitor regularly",
                fertilizers=["Balanced 10-10-10 NPK fertilizer"],
                watering_schedule="Water when soil is slightly dry",
                general_care="Maintain good air circulation and remove dead leaves"
            )
        elif any(term in disease_lower for term in ['blight', 'fungal', 'mold']):
            return AIRecommendation(
                treatment="Apply copper-based fungicide every 7-10 days",
                prevention="Improve air circulation, avoid overhead watering",
                fertilizers=["Low nitrogen fertilizer", "Potassium-rich fertilizer"],
                watering_schedule="Water at soil level early morning",
                general_care="Prune affected areas, apply mulch"
            )
        elif 'bacterial' in disease_lower:
            return AIRecommendation(
                treatment="Apply copper bactericide, remove infected parts",
                prevention="Avoid overhead watering, sterilize tools",
                fertilizers=["Balanced fertilizer with calcium"],
                watering_schedule="Drip irrigation preferred",
                general_care="Increase plant spacing, improve drainage"
            )
        else:
            return AIRecommendation(
                treatment="Identify pathogen and apply targeted treatment",
                prevention="Maintain plant health with proper nutrition",
                fertilizers=["Balanced NPK fertilizer"],
                watering_schedule="Consistent moisture without waterlogging",
                general_care="Regular monitoring and prompt action"
            )

# Initialize API
try:
    predictor = PlantDiseaseAPI()
    logger.info("Plant Disease API ready")
except Exception as e:
    logger.error(f"Failed to initialize API: {e}")
    predictor = None

@app.get("/")
async def root():
    return {"message": "Plant Disease Classification API", "status": "healthy"}

@app.post("/predict", response_model=PredictionResponse)
async def predict_disease(image: UploadFile = File(...)):
    if predictor is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    start_time = time.time()
    
    try:
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        image_data = await image.read()
        pil_image = Image.open(io.BytesIO(image_data))
        
        predictions = await predictor.predict(pil_image)
        processing_time = (time.time() - start_time) * 1000  # Convert to milliseconds
        
        model_info = ModelInfo(
            classes=len(predictor.class_names),
            input_size=f"{predictor.img_width}x{predictor.img_height}"
        )
        
        return PredictionResponse(
            success=True,
            predictions=predictions,
            model_info=model_info,
            processing_time=round(processing_time, 2)
        )
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/get-recommendations", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    if predictor is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        recommendation = await predictor.get_recommendations(
            disease=request.disease,
            confidence=request.confidence,
            plant_type=request.plant_type
        )
        
        confidence_level = "high" if request.confidence >= 80 else "medium" if request.confidence >= 60 else "low"
        
        return RecommendationResponse(
            success=True,
            recommendation=recommendation,
            confidence_level=confidence_level
        )
        
    except Exception as e:
        logger.error(f"Recommendation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        'status': 'healthy',
        'model_loaded': predictor is not None,
        'ai_available': predictor.llm is not None if predictor else False
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)