import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

export default function ProgressIndicator({ 
  progress, 
  size = 48, 
  strokeWidth = 4,
  showPercentage = false 
}: ProgressIndicatorProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (progress === 100) return "hsl(var(--health-healthy))";
    if (progress >= 50) return "hsl(var(--health-needs-work))";
    return "hsl(var(--health-incomplete))";
  };

  return (
    <div className="relative inline-flex items-center justify-center" data-testid="progress-indicator">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {progress}%
        </motion.div>
      )}
    </div>
  );
}
