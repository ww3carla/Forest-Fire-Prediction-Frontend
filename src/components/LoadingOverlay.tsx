import { motion } from "framer-motion";
import { Flame, Satellite, Brain } from "lucide-react";

const steps = [
  { icon: Satellite, label: "Fetching satellite weather data..." },
  { icon: Brain, label: "Analyzing fire patterns via AI..." },
  { icon: Flame, label: "Calculating risk assessment..." },
];

const LoadingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center min-h-[400px] glow-amber"
    >
      {/* Scanning animation */}
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-primary/50"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
          <Flame className="h-8 w-8 text-primary" />
        </div>
      </div>

      <div className="space-y-3 text-center">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <step.icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
