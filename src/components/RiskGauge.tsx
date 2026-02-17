import { motion } from "framer-motion";

interface RiskGaugeProps {
  percentage: number;
  status: string;
}

const RiskGauge = ({ percentage, status }: RiskGaugeProps) => {
  const circumference = 2 * Math.PI * 90;
  const progress = (percentage / 100) * circumference * 0.75; // 270 degrees
  const rotation = 135; // start from bottom-left

  const getColor = () => {
    if (percentage < 40) return "hsl(var(--risk-low))";
    if (percentage < 70) return "hsl(var(--risk-moderate))";
    return "hsl(var(--risk-high))";
  };

  const getGlowClass = () => {
    if (percentage < 40) return "glow-green";
    if (percentage < 70) return "glow-amber";
    return "glow-red";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`glass-card rounded-2xl p-8 flex flex-col items-center ${getGlowClass()}`}
    >
      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Fire Risk Index
      </h3>
      <div className="relative w-56 h-56">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-[135deg]">
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getColor()}
            strokeWidth="12"
            strokeDasharray={`${progress} ${circumference - progress}`}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${progress} ${circumference - progress}` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl font-bold font-mono"
            style={{ color: getColor() }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {percentage}%
          </motion.span>
          <span className="text-sm text-muted-foreground mt-1 uppercase tracking-wider font-semibold">
            {status}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskGauge;
