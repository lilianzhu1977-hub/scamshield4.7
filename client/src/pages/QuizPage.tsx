import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Trophy, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import QuizCard from "@/components/QuizCard";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

export default function QuizPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = language === 'zh' ? [
    {
      question: "接到声称是警察的电话，要求你转账到'安全账户'，你应该怎么做？",
      options: [
        "立即转账",
        "挂断电话并用官方号码回拨警察局",
        "提供你的银行详情",
        "请他们稍后再打"
      ],
      correctIndex: 1,
      explanation: "绝不要通过电话转账或提供个人信息，即使对方声称是警察。应该挂断电话并用官方号码回拨。"
    },
    {
      question: "你收到一条短信说你的包裹需要额外费用，并附有一个链接。你应该？",
      options: [
        "点击链接立即付款",
        "忽略短信",
        "通过官方应用或网站查询",
        "回复短信询问详情"
      ],
      correctIndex: 2,
      explanation: "不要点击短信中的可疑链接。应该直接访问官方网站或应用来验证信息。"
    },
    {
      question: "网上认识的'朋友'要求你借钱应急，你从未见过这个人。你应该？",
      options: [
        "立即汇款帮助朋友",
        "拒绝并考虑这可能是诈骗",
        "先借一小笔钱试试",
        "要求他们提供身份证明"
      ],
      correctIndex: 1,
      explanation: "永远不要给从未见过面的网友汇款。这是典型的浪漫诈骗或友情诈骗。"
    }
  ] : language === 'ms' ? [
    {
      question: "Pemanggil mendakwa dari polis dan minta anda pindahkan wang ke 'akaun selamat'. Apa yang perlu anda lakukan?",
      options: [
        "Pindahkan wang dengan segera",
        "Tutup telefon dan hubungi polis menggunakan nombor rasmi",
        "Berikan butiran bank anda",
        "Minta mereka hubungi semula nanti"
      ],
      correctIndex: 1,
      explanation: "Jangan sekali-kali pindahkan wang atau berikan maklumat peribadi melalui telefon, walaupun pemanggil mendakwa dari polis. Tutup telefon dan hubungi semula menggunakan nombor rasmi."
    },
    {
      question: "Anda terima SMS bahawa pakej anda perlukan bayaran tambahan dengan pautan. Apa yang perlu anda lakukan?",
      options: [
        "Klik pautan untuk bayar segera",
        "Abaikan SMS",
        "Semak melalui aplikasi atau laman web rasmi",
        "Balas SMS untuk tanya butiran"
      ],
      correctIndex: 2,
      explanation: "Jangan klik pautan mencurigakan dalam SMS. Lawati laman web atau aplikasi rasmi terus untuk sahkan maklumat."
    },
    {
      question: "'Kawan' dalam talian minta anda pinjam wang untuk kecemasan, anda tidak pernah jumpa orang ini. Apa yang perlu anda lakukan?",
      options: [
        "Hantar wang segera untuk bantu kawan",
        "Tolak dan anggap ia mungkin penipuan",
        "Pinjam jumlah kecil dahulu untuk cuba",
        "Minta mereka tunjuk pengenalan diri"
      ],
      correctIndex: 1,
      explanation: "Jangan sekali-kali hantar wang kepada kenalan dalam talian yang tidak pernah ditemui. Ini adalah penipuan romantik atau persahabatan biasa."
    }
  ] : [
    {
      question: "A caller claims to be from the police and asks you to transfer money to a 'safe account'. What should you do?",
      options: [
        "Transfer the money immediately",
        "Hang up and call the police using their official number",
        "Give them your bank details",
        "Ask them to call back later"
      ],
      correctIndex: 1,
      explanation: "Never transfer money or give personal details over the phone, even if the caller claims to be from the police. Always hang up and call back using official numbers."
    },
    {
      question: "You receive an SMS saying your package needs extra fees with a link. What should you do?",
      options: [
        "Click the link to pay immediately",
        "Ignore the SMS",
        "Check through the official app or website",
        "Reply to the SMS asking for details"
      ],
      correctIndex: 2,
      explanation: "Don't click suspicious links in SMS. Go directly to official websites or apps to verify information."
    },
    {
      question: "An online 'friend' asks to borrow money for an emergency, you've never met this person. What should you do?",
      options: [
        "Send money immediately to help",
        "Refuse and consider it might be a scam",
        "Send a small amount first to test",
        "Ask them to provide ID proof"
      ],
      correctIndex: 1,
      explanation: "Never send money to online friends you've never met in person. This is a classic romance or friendship scam."
    }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnsweredCount(answeredCount + 1);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredCount(0);
    setShowResults(false);
  };

  const handleShare = () => {
    const text = language === 'zh'
      ? `我在ScamShield+测验中得了${score}/${questions.length}分！来测试你的防诈骗知识吧！`
      : language === 'ms'
      ? `Saya skor ${score}/${questions.length} dalam kuiz ScamShield+! Uji pengetahuan pencegahan penipuan anda!`
      : `I scored ${score}/${questions.length} on the ScamShield+ quiz! Test your scam prevention knowledge!`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      alert(text);
    }
  };

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
