import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";

interface IntelligencePanelProps {
  status: string;
  recommendation: string;
  riskPercentage: number;
}

const IntelligencePanel = ({ status, recommendation, riskPercentage }: IntelligencePanelProps) => {
  const isHigh = riskPercentage >= 70;
  const isModerate = riskPercentage >= 40;

  const Icon = isHigh ? ShieldAlert : isModerate ? AlertTriangle : CheckCircle;
  const borderClass = isHigh ? "border-risk-high/40" : isModerate ? "border-warning/40" : "border-success/40";
  const glowClass = isHigh ? "glow-red" : isModerate ? "glow-amber" : "glow-green";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`glass-card rounded-2xl p-6 border ${borderClass} ${glowClass}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${isHigh ? 'bg-accent/20' : isModerate ? 'bg-warning/20' : 'bg-success/20'}`}>
          <Icon className={`h-5 w-5 ${isHigh ? 'text-accent' : isModerate ? 'text-warning' : 'text-success'}`} />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Intelligence Report
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Status Assessment</span>
          <p className="text-lg font-semibold text-foreground mt-1">{status}</p>
        </div>
        <div className="h-px bg-border" />
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Recommended Action</span>
          <p className="text-secondary-foreground mt-1 leading-relaxed">{recommendation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default IntelligencePanel;
