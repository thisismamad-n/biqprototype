import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubsectionCard, { type SubsectionData } from "./SubsectionCard";
import type { SectionType } from "./PetalDiagram";

interface SectionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: SectionType | null;
  sectionLabel: string;
  subsections: SubsectionData[];
  onSubsectionUpdate: (subsectionId: string, value: string) => void;
}

const SECTION_COLORS: Record<SectionType, string> = {
  strategy: "bg-section-strategy text-section-strategy-fg",
  operations: "bg-section-operations text-section-operations-fg",
  hr: "bg-section-hr text-section-hr-fg",
  branding: "bg-section-branding text-section-branding-fg",
  finance: "bg-section-finance text-section-finance-fg",
  product: "bg-section-product text-section-product-fg",
  sales: "bg-section-sales text-section-sales-fg",
  technology: "bg-section-technology text-section-technology-fg",
  legal: "bg-section-legal text-section-legal-fg",
};

export default function SectionDetailModal({
  isOpen,
  onClose,
  sectionId,
  sectionLabel,
  subsections,
  onSubsectionUpdate,
}: SectionDetailModalProps) {
  if (!sectionId) return null;

  const colorClass = SECTION_COLORS[sectionId];
  const completedCount = subsections.filter(s => s.progress === 100).length;
  const totalCount = subsections.length;
  const overallProgress = Math.round(
    subsections.reduce((sum, s) => sum + s.progress, 0) / totalCount
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
            data-testid="modal-backdrop"
          />
          
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-full max-w-3xl bg-background shadow-2xl z-50 overflow-hidden flex flex-col"
            data-testid="section-detail-modal"
          >
            <div className={`${colorClass} px-6 py-4 flex items-center justify-between`}>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold truncate">{sectionLabel}</h2>
                <p className="text-sm opacity-90 mt-1">
                  {completedCount} از {totalCount} تکمیل شده • ٪{overallProgress} کل
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="flex-shrink-0"
                data-testid="button-close-modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {subsections.map((subsection, index) => (
                  <motion.div
                    key={subsection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SubsectionCard
                      subsection={subsection}
                      onUpdate={onSubsectionUpdate}
                      multiline={index % 3 === 0}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t px-6 py-4 flex items-center justify-between bg-card">
              <p className="text-sm text-muted-foreground">
                تغییرات به صورت خودکار ذخیره می‌شوند
              </p>
              <Button onClick={onClose} data-testid="button-done">
                تمام
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
