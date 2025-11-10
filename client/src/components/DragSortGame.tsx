import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { dragSortMessages } from "@shared/data/dragSortData";
import { CheckCircle2, XCircle, RotateCcw, Mail } from "lucide-react";

interface DragSortGameProps {
  onComplete: (score: number, total: number) => void;
}

export default function DragSortGame({ onComplete }: DragSortGameProps) {
  const { language } = useApp();
  const [messages] = useState(() => [...dragSortMessages].sort(() => Math.random() - 0.5));
  const [sortedItems, setSortedItems] = useState<Record<string, 'safe' | 'scam' | 'unsorted'>>({});
  const [showResults, setShowResults] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  useEffect(() => {
    const initial: Record<string, 'safe' | 'scam' | 'unsorted'> = {};
    messages.forEach(msg => {
      initial[msg.id] = 'unsorted';
    });
    setSortedItems(initial);
  }, [messages]);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (category: 'safe' | 'scam') => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedId) {
      setSortedItems(prev => ({
        ...prev,
        [draggedId]: category
      }));
      setDraggedId(null);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = messages.filter(msg => {
      const sorted = sortedItems[msg.id];
      const correct = msg.isSafe ? 'safe' : 'scam';
      return sorted === correct;
    }).length;
    
    setTimeout(() => {
      onComplete(score, messages.length);
    }, 3000);
  };

  const allSorted = Object.values(sortedItems).every(v => v !== 'unsorted');

  const safeMessages = messages.filter(msg => sortedItems[msg.id] === 'safe');
  const scamMessages = messages.filter(msg => sortedItems[msg.id] === 'scam');
  const unsortedMessages = messages.filter(msg => sortedItems[msg.id] === 'unsorted');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">
          {language === 'zh' ? '分类消息游戏' : language === 'ms' ? 'Permainan Susun Mesej' : 'Sort Messages Game'}
        </h2>
        <p className="text-muted-foreground text-lg">
          {language === 'zh' ? '将消息拖到安全或诈骗类别' : language === 'ms' ? 'Seret mesej ke kategori Selamat atau Penipuan' : 'Drag messages to Safe or Scam categories'}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card 
          className="p-6 min-h-[500px] bg-muted/50"
          onDragOver={handleDragOver}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            {language === 'zh' ? '待分类' : language === 'ms' ? 'Belum Disusun' : 'To Sort'}
            <Badge variant="secondary">{unsortedMessages.length}</Badge>
          </h3>
          <div className="space-y-3">
            {unsortedMessages.map((msg) => (
              <Card
                key={msg.id}
                data-testid={`message-${msg.id}`}
                className="p-4 cursor-move hover-elevate active-elevate-2 bg-background"
                draggable
                onDragStart={() => handleDragStart(msg.id)}
              >
                <p className="text-sm mb-2 break-words">{msg.content[language]}</p>
                <p className="text-xs text-muted-foreground">{language === 'zh' ? '发件人' : language === 'ms' ? 'Penghantar' : 'From'}: {msg.sender[language]}</p>
              </Card>
            ))}
          </div>
        </Card>

        <Card 
          className="p-6 min-h-[500px] border-2 border-green-500/50 bg-green-50 dark:bg-green-950/20"
          onDragOver={handleDragOver}
          onDrop={handleDrop('safe')}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            {language === 'zh' ? '安全' : language === 'ms' ? 'Selamat' : 'Safe'}
            <Badge variant="outline" className="border-green-500">{safeMessages.length}</Badge>
          </h3>
          <div className="space-y-3">
            {safeMessages.map((msg) => (
              <Card
                key={msg.id}
                className={`p-4 bg-background ${showResults ? (msg.isSafe ? 'border-2 border-green-500' : 'border-2 border-red-500') : ''}`}
              >
                <p className="text-sm mb-2 break-words">{msg.content[language]}</p>
                <p className="text-xs text-muted-foreground mb-2">{language === 'zh' ? '发件人' : language === 'ms' ? 'Penghantar' : 'From'}: {msg.sender[language]}</p>
                {showResults && (
                  <p className="text-xs mt-2 italic">{msg.explanation[language]}</p>
                )}
              </Card>
            ))}
          </div>
        </Card>

        <Card 
          className="p-6 min-h-[500px] border-2 border-red-500/50 bg-red-50 dark:bg-red-950/20"
          onDragOver={handleDragOver}
          onDrop={handleDrop('scam')}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-700 dark:text-red-400">
            <XCircle className="w-5 h-5" />
            {language === 'zh' ? '诈骗' : language === 'ms' ? 'Penipuan' : 'Scam'}
            <Badge variant="outline" className="border-red-500">{scamMessages.length}</Badge>
          </h3>
          <div className="space-y-3">
            {scamMessages.map((msg) => (
              <Card
                key={msg.id}
                className={`p-4 bg-background ${showResults ? (!msg.isSafe ? 'border-2 border-green-500' : 'border-2 border-red-500') : ''}`}
              >
                <p className="text-sm mb-2 break-words">{msg.content[language]}</p>
                <p className="text-xs text-muted-foreground mb-2">{language === 'zh' ? '发件人' : language === 'ms' ? 'Penghantar' : 'From'}: {msg.sender[language]}</p>
                {showResults && (
                  <p className="text-xs mt-2 italic">{msg.explanation[language]}</p>
                )}
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Button
          data-testid="button-submit-sort"
          size="lg"
          onClick={handleSubmit}
          disabled={!allSorted || showResults}
        >
          {language === 'zh' ? '提交答案' : language === 'ms' ? 'Hantar Jawapan' : 'Submit Answers'}
        </Button>
        <Button
          data-testid="button-restart-sort"
          variant="outline"
          size="lg"
          onClick={() => window.location.reload()}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {language === 'zh' ? '重新开始' : language === 'ms' ? 'Mulakan Semula' : 'Restart'}
        </Button>
      </div>

      {!allSorted && (
        <p className="text-center text-muted-foreground mt-4">
          {language === 'zh' ? '将所有消息分类后提交' : language === 'ms' ? 'Susun semua mesej sebelum hantar' : 'Sort all messages before submitting'}
        </p>
      )}
    </div>
  );
}
