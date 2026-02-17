import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, AlertCircle, RefreshCw } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import RiskGauge from "@/components/RiskGauge";
import IntelligencePanel from "@/components/IntelligencePanel";
import WeatherCards from "@/components/WeatherCards";
import FireMap from "@/components/FireMap";
import LoadingOverlay from "@/components/LoadingOverlay";
import DashboardFooter from "@/components/DashboardFooter";
import { fetchWeather, fetchFirePrediction, type WeatherData, type FirePrediction } from "@/lib/api";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [prediction, setPrediction] = useState<FirePrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const w = await fetchWeather(city);
      setWeather(w);

      const p = await fetchFirePrediction(w);
      setPrediction(p);
    } catch (e: any) {
      if (e.message === "API_SLEEPING") {
        setError("Satellite link warming up... please retry in 30 seconds.");
      } else {
        setError(e.message || "An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Flame className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Wildfire Risk <span className="text-gradient-amber">Intelligence</span>
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                Real-time AI Threat Analysis
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Systems Online
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-xl p-6 border border-warning/30 glow-amber flex items-center gap-4 max-w-2xl mx-auto"
            >
              <AlertCircle className="h-6 w-6 text-warning shrink-0" />
              <div>
                <p className="text-foreground font-semibold">{error}</p>
                <button
                  onClick={() => weather && handleSearch(weather.city)}
                  className="text-sm text-primary hover:underline mt-1 flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" /> Retry Analysis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && <LoadingOverlay />}

        {/* Results */}
        <AnimatePresence>
          {!isLoading && weather && prediction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Top Row: Gauge + Intelligence */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RiskGauge percentage={prediction.risk_percentage} status={prediction.status} />
                <IntelligencePanel
                  status={prediction.status}
                  recommendation={prediction.recommendation}
                  riskPercentage={prediction.risk_percentage}
                />
              </div>

              {/* Weather Cards */}
              <WeatherCards temp={weather.temp} wind={weather.wind} humidity={weather.humidity} />

              {/* Map */}
              <FireMap lat={weather.lat} lon={weather.lon} riskPercentage={prediction.risk_percentage} city={weather.city} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!isLoading && !weather && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Flame className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Enter a location to begin wildfire risk analysis
            </p>
            <p className="text-muted-foreground/60 text-sm mt-2 font-mono">
              Powered by AI + Real-time Weather Intelligence
            </p>
          </motion.div>
        )}

        <DashboardFooter />
      </main>
    </div>
  );
};

export default Index;
