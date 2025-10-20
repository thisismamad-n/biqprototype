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
import { motion } from "framer-motion";

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
    <Card className="p-8 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-white/50 overflow-hidden relative" data-testid="business-health-meter">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            سلامت کسب‌وکار
          </h2>
          <p className="text-sm text-muted-foreground">
            پیشرفت خود را در تمام بخش‌ها دنبال کنید
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 py-8 px-6 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-2xl border border-emerald-500/10 shadow-inner">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
            <ProgressIndicator progress={overallProgress} size={160} strokeWidth={12} showPercentage />
          </div>
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              ٪{overallProgress}
            </div>
            <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">تکمیل کلی</div>
          </div>
        </div>

        <div className="space-y-3">
          {sections.map((section, index) => {
            const Icon = SECTION_ICONS[section.id];
            const status = getHealthStatus(section.progress);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className="flex items-center justify-between p-4 rounded-xl hover-elevate active-elevate-2 cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm group"
                  data-testid={`health-section-${section.id}`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-base font-bold truncate">{section.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <HealthDot status={status} size="md" showPulse={status === "incomplete"} />
                    <div className="text-base font-black w-16 text-left tabular-nums bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      ٪{section.progress}
                    </div>
                    <ProgressIndicator progress={section.progress} size={48} strokeWidth={4} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="pt-6 border-t-2 border-dashed border-border space-y-4">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            راهنمای وضعیت
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <HealthDot status="healthy" size="sm" />
              <span className="font-semibold">تکمیل شده</span>
            </div>
            <div className="flex items-center gap-2">
              <HealthDot status="needs-work" size="sm" />
              <span className="font-semibold">در حال انجام</span>
            </div>
            <div className="flex items-center gap-2">
              <HealthDot status="incomplete" size="sm" />
              <span className="font-semibold">شروع نشده</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
