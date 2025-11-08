import { Card } from "@/components/ui/card";
import AudioButton from "./AudioButton";

interface TipCardProps {
  icon: string;
  title: string;
  description: string;
  stepNumber?: number;
  testId?: string;
}

export default function TipCard({ icon, title, description, stepNumber, testId }: TipCardProps) {
  return (
    <Card data-testid={testId} className="p-6">
      <div className="flex items-start gap-4">
        {stepNumber && (
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
            {stepNumber}
          </div>
        )}
        <div className="text-5xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <AudioButton text={`${title}. ${description}`} size="sm" />
        </div>
      </div>
    </Card>
  );
}
