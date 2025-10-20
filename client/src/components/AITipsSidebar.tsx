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
    <Card className="p-6 h-full overflow-y-auto" data-testid="ai-tips-sidebar">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">AI Insights</h2>
        </div>

        <AnimatePresence mode="wait">
          {selectedSection ? (
            <motion.div
              key={selectedSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
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
                    <Card className="p-4 hover-elevate">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-semibold">{tip.title}</h3>
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
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Select a section to see AI-powered insights and recommendations
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
