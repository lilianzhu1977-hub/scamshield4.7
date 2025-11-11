
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Phone, MessageSquare, CheckCircle, XCircle, Shuffle, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { getRandomScenario, simulationScenarios, type SimulationMessage } from "@shared/data/simulations";

interface StoryNode {
  message: SimulationMessage;
  nextNodes?: Record<number, StoryNode>;
  isEnding?: boolean;
}

export default function SimulationPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(simulationScenarios[0]);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isRinging, setIsRinging] = useState(false);
  const [storyPath, setStoryPath] = useState<SimulationMessage[]>([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [finalOutcome, setFinalOutcome] = useState<'success' | 'failure' | null>(null);

  useEffect(() => {
    // Initialize the story with the first message
    const firstMessage = currentScenario.messages[language][0];
    setStoryPath([firstMessage]);
    setCurrentNodeIndex(0);
    setHasEnded(false);
    setFinalOutcome(null);
    
    if (firstMessage.type === 'call') {
      setIsRinging(true);
      const timer = setTimeout(() => setIsRinging(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScenario, language]);

  const handleChoice = (index: number) => {
    const currentMessage = storyPath[currentNodeIndex];
    const choice = currentMessage.choices![index];

    setScore(prev => ({
      correct: prev.correct + (choice.isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    // Create a feedback message
    const feedbackMessage: SimulationMessage = {
      type: 'system',
      sender: language === 'zh' ? '系统' : language === 'ms' ? 'Sistem' : 'System',
      content: choice.feedback,
      choices: choice.isCorrect ? [
        {
          text: language === 'zh' ? '继续保持警惕' : language === 'ms' ? 'Teruskan berhati-hati' : 'Stay vigilant',
          isCorrect: true,
          feedback: currentScenario.successMessage[language]
        }
      ] : [
        {
          text: language === 'zh' ? '我明白了，重新尝试' : language === 'ms' ? 'Saya faham, cuba lagi' : 'I understand, try again',
          isCorrect: false,
          feedback: currentScenario.failureMessage[language]
        }
      ]
    };

    // Add the feedback to the story path
    setStoryPath(prev => [...prev, feedbackMessage]);
    setCurrentNodeIndex(prev => prev + 1);

    // Check if this is the final choice
    if (choice.isCorrect || currentNodeIndex >= 2) {
      setHasEnded(true);
      setFinalOutcome(choice.isCorrect ? 'success' : 'failure');
    }
  };

  const handleContinue = () => {
    if (hasEnded) {
      handleNext();
    } else {
      setCurrentNodeIndex(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (practiceMode) {
      setCurrentScenario(getRandomScenario());
    } else {
      const currentIndex = simulationScenarios.findIndex(s => s.id === currentScenario.id);
      if (currentIndex < simulationScenarios.length - 1) {
        setCurrentScenario(simulationScenarios[currentIndex + 1]);
      }
    }
  };

  const currentMessage = storyPath[currentNodeIndex];
  const isCall = currentMessage?.type === 'call';
  const isWhatsApp = currentMessage?.type === 'whatsapp';
  const isSystem = currentMessage?.type === 'system';

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setLocation('/')}>
            <ChevronLeft className="w-5 h-5 mr-2" />
            {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
          </Button>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {language === 'zh' ? `步骤 ${currentNodeIndex + 1}/${storyPath.length}` :
               language === 'ms' ? `Langkah ${currentNodeIndex + 1}/${storyPath.length}` :
               `Step ${currentNodeIndex + 1}/${storyPath.length}`}
            </Badge>

            <Badge variant={practiceMode ? "default" : "outline"} className="text-lg px-4 py-2">
              {language === 'zh' ? `得分: ${score.correct}/${score.total}` :
               language === 'ms' ? `Skor: ${score.correct}/${score.total}` :
               `Score: ${score.correct}/${score.total}`}
            </Badge>

            <Button
              variant={practiceMode ? "default" : "outline"}
              onClick={() => {
                setPracticeMode(!practiceMode);
                if (!practiceMode) setCurrentScenario(getRandomScenario());
              }}
              className="gap-2"
            >
              <Shuffle className="w-4 h-4" />
              {language === 'zh' ? '练习模式' : language === 'ms' ? 'Mod Latihan' : 'Practice Mode'}
            </Button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {currentScenario.title[language]}
          </h1>
          <p className="text-xl text-muted-foreground">
            {currentScenario.description[language]}
          </p>
          <Badge variant="secondary" className="mt-4">
            {currentScenario.difficulty.toUpperCase()} • {currentScenario.category}
          </Badge>
        </div>

        {/* Story Progress Indicator */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center justify-center gap-2">
            {storyPath.map((_, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${idx <= currentNodeIndex ? 'bg-primary' : 'bg-muted'}`} />
                {idx < storyPath.length - 1 && (
                  <div className={`w-8 h-0.5 ${idx < currentNodeIndex ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Realistic Phone UI */}
        <div className="max-w-md mx-auto">
          <div className={`relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl transition-all duration-300 ${isRinging ? 'animate-bounce' : ''}`}>
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>

            {/* Screen */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden min-h-[650px]">
              {/* Status Bar */}
              <div className="bg-gradient-to-b from-gray-50 to-white px-6 py-3 flex justify-between items-center text-xs border-b">
                <span className="font-semibold">9:41</span>
                <div className="flex gap-1">
                  <span>📶</span>
                  <span>📡</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Call Screen */}
              {isCall && (
                <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-b from-blue-500 to-blue-600 text-white p-6 relative overflow-hidden">
                  {isRinging && (
                    <div className="absolute inset-0 bg-blue-400 animate-ping opacity-20"></div>
                  )}

                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
                      <Phone className="w-12 h-12" />
                    </div>

                    <h2 className="text-3xl font-bold mb-2">{currentMessage.sender}</h2>
                    <p className="text-blue-100 mb-2">{currentMessage.callerId}</p>
                    <p className="text-sm text-blue-200 animate-pulse mb-6">
                      {isRinging ? (language === 'zh' ? '来电中...' : language === 'ms' ? 'Panggilan masuk...' : 'Incoming call...') : 
                                   (language === 'zh' ? '通话中...' : language === 'ms' ? 'Dalam panggilan...' : 'On call...')}
                    </p>

                    <Card className="mt-8 p-4 bg-white/10 backdrop-blur-md border-white/20">
                      <p className="text-white text-sm leading-relaxed">"{currentMessage.content}"</p>
                    </Card>
                  </div>
                </div>
              )}

              {/* WhatsApp Screen */}
              {isWhatsApp && (
                <div className="bg-[#ECE5DD] min-h-[600px] p-4">
                  <div className="bg-[#075E54] text-white p-4 -mx-4 -mt-4 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <div className="font-semibold">{currentMessage.sender}</div>
                      <div className="text-xs text-green-200">online</div>
                    </div>
                  </div>

                  <div className="flex justify-end mb-4">
                    <div className="max-w-[80%] bg-[#DCF8C6] rounded-lg rounded-tr-none p-3 shadow-sm">
                      <p className="text-sm">{currentMessage.content}</p>
                      <div className="text-xs text-gray-500 mt-1 text-right">{currentMessage.timestamp}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SMS Screen */}
              {currentMessage?.type === 'sms' && (
                <div className="p-6 min-h-[600px]">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <MessageSquare className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-semibold">{currentMessage.sender}</div>
                      <div className="text-xs text-muted-foreground">{currentMessage.timestamp || 'Just now'}</div>
                    </div>
                  </div>

                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <p className="text-sm leading-relaxed">{currentMessage.content}</p>
                  </Card>
                </div>
              )}

              {/* System Feedback Screen */}
              {isSystem && (
                <div className={`p-6 min-h-[600px] ${finalOutcome === 'success' ? 'bg-green-50' : 'bg-amber-50'}`}>
                  <div className="flex flex-col items-center justify-center h-full">
                    {finalOutcome === 'success' ? (
                      <CheckCircle className="w-20 h-20 text-green-600 mb-4" />
                    ) : (
                      <XCircle className="w-20 h-20 text-amber-600 mb-4" />
                    )}
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      {finalOutcome === 'success' 
                        ? (language === 'zh' ? '做得好！' : language === 'ms' ? 'Bagus!' : 'Well Done!')
                        : (language === 'zh' ? '学习时刻' : language === 'ms' ? 'Masa Belajar' : 'Learning Moment')}
                    </h3>
                    <Card className="p-6 max-w-md">
                      <p className="text-lg leading-relaxed text-center">{currentMessage.content}</p>
                    </Card>
                  </div>
                </div>
              )}

              {/* Choices */}
              {currentMessage?.choices && !hasEnded && (
                <div className="p-6 space-y-3 bg-white">
                  <p className="font-semibold text-center mb-4 text-lg">
                    {language === 'zh' ? '你会怎么做？' : 
                     language === 'ms' ? 'Apa yang anda akan buat?' : 
                     'What will you do?'}
                  </p>
                  {currentMessage.choices.map((choice, index) => (
                    <Button
                      key={index}
                      onClick={() => handleChoice(index)}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-all"
                      size="lg"
                    >
                      <span className="mr-3 text-lg">{'ABCD'[index]}.</span>
                      {choice.text}
                    </Button>
                  ))}
                </div>
              )}

              {/* Continue Button */}
              {hasEnded && (
                <div className="p-6 bg-white">
                  <Button onClick={handleNext} className="w-full" size="lg">
                    {language === 'zh' ? '下一个场景' : 
                     language === 'ms' ? 'Senario Seterusnya' : 
                     'Next Scenario'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
