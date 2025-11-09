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

  const labels = {
    en: {
      from: 'From',
      caller: 'Caller',
      attachment: 'Attachment',
      isScam: 'Is this a scam?',
      yesScam: 'Yes, It\'s a Scam',
      noLegit: 'No, It\'s Legitimate',
      showHints: 'Show Hints',
      hideHints: 'Hide Hints',
      watchFor: 'Watch for these red flags:',
      correct: 'Correct!',
      notQuite: 'Not quite right',
      whatToDo: 'What to do:',
      redFlags: 'Red Flags:'
    },
    zh: {
      from: '发件人',
      caller: '来电者',
      attachment: '附件',
      isScam: '这是诈骗吗？',
      yesScam: '是诈骗',
      noLegit: '不是诈骗',
      showHints: '显示提示',
      hideHints: '隐藏提示',
      watchFor: '注意这些警告信号：',
      correct: '正确！',
      notQuite: '不完全正确',
      whatToDo: '应该怎么做：',
      redFlags: '警告信号：'
    },
    ms: {
      from: 'Dari',
      caller: 'Pemanggil',
      attachment: 'Lampiran',
      isScam: 'Adakah ini penipuan?',
      yesScam: 'Ya, Penipuan',
      noLegit: 'Tidak, Sah',
      showHints: 'Tunjuk Petunjuk',
      hideHints: 'Sembunyikan Petunjuk',
      watchFor: 'Perhatikan tanda amaran:',
      correct: 'Betul!',
      notQuite: 'Tidak tepat',
      whatToDo: 'Apa yang perlu dilakukan:',
      redFlags: 'Tanda Amaran:'
    }
  };

  const t = labels[language];

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
            {t.from}: {sender}
          </div>
        )}
        {caller && (
          <div className="text-sm text-muted-foreground mb-2">
            {t.caller}: {caller}
          </div>
        )}
        {attachmentName && (
          <div className="text-sm text-muted-foreground mb-2">
            {t.attachment}: {attachmentName}
          </div>
        )}
        <p className="text-lg mt-4">{content}</p>
      </Card>

      {!answered && (
        <div className="space-y-4 mb-6">
          <p className="text-lg font-semibold">
            {t.isScam}
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="destructive"
              onClick={() => handleChoice(true)}
              className="flex-1 h-20 text-xl"
            >
              <AlertTriangle className="w-6 h-6 mr-2" />
              {t.yesScam}
            </Button>
            <Button
              size="lg"
              variant="default"
              onClick={() => handleChoice(false)}
              className="flex-1 h-20 text-xl"
            >
              <CheckCircle2 className="w-6 h-6 mr-2" />
              {t.noLegit}
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowRedFlags(!showRedFlags)}
            className="w-full"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showRedFlags ? t.hideHints : t.showHints}
          </Button>

          {showRedFlags && redFlags.length > 0 && (
            <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                {t.watchFor}
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
                {userChoice === isScam ? t.correct : t.notQuite}
              </h3>
              <p className="text-lg mb-4">{explanation}</p>

              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {t.whatToDo}
                </h4>
                <p>{whatToDo}</p>
              </div>

              {redFlags.length > 0 && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {t.redFlags}
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
}