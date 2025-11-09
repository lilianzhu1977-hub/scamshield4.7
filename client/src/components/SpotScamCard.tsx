
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle, Phone, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

interface SpotScamCardProps {
  scenario: string;
  messageType: 'sms' | 'email' | 'call' | 'chat';
  content: string;
  sender?: string;
  caller?: string;
  attachmentName?: string;
  redFlags: string[];
  isScam: boolean;
  explanation: string;
  whatToDo: string;
  onAnswer: (correct: boolean) => void;
}

export default function SpotScamCard({
  scenario,
  messageType,
  content,
  sender,
  caller,
  attachmentName,
  redFlags,
  isScam,
  explanation,
  whatToDo,
  onAnswer
}: SpotScamCardProps) {
  const { language } = useApp();
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [showRedFlags, setShowRedFlags] = useState(false);

  const handleChoice = (choice: boolean) => {
    setUserChoice(choice);
    onAnswer(choice === isScam);
  };

  const getIcon = () => {
    switch (messageType) {
      case 'sms': return <Smartphone className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'call': return <Phone className="w-5 h-5" />;
      case 'chat': return <MessageSquare className="w-5 h-5" />;
    }
  };

  const labels = {
    en: {
      scam: 'This is a SCAM',
      legit: 'This is LEGITIMATE',
      showHints: 'Show Red Flags',
      hideHints: 'Hide Red Flags',
      redFlags: 'Red Flags',
      explanation: 'Explanation',
      whatToDo: 'What to Do',
      correct: 'Correct!',
      incorrect: 'Not quite right'
    },
    zh: {
      scam: '这是诈骗',
      legit: '这是真的',
      showHints: '显示危险信号',
      hideHints: '隐藏危险信号',
      redFlags: '危险信号',
      explanation: '说明',
      whatToDo: '怎么做',
      correct: '正确！',
      incorrect: '不太对'
    },
    ms: {
      scam: 'Ini PENIPUAN',
      legit: 'Ini SAH',
      showHints: 'Tunjuk Tanda Bahaya',
      hideHints: 'Sembunyi Tanda',
      redFlags: 'Tanda Bahaya',
      explanation: 'Penjelasan',
      whatToDo: 'Apa Perlu Buat',
      correct: 'Betul!',
      incorrect: 'Tidak tepat'
    }
  };

  const t = labels[language];

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{scenario}</h3>
        <Badge variant="outline" className="gap-2">
          {getIcon()}
          {messageType.toUpperCase()}
        </Badge>
      </div>

      {/* Message Display */}
      <Card className="p-4 bg-muted mb-4">
        {(sender || caller) && (
          <div className="text-sm text-muted-foreground mb-2">
            {language === 'en' ? 'From' : language === 'zh' ? '来自' : 'Dari'}: 
            <strong className="ml-2">{sender || caller}</strong>
          </div>
        )}
        <p className="text-base whitespace-pre-wrap">{content}</p>
        {attachmentName && (
          <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
            📎 {attachmentName}
          </div>
        )}
      </Card>

      {/* Hint Button */}
      {userChoice === null && redFlags.length > 0 && (
        <Button
          variant="outline"
          onClick={() => setShowRedFlags(!showRedFlags)}
          className="mb-4 w-full"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          {showRedFlags ? t.hideHints : t.showHints}
        </Button>
      )}

      {/* Red Flags */}
      {showRedFlags && userChoice === null && (
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 mb-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {t.redFlags}:
          </h4>
          <ul className="space-y-1">
            {redFlags.map((flag, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Choice Buttons */}
      {userChoice === null && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button
            onClick={() => handleChoice(true)}
            variant="destructive"
            size="lg"
            className="h-auto py-4"
          >
            <XCircle className="w-5 h-5 mr-2" />
            {t.scam}
          </Button>
          <Button
            onClick={() => handleChoice(false)}
            variant="default"
            size="lg"
            className="h-auto py-4"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            {t.legit}
          </Button>
        </div>
      )}

      {/* Feedback */}
      {userChoice !== null && (
        <Card className={`p-6 ${userChoice === isScam ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : 'bg-red-50 dark:bg-red-950/20 border-red-200'}`}>
          <div className="flex items-start gap-3 mb-4">
            {userChoice === isScam ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                {userChoice === isScam ? t.correct : t.incorrect}
              </h3>
            </div>
          </div>

          {redFlags.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">{t.redFlags}:</h4>
              <ul className="space-y-1">
                {redFlags.map((flag, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span>⚠️</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4">
            <h4 className="font-semibold mb-2">{t.explanation}:</h4>
            <p className="text-sm">{explanation}</p>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              🛡️ {t.whatToDo}:
            </h4>
            <p className="text-sm">{whatToDo}</p>
          </div>
        </Card>
      )}
    </Card>
  );
}
