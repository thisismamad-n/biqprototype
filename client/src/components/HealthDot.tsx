import { motion } from "framer-motion";

type HealthStatus = "healthy" | "needs-work" | "incomplete";

interface HealthDotProps {
  status: HealthStatus;
  size?: "sm" | "md" | "lg";
  showPulse?: boolean;
}

const STATUS_COLORS: Record<HealthStatus, string> = {
  healthy: "bg-health-healthy",
  "needs-work": "bg-health-needs-work",
  incomplete: "bg-health-incomplete",
};

const SIZES = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export default function HealthDot({ status, size = "md", showPulse = false }: HealthDotProps) {
  return (
    <div className="relative inline-flex">
      <motion.div
        className={`rounded-full ${STATUS_COLORS[status]} ${SIZES[size]}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        data-testid={`health-dot-${status}`}
      />
      {showPulse && status === "incomplete" && (
        <span className={`absolute inset-0 rounded-full ${STATUS_COLORS[status]} animate-pulse-glow`} />
      )}
    </div>
  );
}
