import { useState } from 'react';
import SectionDetailModal from '../SectionDetailModal';
import { Button } from '@/components/ui/button';

export default function SectionDetailModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const subsections = [
    {
      id: "mission",
      label: "Mission Statement",
      description: "Define your company's core purpose",
      progress: 100,
      value: "Empowering businesses worldwide",
    },
    {
      id: "vision",
      label: "Vision",
      description: "Where do you see your company in 5 years?",
      progress: 75,
      value: "Industry leader in innovation",
    },
    {
      id: "values",
      label: "Core Values",
      description: "What principles guide your business?",
      progress: 50,
      value: "",
    },
    {
      id: "goals",
      label: "Strategic Goals",
      description: "Set your primary objectives",
      progress: 0,
      value: "",
    },
  ];

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>
        Open Section Details
      </Button>
      
      <SectionDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sectionId="strategy"
        sectionLabel="Strategy"
        subsections={subsections}
        onSubsectionUpdate={(id, value) => console.log('Updated:', id, value)}
      />
    </div>
  );
}
