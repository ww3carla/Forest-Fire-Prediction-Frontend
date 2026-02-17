import { motion } from "framer-motion";
import { Thermometer, Wind, Droplets } from "lucide-react";

interface WeatherCardsProps {
  temp: number;
  wind: number;
  humidity: number;
}

const cards = [
  { key: "temp", label: "Temperature", icon: Thermometer, unit: "°C", color: "text-primary" },
  { key: "wind", label: "Wind Speed", icon: Wind, unit: "m/s", color: "text-primary" },
  { key: "humidity", label: "Humidity", icon: Droplets, unit: "%", color: "text-primary" },
] as const;

const WeatherCards = ({ temp, wind, humidity }: WeatherCardsProps) => {
  const values = { temp, wind, humidity };

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
          className="glass-card rounded-xl p-4 text-center"
        >
          <card.icon className={`h-5 w-5 mx-auto mb-2 ${card.color}`} />
          <p className="text-2xl font-bold font-mono text-foreground">
            {values[card.key]}
            <span className="text-sm text-muted-foreground ml-1">{card.unit}</span>
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{card.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default WeatherCards;
