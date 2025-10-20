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

const SECTION_COLORS: Record<SectionType, { base: string; light: string; fg: string }> = {
  strategy: { base: "#7CB9E8", light: "#C8DDFA", fg: "#1E4D8B" },
  operations: { base: "#6FD195", light: "#C8F0DC", fg: "#1E6B47" },
  hr: { base: "#8FC9FF", light: "#D6EAFF", fg: "#1D5A93" },
  branding: { base: "#FFB3D9", light: "#FFD6E8", fg: "#8B1E4D" },
  finance: { base: "#FFD966", light: "#FFF3CD", fg: "#8B6B1E" },
  product: { base: "#C49FFF", light: "#E8D6FF", fg: "#5A1E8B" },
  sales: { base: "#90EE90", light: "#D4EDDA", fg: "#1E6B3A" },
  technology: { base: "#B8A3FF", light: "#E0D6FF", fg: "#4D1E8B" },
  legal: { base: "#FFAD99", light: "#FFE4D6", fg: "#8B3A1E" },
};

export default function PetalDiagram({ sections, onSectionClick }: PetalDiagramProps) {
  const center = { cx: 250, cy: 250 };
  const outerRadius = 150;
  const innerRadius = 60;
  
  const angleStep = (2 * Math.PI) / sections.length;
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
    const labelRadius = (outerRadius + innerRadius) / 1.6;
    return {
      x: center.cx + labelRadius * Math.cos(angle),
      y: center.cy + labelRadius * Math.sin(angle),
    };
  };

  return (
    <svg 
      viewBox="0 0 500 500" 
      className="w-full h-full drop-shadow-2xl"
      role="img" 
      aria-label="نمودار اکوسیستم کسب‌وکار"
    >
      <defs>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="petal-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="0" dy="3" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {sections.map((section) => {
          const colors = SECTION_COLORS[section.id];
          const progressDecimal = section.progress / 100;
          
          return (
            <linearGradient 
              key={`gradient-${section.id}`}
              id={`gradient-${section.id}`}
              x1="0%" 
              y1="0%" 
              x2="100%" 
              y2="100%"
            >
              {section.progress > 0 ? (
                <>
                  <stop offset="0%" stopColor={colors.base} stopOpacity="0.95" />
                  <stop offset={`${progressDecimal * 100}%`} stopColor={colors.light} stopOpacity="0.9" />
                  <stop offset={`${progressDecimal * 100}%`} stopColor="#E5E7EB" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F3F4F6" stopOpacity="0.4" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#E5E7EB" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F3F4F6" stopOpacity="0.4" />
                </>
              )}
            </linearGradient>
          );
        })}
      </defs>

      {sections.map((section, index) => {
        const colors = SECTION_COLORS[section.id];
        const labelPos = getLabelPosition(index);
        const hasProgress = section.progress > 0;

        return (
          <g key={section.id}>
            <motion.path
              d={createPetalPath(index)}
              fill={`url(#gradient-${section.id})`}
              stroke={hasProgress ? colors.base : "#D1D5DB"}
              strokeWidth="2"
              style={{ cursor: "pointer" }}
              filter="url(#petal-shadow)"
              initial={false}
              whileHover={{ 
                scale: 1.06,
                filter: "url(#soft-glow)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              onClick={() => onSectionClick(section.id)}
              data-testid={`petal-${section.id}`}
            />
            
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={hasProgress ? colors.fg : "#6B7280"}
              fontSize="18"
              fontWeight="700"
              pointerEvents="none"
              style={{ userSelect: "none" }}
            >
              {section.label}
            </text>

            {hasProgress && section.progress === 100 && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
              >
                <circle
                  cx={labelPos.x + 35}
                  cy={labelPos.y - 18}
                  r="12"
                  fill="#10B981"
                  filter="url(#soft-glow)"
                />
                <text
                  x={labelPos.x + 35}
                  y={labelPos.y - 18}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="700"
                  pointerEvents="none"
                >
                  ✓
                </text>
              </motion.g>
            )}
          </g>
        );
      })}

      <motion.circle
        cx={center.cx}
        cy={center.cy}
        r={innerRadius}
        fill="white"
        stroke="#E5E7EB"
        strokeWidth="3"
        style={{ cursor: "pointer" }}
        filter="url(#petal-shadow)"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        data-testid="center-business"
      />
      
      <text
        x={center.cx}
        y={center.cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#1F2937"
        fontSize="26"
        fontWeight="800"
        pointerEvents="none"
        style={{ userSelect: "none" }}
      >
        کسب‌وکار
      </text>
    </svg>
  );
}
