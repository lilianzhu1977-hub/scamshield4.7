import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { memoryMatchPairs } from "@shared/data/memoryMatchData";
import * as Icons from "lucide-react";
import { Sparkles, RotateCcw } from "lucide-react";

interface CardState {
  id: string;
  content: string;
  type: 'scam' | 'warning';
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
  iconName: string;
}

interface MemoryMatchGameProps {
  onComplete: (score: number, total: number) => void;
}

export default function MemoryMatchGame({ onComplete }: MemoryMatchGameProps) {
  const { language } = useApp();
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [language]);

  const initializeGame = () => {
    const gameCards: CardState[] = [];
    
    memoryMatchPairs.forEach(pair => {
      gameCards.push({
        id: `${pair.id}-scam`,
        content: pair.scamType[language],
        type: 'scam',
        pairId: pair.id,
        isFlipped: false,
        isMatched: false,
        iconName: pair.iconName
      });
      
      gameCards.push({
        id: `${pair.id}-warning`,
        content: pair.warningSigns[language],
        type: 'warning',
        pairId: pair.id,
        isFlipped: false,
        isMatched: false,
        iconName: pair.iconName
      });
    });

    const shuffled = [...gameCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  const handleCardClick = (cardId: string) => {
    if (isChecking) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    
    if (flippedCards.length === 2) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(prevCards =>
      prevCards.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedIds: string[]) => {
    setIsChecking(true);
    
    const [card1, card2] = flippedIds.map(id => cards.find(c => c.id === id)!);
    
    setTimeout(() => {
      if (card1.pairId === card2.pairId) {
        setCards(prevCards =>
          prevCards.map(c =>
            flippedIds.includes(c.id) ? { ...c, isMatched: true } : c
          )
        );
        setMatchedPairs(prev => {
          const newMatched = [...prev, card1.pairId];
          if (newMatched.length === memoryMatchPairs.length) {
            setTimeout(() => {
              onComplete(memoryMatchPairs.length, memoryMatchPairs.length);
            }, 500);
          }
          return newMatched;
        });
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setCards(prevCards =>
          prevCards.map(c =>
            flippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      }
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {language === 'zh' ? '记忆配对游戏' : language === 'ms' ? 'Permainan Padanan Memori' : 'Memory Match Game'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'zh' ? '配对诈骗类型和警告信号' : language === 'ms' ? 'Padankan jenis penipuan dengan tanda amaran' : 'Match scam types with warning signs'}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {language === 'zh' ? `移动次数: ${moves}` : language === 'ms' ? `Pergerakan: ${moves}` : `Moves: ${moves}`}
          </Badge>
          <Badge variant="default" className="text-lg px-4 py-2">
            {language === 'zh' ? `配对: ${matchedPairs.length}/${memoryMatchPairs.length}` : 
             language === 'ms' ? `Pasangan: ${matchedPairs.length}/${memoryMatchPairs.length}` :
             `Pairs: ${matchedPairs.length}/${memoryMatchPairs.length}`}
          </Badge>
          <Button
            data-testid="button-restart-memory"
            variant="outline"
            size="icon"
            onClick={initializeGame}
            title={language === 'zh' ? '重新开始' : language === 'ms' ? 'Mulakan Semula' : 'Restart'}
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((card) => {
          const IconComponent = (Icons as any)[card.iconName] || Icons.HelpCircle;
          return (
            <Card
              key={card.id}
              data-testid={`memory-card-${card.id}`}
              className={`
                relative h-40 cursor-pointer transition-all duration-300
                ${card.isFlipped || card.isMatched ? 'bg-primary text-primary-foreground' : 'bg-muted hover-elevate'}
                ${card.isMatched ? 'opacity-50 ring-2 ring-green-500' : ''}
              `}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                {card.isFlipped || card.isMatched ? (
                  <>
                    <IconComponent className="w-12 h-12 mb-2" />
                    <p className="text-sm font-semibold break-words">{card.content}</p>
                    {card.isMatched && (
                      <Sparkles className="absolute top-2 right-2 w-5 h-5 text-yellow-400 animate-pulse" />
                    )}
                  </>
                ) : (
                  <Icons.HelpCircle className="w-16 h-16" />
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {matchedPairs.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-lg text-primary font-semibold animate-pulse">
            {language === 'zh' ? '太棒了！继续加油！' : 
             language === 'ms' ? 'Hebat! Teruskan!' :
             'Great job! Keep going!'}
          </p>
        </div>
      )}
    </div>
  );
}
