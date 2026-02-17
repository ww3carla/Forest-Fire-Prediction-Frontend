const OPENWEATHER_KEY = "cd9d797eae21c90f1023835e8ca4d8b2";
const HF_API = "https://carlaww3-fire-prediction-api.hf.space/predict";

export interface WeatherData {
  temp: number;
  wind: number;
  humidity: number;
  city: string;
  lat: number;
  lon: number;
  description: string;
  icon: string;
}

export interface FirePrediction {
  risk_percentage: number;
  status: string;
  recommendation: string;
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_KEY}`
  );
  if (!res.ok) throw new Error("City not found. Please check the name and try again.");
  const data = await res.json();
  return {
    temp: Math.round((data.main.temp - 273.15) * 10) / 10,
    wind: Math.round(data.wind.speed * 10) / 10,
    humidity: data.main.humidity,
    city: data.name,
    lat: data.coord.lat,
    lon: data.coord.lon,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

export async function fetchFirePrediction(weather: WeatherData): Promise<FirePrediction> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(HF_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      temp: weather.temp,
      wind: weather.wind,
      humidity: weather.humidity,
      vegetation: 0.5,
      soil_moisture: 0.3,
    }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if ([502, 503, 504].includes(res.status)) {
        throw new Error("API_SLEEPING");
      }
      throw new Error(`API_ERROR ${res.status}: ${text}`);
    }

    return await res.json();
  } catch (e: any) {
    clearTimeout(timeout);
    if (e.name === "AbortError") {
      throw new Error("API_SLEEPING");
    }
    throw e;
  }
}
