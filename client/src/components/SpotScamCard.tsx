
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle, Phone, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Mail, Phone, MessageSquare, AlertTriangle, CheckCircle2, XCircle, Eye } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [answered, setAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setUserChoice(null);
    setShowRedFlags(false);
    setAnswered(false);
  }, [content, scenario]);

  const handleChoice = (choice: boolean) => {
    if (answered) return;
    
    setUserChoice(choice);
    setAnswered(true);
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

  return (
    <Card className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{scenario}</h2>
        <Badge variant="outline" className="mb-4">
          <span className="flex items-center gap-2">
            {getIcon()}
            {messageType.toUpperCase()}
          </span>
        </Badge>
      </div>

      <Card className="p-6 mb-6 bg-muted/50">
        {sender && (
          <div className="text-sm text-muted-foreground mb-2">
            {language === 'zh' ? '发件人' : language === 'ms' ? 'Pengirim' : 'From'}: {sender}
          </div>
        )}
        {caller && (
          <div className="text-sm text-muted-foreground mb-2">
            {language === 'zh' ? '来电者' : language === 'ms' ? 'Pemanggil' : 'Caller'}: {caller}
          </div>
        )}
        {attachmentName && (
          <div className="text-sm text-muted-foreground mb-2">
            {language === 'zh' ? '附件' : language === 'ms' ? 'Lampiran' : 'Attachment'}: {attachmentName}
          </div>
        )}
        <p className="text-lg mt-4">{content}</p>
      </Card>

      {!answered && (
        <div className="space-y-4 mb-6">
          <p className="text-lg font-semibold">
            {language === 'zh' ? '这是诈骗吗？' : language === 'ms' ? 'Adakah ini penipuan?' : 'Is this a scam?'}
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="destructive"
              onClick={() => handleChoice(true)}
              className="flex-1 h-20 text-xl"
            >
              <AlertTriangle className="w-6 h-6 mr-2" />
              {language === 'zh' ? '是诈骗' : language === 'ms' ? 'Ya, Penipuan' : 'Yes, It\'s a Scam'}
            </Button>
            <Button
              size="lg"
              variant="default"
              onClick={() => handleChoice(false)}
              className="flex-1 h-20 text-xl"
            >
              <CheckCircle2 className="w-6 h-6 mr-2" />
              {language === 'zh' ? '不是诈骗' : language === 'ms' ? 'Tidak, Sah' : 'No, It\'s Legitimate'}
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowRedFlags(!showRedFlags)}
            className="w-full"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showRedFlags 
              ? (language === 'zh' ? '隐藏提示' : language === 'ms' ? 'Sembunyikan Petunjuk' : 'Hide Hints')
              : (language === 'zh' ? '显示提示' : language === 'ms' ? 'Tunjuk Petunjuk' : 'Show Hints')
            }
          </Button>

          {showRedFlags && redFlags.length > 0 && (
            <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                {language === 'zh' ? '注意这些警告信号：' : language === 'ms' ? 'Perhatikan tanda amaran:' : 'Watch for these red flags:'}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {redFlags.map((flag, index) => (
                  <li key={index} className="text-sm">{flag}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {answered && userChoice !== null && (
        <Card className={`p-6 ${userChoice === isScam ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <div className="flex items-start gap-3 mb-4">
            {userChoice === isScam ? (
              <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            )}
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {userChoice === isScam 
                  ? (language === 'zh' ? '正确！' : language === 'ms' ? 'Betul!' : 'Correct!') 
                  : (language === 'zh' ? '不完全正确' : language === 'ms' ? 'Tidak tepat' : 'Not quite right')
                }
              </h3>
              <p className="text-lg mb-4">{explanation}</p>
              
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {language === 'zh' ? '应该怎么做：' : language === 'ms' ? 'Apa yang perlu dilakukan:' : 'What to do:'}
                </h4>
                <p>{whatToDo}</p>
              </div>

              {redFlags.length > 0 && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {language === 'zh' ? '警告信号：' : language === 'ms' ? 'Tanda Amaran:' : 'Red Flags:'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {redFlags.map((flag, index) => (
                      <li key={index} className="text-sm">{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </Card>
  );

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
