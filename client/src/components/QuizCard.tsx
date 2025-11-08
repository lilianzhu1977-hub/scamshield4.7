import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import AudioButton from "./AudioButton";

interface QuizCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onAnswer: (isCorrect: boolean) => void;
  testId?: string;
}

export default function QuizCard({
  questionNumber,
  totalQuestions,
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
  testId,
}: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; originalIndex: number }[]>([]);
  const [newCorrectIndex, setNewCorrectIndex] = useState<number>(correctIndex);

  // Shuffle options once when component mounts
  useState(() => {
    const optionsWithIndex = options.map((text, index) => ({ text, originalIndex: index }));
    const shuffled = [...optionsWithIndex].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setNewCorrectIndex(shuffled.findIndex(opt => opt.originalIndex === correctIndex));
  });

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedIndex(index);
    setShowFeedback(true);
    onAnswer(index === newCorrectIndex);
  };

  const isCorrect = selectedIndex === newCorrectIndex;

  return (
    <Card data-testid={testId} className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="text-2xl font-semibold mb-4">{question}</h2>
        <AudioButton text={question} />
      </div>

      <div className="space-y-4 mb-6">
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === newCorrectIndex;
          
          let variant: "outline" | "default" | "destructive" = "outline";
          if (showFeedback && isCorrectOption) variant = "default";
          if (showFeedback && isSelected && !isCorrect) variant = "destructive";

          return (
            <Button
              key={index}
              data-testid={`${testId}-option-${index}`}
              variant={variant}
              className="w-full h-auto min-h-[80px] text-left justify-start px-6 py-4 text-lg"
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0">
                  {showFeedback && isCorrectOption && <CheckCircle2 className="w-5 h-5" />}
                  {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                  {!showFeedback && <span>{String.fromCharCode(65 + index)}</span>}
                </div>
                <span className="flex-1">{option.text}</span>
              </div>
            </Button>
          );
        })}
      </div>

      {showFeedback && (
        <Card className={`p-6 ${isCorrect ? 'bg-primary/10' : 'bg-destructive/10'}`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            )}
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </h3>
              <p className="text-foreground">{explanation}</p>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
}
