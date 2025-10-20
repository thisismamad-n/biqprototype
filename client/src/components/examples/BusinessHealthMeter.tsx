import BusinessHealthMeter from '../BusinessHealthMeter';

export default function BusinessHealthMeterExample() {
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

  const overallProgress = Math.round(
    sections.reduce((sum, s) => sum + s.progress, 0) / sections.length
  );

  return (
    <div className="w-96">
      <BusinessHealthMeter sections={sections} overallProgress={overallProgress} />
    </div>
  );
}
