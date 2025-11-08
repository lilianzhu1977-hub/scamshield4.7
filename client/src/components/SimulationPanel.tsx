import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import AudioButton from "./AudioButton";

interface SimulationPanelProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  visual: string;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export default function SimulationPanel({
  currentStep,
  totalSteps,
  title,
  description,
  visual,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: SimulationPanelProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <Progress value={progress} className="mb-6 h-2" />
      
      <Card className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Step {currentStep + 1} of {totalSteps}</span>
          </div>
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        </div>

        <div className="aspect-[4/3] bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-destructive/20" />
          <div className="text-9xl relative z-10 blur-[2px]">{visual}</div>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-center">{description}</p>

        <div className="flex justify-center mb-6">
          <AudioButton text={`${title}. ${description}`} size="lg" />
        </div>

        <div className="flex justify-between gap-4">
          <Button
            data-testid="button-simulation-previous"
            variant="outline"
            size="lg"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex-1"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            data-testid="button-simulation-next"
            size="lg"
            onClick={onNext}
            disabled={!canGoNext}
            className="flex-1"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
