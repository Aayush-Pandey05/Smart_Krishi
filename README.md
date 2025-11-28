# 🌱Smart_Krishi

An intelligent web application and a app for farmers that provides data-driven crop, fertilizer and disease recommendations — empowering agricultural decisions.  
Repository: [https://github.com/sharma-2712/Smart_Krishi](https://github.com/sharma-2712/Smart_Krishi)

---

## 🔍 Overview  
Smart_Krishi is a full-stack solution built to help farmers optimise yield, reduce losses and make informed farming decisions. It combines machine-learning models (for crop and fertilizer suggestion) with image-based disease detection and a friendly user interface.

---

## 🎯 Key Features  
-🌾 Crop Recommendation
Predicts the most suitable crop based on soil nutrients (N, P, K), pH, temperature, humidity, and rainfall.

-🧪 Fertilizer Recommendation
Suggests the best fertilizer and optimal nutrient adjustments depending on crop and soil composition.

-🍃 Disease Detection
Upload a leaf image → the model detects disease and provides remedial measures.

📊 Simple & Interactive UI
Frontend allows farmers to easily input values and view predictions.

🖥 Backend API Services
ML models are deployed as REST APIs to provide predictions in real time.

---

## 🧰 Tech Stack  
- Frontend: JavaScript, (React / Vue / plain, adjust if needed)  
- Backend: Python (Flask / FastAPI) for ML-models + Node.js/Express if applicable.  
- Machine Learning: scikit-learn (for crop/fertilizer), deep learning / CNN (for disease detection).  
- Data: soil & weather datasets, image datasets.  
- Database: (MongoDB / MySQL / SQLite) – adjust accordingly.  
- Others: Docker (optional), version control with Git, etc.

---

## 🗂️ Folder Structure  
-frontend → UI source code</br>
-backend → API + ML models</br>
-models → Trained model files (pickle / joblib / torch)</br>
-data → Dataset samples (for training/testing)</br>
-README.md → This file



---

## 🚀 Getting Started (Local Setup)  
### Prerequisites  
- Python 3.x  
- Node.js & npm (if frontend uses Node)  
- Git  
- (Optional) Virtual environment tool (venv / conda)  

### Installation & Running  

### Clone repository  
```bash
git clone https://github.com/sharma-2712/Smart_Krishi.git  
cd Smart_Krishi
```
---
### Back-end setup  
```bash

cd backend  
python3 -m venv venv  
source venv/bin/activate   # (Windows: venv\Scripts\activate)  
pip install -r requirements.txt  
# Add any .env or config files (e.g., MONGODB_URI, SECRET_KEY)  
python main.py             # or uvicorn app:app --reload

```
---
### Front-end setup
```bash

cd ../frontend  
npm install  
npm start

```
Create a .env file (if required):
```bash

MONGODB_URI=your_database_url
SECRET_KEY=your_secret_key

```
**Run backend:**
```bash

python main.py
# or
uvicorn app:app --reload

```
**Frontend Setup**
```bash

cd ../frontend
npm install
npm start

```

**📥 API Endpoints (General)**
```bash
POST /crop-recommend
POST /fertilizer-recommend
POST /disease-detect

```
---
**📌 Future Enhancements**

-Weather API integration</br>

-Yield prediction module</br>

-Voice-based farmer assistant</br>

-Region-wise crop performance analytics</br>

-Offline mode support</br>



