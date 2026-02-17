# 🔥 Wildfire Risk Intelligence

An advanced, real-time AI-powered system designed to predict wildfire risks by analyzing meteorological data. This application integrates live weather updates with a custom Machine Learning model to provide actionable safety insights.

### 🌐 Live Demo
👉 **[View the Dashboard](https://ww3carla.github.io/Forest-Fire-Prediction-Frontend/)**

---

## 🌍 Overview
Wildfire Risk Intelligence bridge the gap between complex environmental data and user-friendly safety monitoring. By combining real-time API data with AI, the system evaluates:

* 🌡 **Live Meteorological Conditions**: Fetching current data for any city.
* 🤖 **AI Prediction**: Using a custom model hosted on Hugging Face.
* 📊 **Visual Analytics**: Dynamic gauges and risk classifications.
* 🗺 **Geospatial Context**: Map integration for location tracking.

---

## 🚀 Key Features
* **Intelligent Lookup**: City-based search powered by the OpenWeather API.
* **AI Assessment**: Real-time inference from a FastAPI-based AI model.
* **Interactive UI**: Modern dashboard with high-visibility risk gauges.
* **Smart Recommendations**: Dynamic safety tips based on calculated risk levels.
* **Dark Mode Aesthetic**: A professional, high-contrast UI designed for clarity.
* **Mobile Responsive**: Optimized for use on desktops, tablets, and smartphones.

---

## 🛠 Tech Stack

### Frontend
* **Vite & React**: For a high-performance, reactive user interface.
* **TypeScript**: Ensuring code reliability and type safety.
* **Tailwind CSS & shadcn/ui**: For modern, accessible, and fast styling.
* **React Query**: Efficient server-state management for API calls.

### Backend & AI
* **Python (FastAPI)**: High-performance API serving the ML model.
* **Machine Learning**: Custom-trained model (Random Forest/XGBoost).
* **Hugging Face Spaces**: Cloud hosting for the AI inference engine.

---

## 🔌 API Integration

### ☁️ Weather Data
`https://api.openweathermap.org/data/2.5/weather`

### 🤖 AI Prediction Engine
`https://carlaww3-fire-prediction-api.hf.space/predict`
*(Backend repository available [here](URL_CATRE_REPO_BACKEND))*

---

## 📊 How It Works
1.  **Input**: User searches for a city.
2.  **Fetch**: Application retrieves temperature, humidity, and wind speed.
3.  **Process**: Weather data is sent to the Hugging Face AI endpoint.
4.  **Analyze**: The model calculates the ignition and spread probability.
5.  **Visualize**: The dashboard renders the risk percentage, status (Low to Extreme), and safety protocols.

---

## 👩‍💻 Author
**Carla Bozintan**
