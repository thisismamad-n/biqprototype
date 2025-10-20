import ProgressIndicator from '../ProgressIndicator';

export default function ProgressIndicatorExample() {
  return (
    <div className="flex items-center gap-8 p-8">
      <ProgressIndicator progress={0} size={64} showPercentage />
      <ProgressIndicator progress={35} size={64} showPercentage />
      <ProgressIndicator progress={75} size={64} showPercentage />
      <ProgressIndicator progress={100} size={64} showPercentage />
    </div>
  );
}
