import { motion } from "framer-motion";

export type SectionType = 
  | "strategy" 
  | "operations" 
  | "hr" 
  | "branding" 
  | "finance" 
  | "product" 
  | "sales" 
  | "technology" 
  | "legal";

export interface SectionData {
  id: SectionType;
  label: string;
  progress: number;
}

interface PetalDiagramProps {
  sections: SectionData[];
  onSectionClick: (section: SectionType) => void;
}

const SECTION_COLORS: Record<SectionType, { bg: string; fg: string }> = {
  strategy: { bg: "#C8DDFA", fg: "#1E4D8B" },
  operations: { bg: "#C8F0DC", fg: "#1E6B47" },
  hr: { bg: "#D6EAFF", fg: "#1D5A93" },
  branding: { bg: "#FFD6E8", fg: "#8B1E4D" },
  finance: { bg: "#FFF3CD", fg: "#8B6B1E" },
  product: { bg: "#E8D6FF", fg: "#5A1E8B" },
  sales: { bg: "#D4EDDA", fg: "#1E6B3A" },
  technology: { bg: "#E0D6FF", fg: "#4D1E8B" },
  legal: { bg: "#FFE4D6", fg: "#8B3A1E" },
};

export default function PetalDiagram({ sections, onSectionClick }: PetalDiagramProps) {
  const center = { cx: 250, cy: 250 };
  const outerRadius = 150;
  const innerRadius = 50;
  
  const angleStep = (2 * Math.PI) / 8;
  const startAngle = -Math.PI / 2;

  const createPetalPath = (index: number) => {
    const angle1 = startAngle + index * angleStep;
    const angle2 = startAngle + (index + 1) * angleStep;
    
    const outerX1 = center.cx + outerRadius * Math.cos(angle1);
    const outerY1 = center.cy + outerRadius * Math.sin(angle1);
    const outerX2 = center.cx + outerRadius * Math.cos(angle2);
    const outerY2 = center.cy + outerRadius * Math.sin(angle2);
    
    const innerX1 = center.cx + innerRadius * Math.cos(angle1);
    const innerY1 = center.cy + innerRadius * Math.sin(angle1);
    const innerX2 = center.cx + innerRadius * Math.cos(angle2);
    const innerY2 = center.cy + innerRadius * Math.sin(angle2);
    
    return `
      M ${innerX1},${innerY1}
      L ${outerX1},${outerY1}
      A ${outerRadius},${outerRadius} 0 0 1 ${outerX2},${outerY2}
      L ${innerX2},${innerY2}
      A ${innerRadius},${innerRadius} 0 0 0 ${innerX1},${innerY1}
      Z
    `;
  };

  const getLabelPosition = (index: number) => {
    const angle = startAngle + (index + 0.5) * angleStep;
    const labelRadius = (outerRadius + innerRadius) / 1.5;
    return {
      x: center.cx + labelRadius * Math.cos(angle),
      y: center.cy + labelRadius * Math.sin(angle),
    };
  };

  return (
    <svg 
      viewBox="0 0 500 500" 
      className="w-full h-full"
      role="img" 
      aria-label="Business ecosystem diagram"
    >
      <defs>
        {sections.map((section) => (
          <filter key={`shadow-${section.id}`} id={`shadow-${section.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
        ))}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {sections.map((section, index) => {
        const colors = SECTION_COLORS[section.id];
        const isActive = section.progress > 0;
        const labelPos = getLabelPosition(index);

        return (
          <g key={section.id}>
            <motion.path
              d={createPetalPath(index)}
              fill={isActive ? colors.bg : "#B8B8B8"}
              stroke="#333"
              strokeWidth="2"
              opacity={isActive ? 1 : 0.4}
              style={{ cursor: "pointer" }}
              filter={isActive ? `url(#shadow-${section.id})` : undefined}
              initial={false}
              whileHover={{ 
                scale: 1.05,
                opacity: isActive ? 1 : 0.6,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSectionClick(section.id)}
              data-testid={`petal-${section.id}`}
            />
            
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isActive ? colors.fg : "#666"}
              fontSize="18"
              fontWeight="600"
              pointerEvents="none"
              style={{ userSelect: "none" }}
            >
              {section.label}
            </text>

            {isActive && section.progress === 100 && (
              <motion.circle
                cx={labelPos.x}
                cy={labelPos.y - 25}
                r="8"
                fill="#22C55E"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
              </motion.circle>
            )}
          </g>
        );
      })}

      <motion.circle
        cx={center.cx}
        cy={center.cy}
        r={innerRadius}
        fill="white"
        stroke="#333"
        strokeWidth="2"
        style={{ cursor: "pointer" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        filter="url(#shadow-strategy)"
        data-testid="center-business"
      />
      
      <text
        x={center.cx}
        y={center.cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#1a1a1a"
        fontSize="24"
        fontWeight="700"
        pointerEvents="none"
        style={{ userSelect: "none" }}
      >
        Business
      </text>
    </svg>
  );
}
