import SubsectionCard from '../SubsectionCard';

export default function SubsectionCardExample() {
  const subsection = {
    id: "mission",
    label: "Mission Statement",
    description: "Define your company's core purpose and values",
    progress: 75,
    value: "To empower businesses with innovative tools for sustainable growth",
  };

  return (
    <div className="w-full max-w-2xl p-8">
      <SubsectionCard
        subsection={subsection}
        onUpdate={(id, value) => console.log('Updated:', id, value)}
        multiline
      />
    </div>
  );
}
