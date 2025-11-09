import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Trophy, Share2, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";
import QuizCard from "@/components/QuizCard";
import SpotScamCard from "@/components/SpotScamCard";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { quizQuestions as allQuestions } from "@shared/data/content";
import { spotScamQuestions } from "@shared/data/spotScamQuestions";
import { getText } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";

interface QuizState {
  shuffledQuestionIds: string[];
  currentQuestionIndex: number;
  score: number;
  answeredCount: number;
  language: string;
}

export default function QuizPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const [quizMode, setQuizMode] = useState<'traditional' | 'spot-scam' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof allQuestions>([]);
  const [spotScams, setSpotScams] = useState<typeof spotScamQuestions[keyof typeof spotScamQuestions]>([]);

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

  const handleAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    const newAnsweredCount = answeredCount + 1;

    setScore(newScore);
    setAnsweredCount(newAnsweredCount);

    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        const newQuestionIndex = currentQuestion + 1;
        setCurrentQuestion(newQuestionIndex);

        const state: QuizState = {
          shuffledQuestionIds: shuffledQuestions.map(q => q.id),
          currentQuestionIndex: newQuestionIndex,
          score: newScore,
          answeredCount: newAnsweredCount,
          language
        };
        sessionStorage.setItem('scamshield-quiz-state', JSON.stringify(state));
      } else {
        setShowResults(true);
        sessionStorage.removeItem('scamshield-quiz-state');
      }
    }, 2000);
  };

  const handleRestart = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const shuffledSpotScams = [...(spotScamQuestions[language] || spotScamQuestions.en)].sort(() => Math.random() - 0.5);

    setShowResults(false);
    setShuffledQuestions(shuffled);
    setSpotScams(shuffledSpotScams);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredCount(0);
    setQuizMode(null);

    const initialState: QuizState = {
      shuffledQuestionIds: shuffled.map(q => q.id),
      currentQuestionIndex: 0,
      score: 0,
      answeredCount: 0,
      language
    };
    sessionStorage.setItem('scamshield-quiz-state', JSON.stringify(initialState));
  };

  const handleShare = () => {
    const text = language === 'zh'
      ? `我在ScamShield+测验中得了${score}/${(quizMode === 'spot-scam' ? spotScams.length : shuffledQuestions.length)}分！来测试你的防诈骗知识吧！`
      : language === 'ms'
      ? `Saya skor ${score}/${(quizMode === 'spot-scam' ? spotScams.length : shuffledQuestions.length)} dalam kuiz ScamShield+! Uji pengetahuan pencegahan penipuan anda!`
      : `I scored ${score}/${(quizMode === 'spot-scam' ? spotScams.length : shuffledQuestions.length)} on the ScamShield+ quiz! Test your scam prevention knowledge!`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        window.open(whatsappUrl, '_blank');
      });
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  if (!shuffledQuestions.length && !spotScams.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setLocation('/')}
            className="min-h-[60px] min-w-[60px]"
            data-testid="button-back"
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="text-xl ml-2">
              {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
            </span>
          </Button>
        </div>
        <Card className="p-8">
          <div className="text-center py-12">
            <div className="text-2xl mb-4">
              {language === 'zh' ? '加载中...' : language === 'ms' ? 'Memuatkan...' : 'Loading...'}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const questions = shuffledQuestions.map(q => ({
    question: getText(q.question, language),
    options: q.options.map(opt => getText(opt, language)),
    correctIndex: q.correctIndex,
    explanation: getText(q.explanation, language)
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => {
          if (quizMode && !showResults) {
            setQuizMode(null);
          } else {
            setLocation('/');
          }
        }}
        className="mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        {quizMode && !showResults ? (language === 'zh' ? '返回模式选择' : language === 'ms' ? 'Kembali ke Mod' : 'Back to Mode Selection') : getText('back', language)}
      </Button>

      {!quizMode && (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">
            {language === 'zh' ? '选择测验模式' : language === 'ms' ? 'Pilih Mod Kuiz' : 'Choose Quiz Mode'}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {language === 'zh' ? '选择你的学习方式' : language === 'ms' ? 'Pilih cara pembelajaran anda' : 'Select your learning style'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="p-8 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
              onClick={() => setQuizMode('traditional')}
            >
              <div className="text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-2">
                  {language === 'zh' ? '传统测验' : language === 'ms' ? 'Kuiz Tradisional' : 'Traditional Quiz'}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {language === 'zh' ? '多项选择题测试你的知识' : language === 'ms' ? 'Soalan pelbagai pilihan ujian pengetahuan anda' : 'Multiple choice questions to test your knowledge'}
                </p>
                <Badge variant="secondary">
                  {shuffledQuestions.length} {language === 'zh' ? '题' : language === 'ms' ? 'soalan' : 'questions'}
                </Badge>
              </div>
            </Card>

            <Card 
              className="p-8 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-destructive"
              onClick={() => setQuizMode('spot-scam')}
            >
              <div className="text-center">
                <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-destructive" />
                <h2 className="text-2xl font-bold mb-2">
                  {language === 'zh' ? '发现诈骗' : language === 'ms' ? 'Kesan Penipuan' : 'Spot the Scam'}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {language === 'zh' ? '分析真实场景，识别诈骗' : language === 'ms' ? 'Analisis senario sebenar, kenal pasti penipuan' : 'Analyze real scenarios and identify scams'}
                </p>
                <Badge variant="destructive">
                  {spotScams.length} {language === 'zh' ? '场景' : language === 'ms' ? 'senario' : 'scenarios'}
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      )}

      {quizMode === 'spot-scam' && !showResults && spotScams.length > 0 && (
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">
              {language === 'zh' ? '发现诈骗挑战' : language === 'ms' ? 'Cabaran Kesan Penipuan' : 'Spot the Scam Challenge'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'zh' ? `场景 ${currentQuestion + 1} / ${spotScams.length}` : 
               language === 'ms' ? `Senario ${currentQuestion + 1} / ${spotScams.length}` :
               `Scenario ${currentQuestion + 1} of ${spotScams.length}`}
            </p>
            <p className="text-lg font-semibold mt-2">
              {language === 'zh' ? `得分: ${score}` : language === 'ms' ? `Skor: ${score}` : `Score: ${score}`}
            </p>
          </div>

          <SpotScamCard
            {...spotScams[currentQuestion]}
            onAnswer={(correct) => {
              if (correct) setScore(score + 20);
              setAnsweredCount(answeredCount + 1);

              setTimeout(() => {
                if (currentQuestion < spotScams.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  setShowResults(true);
                }
              }, 3000);
            }}
          />
        </div>
      )}

      {quizMode === 'traditional' && !showResults && shuffledQuestions.length > 0 && (
        <QuizCard
          questionNumber={currentQuestion + 1}
          totalQuestions={shuffledQuestions.length}
          question={shuffledQuestions[currentQuestion].question}
          options={shuffledQuestions[currentQuestion].options}
          correctIndex={shuffledQuestions[currentQuestion].correctIndex}
          explanation={shuffledQuestions[currentQuestion].explanation}
          onAnswer={(isCorrect) => {
            if (isCorrect) setScore(score + 10);
            setAnsweredCount(answeredCount + 1);

            setTimeout(() => {
              if (currentQuestion < shuffledQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                setShowResults(true);
              }
            }, 2000);
          }}
          testId="quiz-card"
        />
      )}

      {showResults ? (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <div className="text-9xl mb-6">
              {(() => {
                const percentage = (score / (quizMode === 'spot-scam' ? spotScams.length : shuffledQuestions.length)) * 100;
                if (percentage >= 80) return '🏆';
                if (percentage >= 50) return '🥈';
                return '🥉';
              })()}
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {(() => {
                const percentage = (score / (quizMode === 'spot-scam' ? spotScams.length : shuffledQuestions.length)) * 100;
                if (percentage >= 80) return language === 'zh' ? '诈骗守护者 🎉' : language === 'ms' ? 'Penjaga Penipuan 🎉' : 'Scam Guardian 🎉';
                if (percentage >= 50) return language === 'zh' ? '诈骗斗士' : language === 'ms' ? 'Pejuang Penipuan' : 'Scam Fighter';
                return language === 'zh' ? '初学者' : language === 'ms' ? 'Pemula' : 'Beginner';
              })()}
            </h1>
            <p className="text-6xl font-bold text-primary mb-6">{score}/{quizMode === 'spot-scam' ? spotScams.length : shuffledQuestions.length}</p>
            <p className="text-muted-foreground mb-4">
              {getText('quizComplete', language)}
            </p>
            <Badge variant="outline" className="mb-8">
              {quizMode === 'spot-scam' 
                ? (language === 'zh' ? '发现诈骗模式' : language === 'ms' ? 'Mod Kesan Penipuan' : 'Spot the Scam Mode')
                : (language === 'zh' ? '传统测验模式' : language === 'ms' ? 'Mod Kuiz Tradisional' : 'Traditional Quiz Mode')
              }
            </Badge>

            <div className="flex gap-4 justify-center">
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
                className="gap-2"
              >
                <Trophy className="w-5 h-5" />
                {language === 'zh' ? '再试一次' : language === 'ms' ? 'Cuba Lagi' : 'Try Again'}
              </Button>
              <Button
                data-testid="button-share-results"
                size="lg"
                variant="outline"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-5 h-5" />
                {language === 'zh' ? '分享成绩' : language === 'ms' ? 'Kongsi Keputusan' : 'Share Results'}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}