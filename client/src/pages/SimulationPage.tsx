import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Phone, PhoneOff, MessageSquare, CheckCircle, XCircle, Volume2, Shuffle } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { getRandomScenario, simulationScenarios } from "@shared/data/simulations";

export default function SimulationPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(simulationScenarios[0]);
  const [answered, setAnswered] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    if (currentScenario.messages[language][0].type === 'call') {
      setIsRinging(true);
      const timer = setTimeout(() => setIsRinging(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScenario, language]);

  const handleChoice = (index: number) => {
    if (answered) return;

    const message = currentScenario.messages[language][0];
    const choice = message.choices![index];

    setSelectedChoice(index);
    setAnswered(true);
    setShowFeedback(true);

    setScore(prev => ({
      correct: prev.correct + (choice.isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
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
    setAnswered(false);
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const message = currentScenario.messages[language][0];
  const isCall = message.type === 'call';
  const isWhatsApp = message.type === 'whatsapp';

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setLocation('/')}>
            <ChevronLeft className="w-5 h-5 mr-2" />
            {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
          </Button>

          <div className="flex items-center gap-4">
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

                    <h2 className="text-3xl font-bold mb-2">{message.sender}</h2>
                    <p className="text-blue-100 mb-2">{message.callerId}</p>
                    <p className="text-sm text-blue-200 animate-pulse">
                      {isRinging ? (language === 'zh' ? '来电中...' : language === 'ms' ? 'Panggilan masuk...' : 'Incoming call...') : 
                                   (language === 'zh' ? '通话中...' : language === 'ms' ? 'Dalam panggilan...' : 'On call...')}
                    </p>

                    <Card className="mt-8 p-4 bg-white/10 backdrop-blur-md border-white/20">
                      <p className="text-white text-sm leading-relaxed">"{message.content}"</p>
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
                      <div className="font-semibold">{message.sender}</div>
                      <div className="text-xs text-green-200">online</div>
                    </div>
                  </div>

                  <div className="flex justify-end mb-4">
                    <div className="max-w-[80%] bg-[#DCF8C6] rounded-lg rounded-tr-none p-3 shadow-sm">
                      <p className="text-sm">{message.content}</p>
                      <div className="text-xs text-gray-500 mt-1 text-right">{message.timestamp}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SMS Screen */}
              {message.type === 'sms' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <MessageSquare className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-semibold">{message.sender}</div>
                      <div className="text-xs text-muted-foreground">{message.timestamp || 'Just now'}</div>
                    </div>
                  </div>

                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </Card>
                </div>
              )}

              {/* Choices */}
              {!answered && message.choices && (
                <div className="p-6 space-y-3 bg-white">
                  <p className="font-semibold text-center mb-4">
                    {language === 'zh' ? '你会怎么做？' : 
                     language === 'ms' ? 'Apa yang anda akan buat?' : 
                     'What will you do?'}
                  </p>
                  {message.choices.map((choice, index) => (
                    <Button
                      key={index}
                      onClick={() => handleChoice(index)}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-all"
                      size="lg"
                    >
                      {choice.text}
                    </Button>
                  ))}
                </div>
              )}

              {/* Feedback */}
              {showFeedback && selectedChoice !== null && (
                <div className={`p-6 animate-in slide-in-from-bottom-4 ${
                  message.choices![selectedChoice].isCorrect 
                    ? 'bg-green-50 border-t-4 border-green-500' 
                    : 'bg-red-50 border-t-4 border-red-500'
                }`}>
                  <div className="flex items-start gap-3">
                    {message.choices![selectedChoice].isCorrect ? (
                      <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {message.choices![selectedChoice].isCorrect
                          ? (language === 'zh' ? '正确！' : language === 'ms' ? 'Betul!' : 'Correct!')
                          : (language === 'zh' ? '小心！' : language === 'ms' ? 'Awas!' : 'Be Careful!')}
                      </h3>
                      <p className="text-sm mb-4">{message.choices![selectedChoice].feedback}</p>

                      <div className="p-4 bg-white rounded-lg border">
                        <p className="text-sm font-semibold mb-1">
                          {message.choices![selectedChoice].isCorrect
                            ? currentScenario.successMessage[language]
                            : currentScenario.failureMessage[language]}
                        </p>
                      </div>

                      <Button onClick={handleNext} className="w-full mt-4" size="lg">
                        {language === 'zh' ? '下一个场景' : 
                         language === 'ms' ? 'Senario Seterusnya' : 
                         'Next Scenario'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}