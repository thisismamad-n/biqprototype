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
    <Card className="p-6 h-full min-h-[500px] overflow-y-auto shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-white/50 relative" data-testid="ai-tips-sidebar">
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur-md opacity-75 animate-pulse"></div>
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              بینش‌های هوشمند
            </h2>
            <p className="text-xs text-muted-foreground font-medium">پیشنهادات شخصی‌سازی شده</p>
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
              className="space-y-4"
            >
              {tips.map((tip, index) => {
                const Icon = ICON_MAP[tip.icon];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-5 hover-elevate border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-sm shadow-lg group">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            {tip.title}
                          </h3>
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
              className="text-center py-20"
            >
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl blur-xl"></div>
                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center border-2 border-white/50">
                  <Lightbulb className="w-14 h-14 text-muted-foreground/40" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto font-medium">
                برای مشاهده بینش‌ها و پیشنهادات هوش مصنوعی، یک بخش از نمودار را انتخاب کنید
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
