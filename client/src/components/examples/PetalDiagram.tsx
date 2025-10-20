import PetalDiagram from '../PetalDiagram';

export default function PetalDiagramExample() {
  const sections = [
    { id: "strategy" as const, label: "Strategy", progress: 75 },
    { id: "operations" as const, label: "Operations", progress: 100 },
    { id: "hr" as const, label: "HR", progress: 50 },
    { id: "branding" as const, label: "Branding", progress: 0 },
    { id: "finance" as const, label: "Finance", progress: 60 },
    { id: "product" as const, label: "Product", progress: 100 },
    { id: "sales" as const, label: "Sales", progress: 30 },
    { id: "technology" as const, label: "Technology", progress: 0 },
    { id: "legal" as const, label: "Legal", progress: 0 },
  ];

  return (
    <div className="w-full h-[600px] flex items-center justify-center">
      <PetalDiagram 
        sections={sections} 
        onSectionClick={(id) => console.log('Section clicked:', id)}
      />
    </div>
  );
}
