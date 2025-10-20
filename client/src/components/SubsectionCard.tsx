import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ProgressIndicator from "./ProgressIndicator";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export interface SubsectionData {
  id: string;
  label: string;
  description: string;
  progress: number;
  value?: string;
}

interface SubsectionCardProps {
  subsection: SubsectionData;
  onUpdate: (id: string, value: string) => void;
  multiline?: boolean;
}

export default function SubsectionCard({ subsection, onUpdate, multiline = false }: SubsectionCardProps) {
  const [value, setValue] = useState(subsection.value || "");
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onUpdate(subsection.id, newValue);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <Card className="p-6 hover-elevate" data-testid={`subsection-${subsection.id}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Label htmlFor={subsection.id} className="text-base font-semibold">
              {subsection.label}
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              {subsection.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {isSaved && (
              <CheckCircle2 className="w-4 h-4 text-health-healthy animate-fade-in" />
            )}
            <ProgressIndicator progress={subsection.progress} size={40} strokeWidth={3} />
          </div>
        </div>

        <div className="space-y-2">
          {multiline ? (
            <Textarea
              id={subsection.id}
              placeholder={`Describe your ${subsection.label.toLowerCase()}...`}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              className="min-h-24 resize-none"
              data-testid={`input-${subsection.id}`}
            />
          ) : (
            <Input
              id={subsection.id}
              placeholder={`Enter ${subsection.label.toLowerCase()}...`}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              data-testid={`input-${subsection.id}`}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
