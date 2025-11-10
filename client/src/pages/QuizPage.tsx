import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Trophy, Share2, HelpCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { useLocation } from "wouter";
import QuizCard from "@/components/QuizCard";
import SpotScamCard from "@/components/SpotScamCard";
import MemoryMatchGame from "@/components/MemoryMatchGame";
import DragSortGame from "@/components/DragSortGame";
import WhatWouldYouDoGame from "@/components/WhatWouldYouDoGame";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { quizQuestions as allQuestions } from "@shared/data/content";
import { spotScamQuestions } from "@shared/data/spotScamQuestions";
import { memoryMatchPairs } from "@shared/data/memoryMatchData";
import { dragSortMessages } from "@shared/data/dragSortData";
import { whatWouldYouDoScenarios } from "@shared/data/whatWouldYouDoData";
import { getText } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";
import { getAllGameModes } from "@/lib/gameModeRegistry";
import { CelebrationService } from "@/lib/celebrationService";
import type { GameModeId } from "@shared/types/gameTypes";

export default function QuizPage() {
  const [, setLocation] = useLocation();
  const { language, slowAnimation, recordGameCompletion } = useApp();
  const [quizMode, setQuizMode] = useState<GameModeId | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof allQuestions>([]);
  const [spotScams, setSpotScams] = useState<typeof spotScamQuestions[keyof typeof spotScamQuestions]>([]);

  useEffect(() => {
    CelebrationService.setReducedMotion(slowAnimation);
  }, [slowAnimation]);

  useEffect(() => {
    const questionsForLanguage = allQuestions.filter(q => q.language === language);
    const shuffled = [...questionsForLanguage].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);

    const spotScamsForLanguage = spotScamQuestions[language] || spotScamQuestions.en;
    const shuffledSpotScams = [...spotScamsForLanguage].sort(() => Math.random() - 0.5);
    setSpotScams(shuffledSpotScams);

    setCurrentQuestion(0);
    setScore(0);
    setAnsweredCount(0);
    setShowResults(false);
    setQuizMode(null);
  }, [language]);

  const handleTraditionalQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      CelebrationService.celebrate('correct');
    }
    
    const newScore = isCorrect ? score + 1 : score;
    const newAnsweredCount = answeredCount + 1;

    setScore(newScore);
    setAnsweredCount(newAnsweredCount);

    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
        if (quizMode) {
          recordGameCompletion(quizMode, newScore, shuffledQuestions.length);
        }
        if (newScore === shuffledQuestions.length) {
          CelebrationService.celebrate('perfect-score');
        } else {
          CelebrationService.celebrate('complete');
        }
      }
    }, 2000);
  };

  const handleSpotScamAnswer = (correct: boolean) => {
    if (correct) {
      CelebrationService.celebrate('correct');
    }
    
    const newScore = correct ? score + 1 : score;
    setScore(newScore);
    setAnsweredCount(answeredCount + 1);

    setTimeout(() => {
      if (currentQuestion < spotScams.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const finalScore = newScore + (correct ? 1 : 0);
        setShowResults(true);
        if (quizMode) {
          recordGameCompletion(quizMode, finalScore, spotScams.length);
        }
        if (finalScore === spotScams.length) {
          CelebrationService.celebrate('perfect-score');
        } else {
          CelebrationService.celebrate('complete');
        }
      }
    }, 4000);
  };

  const handleGameComplete = (gameScore: number, total: number) => {
    setScore(gameScore);
    setShowResults(true);
    if (quizMode) {
      recordGameCompletion(quizMode, gameScore, total);
    }
    if (gameScore === total) {
      CelebrationService.celebrate('perfect-score');
    } else {
      CelebrationService.celebrate('complete');
    }
  };

  const handleShare = () => {
    const totalQuestions = quizMode === 'spot-scam' ? spotScams.length : 
                          quizMode === 'memory-match' ? memoryMatchPairs.length :
                          quizMode === 'drag-sort' ? dragSortMessages.length :
                          quizMode === 'what-would-you-do' ? whatWouldYouDoScenarios.length :
                          shuffledQuestions.length;

    const text = language === 'zh'
      ? `我在ScamShield+测验中得了${score}/${totalQuestions}分！来测试你的防诈骗知识吧！`
      : language === 'ms'
      ? `Saya skor ${score}/${totalQuestions} dalam kuiz ScamShield+! Uji pengetahuan pencegahan penipuan anda!`
      : `I scored ${score}/${totalQuestions} on the ScamShield+ quiz! Test your scam prevention knowledge!`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        window.open(whatsappUrl, '_blank');
      });
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  const gameModes = getAllGameModes();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => {
          if (quizMode && !showResults) {
            setQuizMode(null);
            setShowResults(false);
          } else {
            setLocation('/');
          }
        }}
        className="mb-6"
        data-testid="button-back"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        {quizMode && !showResults ? (language === 'zh' ? '返回模式选择' : language === 'ms' ? 'Kembali ke Mod' : 'Back to Mode Selection') : (language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back')}
      </Button>

      {!quizMode && !showResults && (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {language === 'zh' ? '选择游戏模式' : language === 'ms' ? 'Pilih Mod Permainan' : 'Choose Game Mode'}
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            {language === 'zh' ? '选择你喜欢的学习方式' : language === 'ms' ? 'Pilih cara pembelajaran kegemaran anda' : 'Select your preferred learning style'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameModes.map((mode) => {
              const IconComponent = (Icons as any)[mode.iconName] || Icons.HelpCircle;
              const questionCount = mode.id === 'traditional' ? shuffledQuestions.length :
                                   mode.id === 'spot-scam' ? spotScams.length :
                                   mode.totalQuestions;
              
              return (
                <Card 
                  key={mode.id}
                  data-testid={`card-mode-${mode.id}`}
                  className="p-8 cursor-pointer hover:shadow-xl transition-all border-2 hover:border-primary hover-elevate active-elevate-2"
                  onClick={() => setQuizMode(mode.id)}
                >
                  <div className="text-center">
                    <IconComponent className="w-20 h-20 mx-auto mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-3">
                      {mode.title[language]}
                    </h2>
                    <p className="text-muted-foreground mb-4 min-h-[60px]">
                      {mode.description[language]}
                    </p>
                    <Badge variant={mode.badgeVariant} className="text-base px-4 py-1">
                      {questionCount} {language === 'zh' ? (mode.id === 'spot-scam' ? '场景' : '题') : language === 'ms' ? (mode.id === 'spot-scam' ? 'senario' : 'soalan') : (mode.id === 'spot-scam' ? 'scenarios' : 'questions')}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {quizMode === 'memory-match' && !showResults && (
        <MemoryMatchGame onComplete={handleGameComplete} />
      )}

      {quizMode === 'drag-sort' && !showResults && (
        <DragSortGame onComplete={handleGameComplete} />
      )}

      {quizMode === 'what-would-you-do' && !showResults && (
        <WhatWouldYouDoGame onComplete={handleGameComplete} />
      )}

      {quizMode === 'spot-scam' && !showResults && spotScams.length > 0 && (
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-2">
              {language === 'zh' ? '发现诈骗挑战' : language === 'ms' ? 'Cabaran Kesan Penipuan' : 'Spot the Scam Challenge'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {language === 'zh' ? `场景 ${currentQuestion + 1} / ${spotScams.length}` : 
               language === 'ms' ? `Senario ${currentQuestion + 1} / ${spotScams.length}` :
               `Scenario ${currentQuestion + 1} of ${spotScams.length}`}
            </p>
            <p className="text-2xl font-semibold mt-2 text-primary">
              {language === 'zh' ? `得分: ${score}` : language === 'ms' ? `Skor: ${score}` : `Score: ${score}`}
            </p>
          </div>

          <SpotScamCard
            {...spotScams[currentQuestion]}
            onAnswer={handleSpotScamAnswer}
          />
        </div>
      )}

      {quizMode === 'traditional' && !showResults && shuffledQuestions.length > 0 && (
        <div>
          <div className="mb-6 text-center">
            <p className="text-2xl font-semibold text-primary">
              {language === 'zh' ? `得分: ${score}` : language === 'ms' ? `Skor: ${score}` : `Score: ${score}`}
            </p>
          </div>
          <QuizCard
            questionNumber={currentQuestion + 1}
            totalQuestions={shuffledQuestions.length}
            question={shuffledQuestions[currentQuestion].question}
            options={shuffledQuestions[currentQuestion].options}
            correctIndex={shuffledQuestions[currentQuestion].correctIndex}
            explanation={shuffledQuestions[currentQuestion].explanation}
            type={(shuffledQuestions[currentQuestion] as any).type || 'multiple-choice'}
            correctAnswer={(shuffledQuestions[currentQuestion] as any).correctAnswer}
            onAnswer={handleTraditionalQuizAnswer}
            testId="quiz-card"
          />
        </div>
      )}

      {showResults && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Card className="p-12 text-center shadow-2xl">
            <div className="text-9xl mb-6 animate-bounce">
              {(() => {
                const totalQuestions = quizMode === 'spot-scam' ? spotScams.length : 
                                     quizMode === 'memory-match' ? memoryMatchPairs.length :
                                     quizMode === 'drag-sort' ? dragSortMessages.length :
                                     quizMode === 'what-would-you-do' ? whatWouldYouDoScenarios.length :
                                     shuffledQuestions.length;
                const percentage = (score / totalQuestions) * 100;
                if (percentage === 100) return '🏆';
                if (percentage >= 80) return '🌟';
                if (percentage >= 50) return '👍';
                return '💪';
              })()}
            </div>
            <h1 className="text-5xl font-bold mb-4">
              {(() => {
                const totalQuestions = quizMode === 'spot-scam' ? spotScams.length : 
                                     quizMode === 'memory-match' ? memoryMatchPairs.length :
                                     quizMode === 'drag-sort' ? dragSortMessages.length :
                                     quizMode === 'what-would-you-do' ? whatWouldYouDoScenarios.length :
                                     shuffledQuestions.length;
                const percentage = (score / totalQuestions) * 100;
                if (percentage === 100) return language === 'zh' ? '完美！诈骗克星 🎉' : language === 'ms' ? 'Sempurna! Pakar Penipuan 🎉' : 'Perfect! Scam Master 🎉';
                if (percentage >= 80) return language === 'zh' ? '太棒了！诈骗守护者 🎉' : language === 'ms' ? 'Hebat! Penjaga Penipuan 🎉' : 'Excellent! Scam Guardian 🎉';
                if (percentage >= 50) return language === 'zh' ? '做得好！诈骗斗士' : language === 'ms' ? 'Bagus! Pejuang Penipuan' : 'Well Done! Scam Fighter';
                return language === 'zh' ? '继续努力！' : language === 'ms' ? 'Teruskan!' : 'Keep Learning!';
              })()}
            </h1>
            <p className="text-7xl font-bold text-primary mb-6">
              {score}/{quizMode === 'spot-scam' ? spotScams.length : 
                      quizMode === 'memory-match' ? memoryMatchPairs.length :
                      quizMode === 'drag-sort' ? dragSortMessages.length :
                      quizMode === 'what-would-you-do' ? whatWouldYouDoScenarios.length :
                      shuffledQuestions.length}
            </p>
            <p className="text-xl text-muted-foreground mb-4">
              {language === 'zh' ? '测验完成' : language === 'ms' ? 'Kuiz Lengkap' : 'Quiz Complete'}
            </p>
            <Badge variant="outline" className="mb-8 text-lg px-6 py-2">
              {gameModes.find(m => m.id === quizMode)?.title[language]}
            </Badge>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                data-testid="button-restart-quiz"
                size="lg"
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setAnsweredCount(0);
                  setShowResults(false);
                  setQuizMode(null);
                }}
                className="gap-2 min-h-[60px] min-w-[180px] text-lg"
              >
                <Trophy className="w-6 h-6" />
                {language === 'zh' ? '再玩一次' : language === 'ms' ? 'Main Lagi' : 'Play Again'}
              </Button>
              <Button
                data-testid="button-share-results"
                size="lg"
                variant="outline"
                onClick={handleShare}
                className="gap-2 min-h-[60px] min-w-[180px] text-lg"
              >
                <Share2 className="w-6 h-6" />
                {language === 'zh' ? '分享成绩' : language === 'ms' ? 'Kongsi Keputusan' : 'Share Results'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
