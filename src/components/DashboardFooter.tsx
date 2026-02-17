import { Github, Flame } from "lucide-react";

const DashboardFooter = () => (
  <footer className="border-t border-border mt-12 pt-6 pb-8">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-primary" />
        <span className="font-semibold text-foreground">Wildfire Risk Intelligence</span>
        <span className="hidden sm:inline">•</span>
        <span>Powered by AI &amp; Real-time Data</span>
      </div>
      <a
        href="https://github.com/ww3carla/Forest-Fire-Prediction-System"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        <Github className="h-4 w-4" />
        View Backend Source
      </a>
    </div>
  </footer>
);

export default DashboardFooter;
