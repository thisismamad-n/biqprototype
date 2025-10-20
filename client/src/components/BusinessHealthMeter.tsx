import { Card } from "@/components/ui/card";
import { 
  Lightbulb, 
  Users, 
  Building2, 
  Palette, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Code, 
  Scale 
} from "lucide-react";
import HealthDot from "./HealthDot";
import ProgressIndicator from "./ProgressIndicator";
import type { SectionType } from "./PetalDiagram";

interface SectionHealth {
  id: SectionType;
  label: string;
  progress: number;
}

interface BusinessHealthMeterProps {
  sections: SectionHealth[];
  overallProgress: number;
}

const SECTION_ICONS: Record<SectionType, React.ComponentType<{ className?: string }>> = {
  strategy: Lightbulb,
  operations: Building2,
  hr: Users,
  branding: Palette,
  finance: DollarSign,
  product: Package,
  sales: TrendingUp,
  technology: Code,
  legal: Scale,
};

const getHealthStatus = (progress: number): "healthy" | "needs-work" | "incomplete" => {
  if (progress === 100) return "healthy";
  if (progress >= 50) return "needs-work";
  return "incomplete";
};

export default function BusinessHealthMeter({ sections, overallProgress }: BusinessHealthMeterProps) {
  return (
    <Card className="p-6 shadow-lg bg-background/60 backdrop-blur-sm border-border/50" data-testid="business-health-meter">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Business Health</h2>
          <p className="text-sm text-muted-foreground">
            Track your progress across all departments
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 py-6 px-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl">
          <ProgressIndicator progress={overallProgress} size={140} strokeWidth={10} showPercentage />
          <div className="text-center">
            <div className="text-3xl font-bold">{overallProgress}%</div>
            <div className="text-xs text-muted-foreground font-medium">Overall Completion</div>
          </div>
        </div>

        <div className="space-y-2">
          {sections.map((section) => {
            const Icon = SECTION_ICONS[section.id];
            const status = getHealthStatus(section.progress);

            return (
              <div
                key={section.id}
                className="flex items-center justify-between p-3 rounded-xl hover-elevate active-elevate-2 cursor-pointer border border-transparent hover:border-border/50 transition-all"
                data-testid={`health-section-${section.id}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-sm font-medium truncate">{section.label}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <HealthDot status={status} size="md" showPulse={status === "incomplete"} />
                  <div className="text-sm font-semibold w-12 text-right tabular-nums">
                    {section.progress}%
                  </div>
                  <ProgressIndicator progress={section.progress} size={36} strokeWidth={3} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Status Legend
          </div>
          <div className="flex flex-wrap gap-6 text-xs">
            <div className="flex items-center gap-2">
              <HealthDot status="healthy" size="sm" />
              <span className="text-muted-foreground font-medium">Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <HealthDot status="needs-work" size="sm" />
              <span className="text-muted-foreground font-medium">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <HealthDot status="incomplete" size="sm" />
              <span className="text-muted-foreground font-medium">Not Started</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
