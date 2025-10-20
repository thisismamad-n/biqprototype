import { Card } from "@/components/ui/card";
import { Sparkles, Lightbulb, TrendingUp, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionType } from "./PetalDiagram";

interface AITip {
  icon: "sparkles" | "lightbulb" | "trending" | "alert";
  title: string;
  description: string;
}

interface AITipsSidebarProps {
  selectedSection: SectionType | null;
  tips: AITip[];
}

const ICON_MAP = {
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  trending: TrendingUp,
  alert: AlertCircle,
};

export default function AITipsSidebar({ selectedSection, tips }: AITipsSidebarProps) {
  return (
    <Card className="p-6 h-full overflow-y-auto shadow-lg bg-background/60 backdrop-blur-sm border-border/50" data-testid="ai-tips-sidebar">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">بینش‌های هوشمند</h2>
            <p className="text-xs text-muted-foreground">پیشنهادات شخصی‌سازی شده</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedSection ? (
            <motion.div
              key={selectedSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {tips.map((tip, index) => {
                const Icon = ICON_MAP[tip.icon];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover-elevate border-border/50 bg-background/40">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-sm font-semibold leading-tight">{tip.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                برای مشاهده بینش‌ها و پیشنهادات هوش مصنوعی، یک بخش از نمودار را انتخاب کنید
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
