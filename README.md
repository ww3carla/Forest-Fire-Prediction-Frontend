# 🔥 Wildfire Risk Intelligence

A real-time AI-powered wildfire risk prediction system built with React, TypeScript, and Machine Learning.

This application analyzes live weather data and generates wildfire risk predictions using a custom AI model deployed on Hugging Face.

---

## 🌍 Overview

Wildfire Risk Intelligence combines:

- 🌡 Real-time weather data
- 🤖 AI-based fire risk prediction
- 📊 Interactive dashboard visualization
- 🗺 Map-based location intelligence
- ⚠ Risk assessment & recommendations

The system provides an estimated wildfire risk percentage based on environmental conditions.

---

## 🚀 Features

- 🔎 City-based weather lookup
- 📡 Live weather data from OpenWeather API
- 🤖 AI wildfire prediction model (Hugging Face Space)
- 📊 Risk percentage gauge
- 🌎 Geographic coordinates mapping
- 📈 Dynamic risk classification (Low / Moderate / High)
- 💡 Smart safety recommendations
- 🌙 Modern dark UI design
- 📱 Fully responsive layout

---

## 🛠 Tech Stack

### Frontend
- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- React Query

### Backend / AI
- Python (FastAPI)
- Machine Learning model
- Deployed on Hugging Face Spaces

### APIs
- OpenWeather API (weather data)
- Custom Fire Prediction API (Hugging Face)

🔌 API Endpoints
Weather Data
https://api.openweathermap.org/data/2.5/weather
Fire Prediction Model
https://carlaww3-fire-prediction-api.hf.space/predict
📊 How It Works
User enters a city name.

Weather data is fetched from OpenWeather API.

Temperature, humidity, and wind speed are sent to the AI model.

The AI model calculates wildfire risk.

The frontend displays:

Risk percentage

Status classification

Safety recommendation

👩‍💻 Author
Carla Bozintan

