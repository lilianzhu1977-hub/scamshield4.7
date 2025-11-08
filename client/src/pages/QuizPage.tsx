import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Trophy, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import QuizCard from "@/components/QuizCard";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { quizQuestions as allQuestions } from "@shared/data/content";
import { getText } from "@/lib/translations";

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof allQuestions>([]);

  useEffect(() => {
    const savedStateStr = sessionStorage.getItem('scamshield-quiz-state');
    
    if (savedStateStr) {
      try {
        const savedState: QuizState = JSON.parse(savedStateStr);
        
        if (savedState.language === language) {
          const questionMap = new Map(allQuestions.map(q => [q.id, q]));
          const restoredQuestions = savedState.shuffledQuestionIds
            .map(id => questionMap.get(id))
            .filter((q): q is typeof allQuestions[0] => q !== undefined);
          
          if (restoredQuestions.length > 0) {
            const validIndex = Math.min(savedState.currentQuestionIndex, restoredQuestions.length - 1);
            setShuffledQuestions(restoredQuestions);
            setCurrentQuestion(Math.max(0, validIndex));
            setScore(savedState.score);
            setAnsweredCount(savedState.answeredCount);
            return;
          }
        }
      } catch (e) {
        console.error('Failed to restore quiz state:', e);
      }
    }
    
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredCount(0);
    
    const initialState: QuizState = {
      shuffledQuestionIds: shuffled.map(q => q.id),
      currentQuestionIndex: 0,
      score: 0,
      answeredCount: 0,
      language
    };
    sessionStorage.setItem('scamshield-quiz-state', JSON.stringify(initialState));
  }, [language]);

  const questions = shuffledQuestions.map(q => ({
    question: getText(q.question, language),
    options: q.options.map(opt => getText(opt, language)),
    correctIndex: q.correctIndex,
    explanation: getText(q.explanation, language)
  }));

  const handleAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    const newAnsweredCount = answeredCount + 1;
    
    setScore(newScore);
    setAnsweredCount(newAnsweredCount);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
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
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    
    setShowResults(false);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredCount(0);
    
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
      ? `我在ScamShield+测验中得了${score}/${questions.length}分！来测试你的防诈骗知识吧！`
      : language === 'ms'
      ? `Saya skor ${score}/${questions.length} dalam kuiz ScamShield+! Uji pengetahuan pencegahan penipuan anda!`
      : `I scored ${score}/${questions.length} on the ScamShield+ quiz! Test your scam prevention knowledge!`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    
    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        window.open(whatsappUrl, '_blank');
      });
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  if (!shuffledQuestions.length) {
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

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    let title, badge;
    
    if (percentage >= 80) {
      title = language === 'zh' ? '诈骗守护者 🎉' : language === 'ms' ? 'Penjaga Penipuan 🎉' : 'Scam Guardian 🎉';
      badge = '🏆';
    } else if (percentage >= 50) {
      title = language === 'zh' ? '诈骗斗士' : language === 'ms' ? 'Pejuang Penipuan' : 'Scam Fighter';
      badge = '🥈';
    } else {
      title = language === 'zh' ? '初学者' : language === 'ms' ? 'Pemula' : 'Beginner';
      badge = '🥉';
    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <div className="text-9xl mb-6">{badge}</div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-6xl font-bold text-primary mb-6">{score}/{questions.length}</p>
          <p className="text-xl text-muted-foreground mb-8">
            {language === 'zh' 
              ? percentage >= 80 ? '太棒了！你对诈骗有深入了解。' : percentage >= 50 ? '不错！继续学习以提高你的防护能力。' : '继续努力！复习学习模块以增强你的知识。'
              : language === 'ms'
              ? percentage >= 80 ? 'Hebat! Anda mempunyai pemahaman yang kuat tentang penipuan.' : percentage >= 50 ? 'Bagus! Terus belajar untuk tingkatkan pertahanan anda.' : 'Terus berusaha! Semak modul pembelajaran untuk perkuatkan pengetahuan.'
              : percentage >= 80 ? 'Excellent! You have strong scam awareness.' : percentage >= 50 ? 'Good job! Keep learning to improve your defenses.' : 'Keep trying! Review the learning modules to strengthen your knowledge.'}
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button
              data-testid="button-restart-quiz"
              size="lg"
              onClick={handleRestart}
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
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <Button
          data-testid="button-back"
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-4"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
        </Button>
        <h1 className="text-4xl font-bold mb-2">
          {language === 'zh' ? '防诈骗测验' : language === 'ms' ? 'Kuiz Pencegahan Penipuan' : 'Scam Prevention Quiz'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '测试你的防诈骗知识' : language === 'ms' ? 'Uji pengetahuan pencegahan penipuan anda' : 'Test your scam prevention knowledge'}
        </p>
      </div>

      <QuizCard
        questionNumber={currentQuestion + 1}
        totalQuestions={questions.length}
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        correctIndex={questions[currentQuestion].correctIndex}
        explanation={questions[currentQuestion].explanation}
        onAnswer={handleAnswer}
        testId={`quiz-question-${currentQuestion}`}
      />
    </div>
  );
}
