import { Button } from "@/components/ui/button";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import NewsCard from "@/components/NewsCard";
import { useApp } from "@/contexts/AppContext";

export default function NewsPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const [showAlert, setShowAlert] = useState(true);

  const newsItems = language === 'zh' ? [
    {
      title: "新型投资诈骗针对老年人",
      summary: "警方警告越来越多的案例，诈骗者承诺加密货币投资高回报，已有多名受害者损失超过10万新元。",
      date: "2025年11月7日",
      severity: 'high' as const,
      testId: "news-investment-scam"
    },
    {
      title: "虚假银行短信激增",
      summary: "本周报告了超过500起虚假银行短信案例，要求收件人点击链接'验证账户'。",
      date: "2025年11月6日",
      severity: 'high' as const,
      testId: "news-bank-sms"
    },
    {
      title: "警方逮捕诈骗团伙成员",
      summary: "反诈骗部门逮捕了5名涉嫌诈骗老年人超过50万新元的嫌疑人。",
      date: "2025年11月5日",
      severity: 'medium' as const,
      testId: "news-arrests"
    },
    {
      title: "ScamShield应用新功能",
      summary: "官方ScamShield应用增加了AI驱动的诈骗检测和实时警报功能。",
      date: "2025年11月4日",
      severity: 'low' as const,
      testId: "news-scamshield"
    }
  ] : language === 'ms' ? [
    {
      title: "Penipuan Pelaburan Baharu Sasarkan Warga Emas",
      summary: "Polis amaran peningkatan kes di mana penipu janjikan pulangan tinggi pelaburan mata wang kripto, mangsa kehilangan lebih $100,000.",
      date: "7 Nov 2025",
      severity: 'high' as const,
      testId: "news-investment-scam"
    },
    {
      title: "Lonjakan SMS Bank Palsu",
      summary: "Lebih 500 kes SMS bank palsu dilaporkan minggu ini, minta penerima klik pautan untuk 'sahkan akaun'.",
      date: "6 Nov 2025",
      severity: 'high' as const,
      testId: "news-bank-sms"
    },
    {
      title: "Polis Tangkap Sindiket Penipu",
      summary: "Unit Anti-Penipuan tangkap 5 disyaki menipu warga emas lebih $500,000.",
      date: "5 Nov 2025",
      severity: 'medium' as const,
      testId: "news-arrests"
    },
    {
      title: "Ciri Baharu Aplikasi ScamShield",
      summary: "Aplikasi ScamShield rasmi tambah pengesanan penipuan berkuasa AI dan amaran masa nyata.",
      date: "4 Nov 2025",
      severity: 'low' as const,
      testId: "news-scamshield"
    }
  ] : [
    {
      title: "New Investment Scam Targets Elderly",
      summary: "Police warn of increasing cases where scammers promise high returns on cryptocurrency investments, with victims losing over $100,000.",
      date: "Nov 7, 2025",
      severity: 'high' as const,
      testId: "news-investment-scam"
    },
    {
      title: "Surge in Fake Bank SMS Messages",
      summary: "Over 500 cases of fake bank SMS reported this week, asking recipients to click links to 'verify accounts'.",
      date: "Nov 6, 2025",
      severity: 'high' as const,
      testId: "news-bank-sms"
    },
    {
      title: "Police Arrest Scam Syndicate Members",
      summary: "Anti-Scam Unit arrests 5 suspects involved in scamming elderly victims of over $500,000.",
      date: "Nov 5, 2025",
      severity: 'medium' as const,
      testId: "news-arrests"
    },
    {
      title: "New Features in ScamShield App",
      summary: "Official ScamShield app adds AI-powered scam detection and real-time alerts.",
      date: "Nov 4, 2025",
      severity: 'low' as const,
      testId: "news-scamshield"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
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
          {language === 'zh' ? '诈骗新闻和警报' : language === 'ms' ? 'Berita dan Amaran Penipuan' : 'Scam News & Alerts'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '了解最新的诈骗趋势和警告' : language === 'ms' ? 'Kekal dikemas kini dengan trend dan amaran penipuan terkini' : 'Stay updated with latest scam trends and warnings'}
        </p>
      </div>

      {showAlert && (
        <div className="mb-6 animate-in slide-in-from-top-4">
          <div className="bg-destructive text-destructive-foreground p-6 rounded-lg border-2 border-destructive shadow-lg">
            <div className="flex items-start gap-4">
              <div className="animate-pulse">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  {language === 'zh' ? '⚠️ 紧急警报：新型诈骗正在流行' :
                   language === 'ms' ? '⚠️ Amaran Segera: Penipuan Baharu Aktif' :
                   '⚠️ URGENT ALERT: New Scam Wave Active'}
                </h3>
                <p>
                  {language === 'zh' ? '骗子正在使用AI克隆的声音冒充家人。永远通过视频通话验证！' :
                   language === 'ms' ? 'Penipu guna suara klon AI sebagai keluarga. Sentiasa sahkan dengan video call!' :
                   'Scammers using AI-cloned voices to impersonate family. Always verify with video call!'}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)}>
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {newsItems.map((news) => (
          <NewsCard
            key={news.testId}
            title={news.title}
            summary={news.summary}
            date={news.date}
            severity={news.severity}
            testId={news.testId}
          />
        ))}
      </div>
    </div>
  );
}
