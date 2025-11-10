import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  type?: 'multiple-choice' | 'true-false' | 'fill-blank';
  correctAnswer?: string;
}

export default function QuizCard({
  questionNumber,
  totalQuestions,
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
  testId = "quiz-card",
  type = 'multiple-choice',
  correctAnswer
}: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [fillAnswer, setFillAnswer] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; originalIndex: number }[]>([]);
  const [newCorrectIndex, setNewCorrectIndex] = useState<number>(correctIndex);

  // Shuffle options once when component mounts for multiple-choice type
  useState(() => {
    if (type === 'multiple-choice') {
      const optionsWithIndex = options.map((text, index) => ({ text, originalIndex: index }));
      const shuffled = [...optionsWithIndex].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
      setNewCorrectIndex(shuffled.findIndex(opt => opt.originalIndex === correctIndex));
    }
  });

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedIndex(index);
    setShowResult(true);

    const isCorrect = index === newCorrectIndex; // Use newCorrectIndex for shuffled options
    onAnswer(isCorrect);
  };

  const handleFillBlankSubmit = () => {
    if (showResult || !fillAnswer.trim()) return;

    setShowResult(true);
    const isCorrect = fillAnswer.trim().toLowerCase() === (correctAnswer || options[correctIndex]).toLowerCase();
    onAnswer(isCorrect);

    // Auto-select the correct option for visual feedback if it's a fill-blank type
    if (type === 'fill-blank') {
      setSelectedIndex(correctIndex);
    }
  };

  const isAnswerCorrect = type === 'fill-blank'
    ? fillAnswer.trim().toLowerCase() === (correctAnswer || options[correctIndex]).toLowerCase()
    : selectedIndex === newCorrectIndex;


  return (
    <Card data-testid={testId} className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge variant="secondary">
            {type === 'true-false' ? 'True/False' : type === 'fill-blank' ? 'Fill in Blank' : 'Multiple Choice'}
          </Badge>
        </div>
        <h2 className="text-2xl font-bold mb-4">{question}</h2>
        {type !== 'fill-blank' && <AudioButton text={question} />}
      </div>

      {type === 'fill-blank' ? (
        <div className="space-y-4 mb-6">
          <div className="flex gap-2">
            <Input
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={showResult}
              className="flex-1 text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleFillBlankSubmit()}
            />
            <Button
              onClick={handleFillBlankSubmit}
              disabled={showResult || !fillAnswer.trim()}
              className="px-8"
            >
              Submit
            </Button>
          </div>

          {showResult && (
            <div className="text-sm text-muted-foreground">
              Correct answer: <strong>{correctAnswer || options[correctIndex]}</strong>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {(type === 'multiple-choice' ? shuffledOptions : options.map((text, index) => ({ text, originalIndex: index }))).map((option, index) => {
            const isSelected = selectedIndex === index;
            const isCorrectOption = index === newCorrectIndex;

            let variant: "outline" | "default" | "destructive" = "outline";
            if (showResult && isCorrectOption) variant = "default";
            if (showResult && isSelected && !isAnswerCorrect) variant = "destructive";

            return (
              <Button
                key={index}
                data-testid={`${testId}-option-${index}`}
                variant={variant}
                className="w-full h-auto min-h-[80px] text-left justify-start px-6 py-4 text-lg"
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0">
                    {showResult && isCorrectOption && <CheckCircle2 className="w-5 h-5" />}
                    {showResult && isSelected && !isAnswerCorrect && <XCircle className="w-5 h-5" />}
                    {!showResult && <span>{String.fromCharCode(65 + index)}</span>}
                  </div>
                  <span className="flex-1">{option.text}</span>
                </div>
              </Button>
            );
          })}
        </div>
      )}

      {showResult && (
        <Card className={`p-6 ${isAnswerCorrect ? 'bg-primary/10' : 'bg-destructive/10'}`}>
          <div className="flex items-start gap-3">
            {isAnswerCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            )}
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {isAnswerCorrect ? 'Correct!' : 'Not quite right'}
              </h3>
              <p className="text-foreground">{explanation}</p>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
}