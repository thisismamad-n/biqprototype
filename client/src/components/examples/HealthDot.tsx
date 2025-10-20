import HealthDot from '../HealthDot';

export default function HealthDotExample() {
  return (
    <div className="flex items-center gap-6 p-8">
      <div className="flex flex-col items-center gap-2">
        <HealthDot status="healthy" size="lg" />
        <span className="text-xs text-muted-foreground">Healthy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HealthDot status="needs-work" size="lg" />
        <span className="text-xs text-muted-foreground">Needs Work</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HealthDot status="incomplete" size="lg" showPulse />
        <span className="text-xs text-muted-foreground">Incomplete</span>
      </div>
    </div>
  );
}
