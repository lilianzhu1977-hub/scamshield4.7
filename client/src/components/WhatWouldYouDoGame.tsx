import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { whatWouldYouDoScenarios } from "@shared/data/whatWouldYouDoData";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";

interface WhatWouldYouDoGameProps {
  onComplete: (score: number, total: number) => void;
}

export default function WhatWouldYouDoGame({ onComplete }: WhatWouldYouDoGameProps) {
  const { language } = useApp();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = whatWouldYouDoScenarios[currentScenario];
  const progress = ((currentScenario + 1) / whatWouldYouDoScenarios.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    if (scenario.options[optionIndex].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < whatWouldYouDoScenarios.length - 1) {
      setCurrentScenario(c => c + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      onComplete(score, whatWouldYouDoScenarios.length);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">
            {language === 'zh' ? '你会怎么做？' : language === 'ms' ? 'Apa Yang Anda Akan Lakukan?' : 'What Would You Do?'}
          </h2>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {currentScenario + 1} / {whatWouldYouDoScenarios.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-3" />
        <p className="text-muted-foreground mt-2 text-right">
          {language === 'zh' ? `得分: ${score}` : language === 'ms' ? `Skor: ${score}` : `Score: ${score}`}
        </p>
      </div>

      <Card className="p-8 mb-6">
        <h3 className="text-2xl font-bold mb-4">{scenario.scenario[language]}</h3>
        <Card className="p-4 bg-muted mb-6">
          <p className="text-lg italic">{scenario.context[language]}</p>
        </Card>

        <div className="space-y-4">
          {scenario.options.map((option, index) => (
            <Card
              key={index}
              data-testid={`option-${index}`}
              className={`p-6 cursor-pointer transition-all ${
                selectedOption === index
                  ? option.isCorrect
                    ? 'border-2 border-green-500 bg-green-50 dark:bg-green-950/20'
                    : 'border-2 border-red-500 bg-red-50 dark:bg-red-950/20'
                  : showFeedback && option.isCorrect
                  ? 'border-2 border-green-500 bg-green-50 dark:bg-green-950/20'
                  : 'hover-elevate active-elevate-2'
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {showFeedback && selectedOption === index && (
                    option.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )
                  )}
                  {showFeedback && selectedOption !== index && option.isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold mb-2">{option.text[language]}</p>
                  {showFeedback && selectedOption === index && (
                    <p className="text-sm mt-3 italic">{option.feedback[language]}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {showFeedback && (
          <Card className="mt-6 p-6 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-500">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {language === 'zh' ? '教育提示' : language === 'ms' ? 'Nota Pendidikan' : 'Educational Note'}
                </p>
                <p className="text-blue-800 dark:text-blue-200">{scenario.educationalNote[language]}</p>
              </div>
            </div>
          </Card>
        )}
      </Card>

      {showFeedback && (
        <div className="flex justify-center">
          <Button
            data-testid="button-next-scenario"
            size="lg"
            onClick={handleNext}
          >
            {currentScenario < whatWouldYouDoScenarios.length - 1
              ? (language === 'zh' ? '下一个场景' : language === 'ms' ? 'Senario Seterusnya' : 'Next Scenario')
              : (language === 'zh' ? '查看结果' : language === 'ms' ? 'Lihat Keputusan' : 'View Results')}
          </Button>
        </div>
      )}
    </div>
  );
}
