import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Language } from "@shared/schema";
import type { GameModeId } from "@shared/types/gameTypes";
import { queryClient } from "../lib/queryClient";

interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  perfectScores: number;
  bestScore: number;
  lastPlayed: string;
}

interface ProgressData {
  totalGamesPlayed: number;
  gameStats: Partial<Record<GameModeId, GameStats>>;
  achievements: string[];
  streak: number;
  lastPlayDate: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  narrationEnabled: boolean;
  setNarrationEnabled: (enabled: boolean) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  slowAnimation: boolean;
  setSlowAnimation: (enabled: boolean) => void;
  user: { name: string; initials: string } | null;
  setUser: (user: { name: string; initials: string } | null) => void;
  speak: (text: string) => void;
  progress: ProgressData;
  recordGameCompletion: (gameMode: GameModeId, score: number, total: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PROGRESS_KEY = 'scamshield_progress';

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [slowAnimation, setSlowAnimation] = useState(false);
  const [user, setUser] = useState<{ name: string; initials: string } | null>(null);
  const [progress, setProgress] = useState<ProgressData>({
    totalGamesPlayed: 0,
    gameStats: {},
    achievements: [],
    streak: 0,
    lastPlayDate: ''
  });

  useEffect(() => {
    const stored = sessionStorage.getItem(PROGRESS_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load progress', e);
      }
    }
  }, []);

  const recordGameCompletion = async (gameMode: GameModeId, score: number, total: number) => {
    // Submit quiz attempt to server
    try {
      const username = sessionStorage.getItem('scamshield_username');
      const displayName = sessionStorage.getItem('scamshield_displayName');

      if (username && displayName) {
        await fetch(`/api/quiz/attempt?language=${language}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            displayName,
            questionId: `${gameMode}-${Date.now()}`,
            selectedAnswer: score.toString(),
            isCorrect: score === total,
            timeSpent: 0
          })
        });

        // Invalidate progress and achievements queries to refetch
        queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
        queryClient.invalidateQueries({ queryKey: ['/api/achievements'] });
      }
    } catch (error) {
      console.error('Failed to submit quiz attempt:', error);
    }

    setProgress(prev => {
      const currentStats = prev.gameStats[gameMode] || {
        gamesPlayed: 0,
        totalScore: 0,
        perfectScores: 0,
        bestScore: 0,
        lastPlayed: ''
      };

      const today = new Date().toISOString().split('T')[0];
      const lastPlay = prev.lastPlayDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isConsecutiveDay = lastPlay === yesterday || lastPlay === today;


      const isPerfect = score === total;
      const newStats: GameStats = {
        gamesPlayed: currentStats.gamesPlayed + 1,
        totalScore: currentStats.totalScore + score,
        perfectScores: currentStats.perfectScores + (isPerfect ? 1 : 0),
        bestScore: Math.max(currentStats.bestScore, score),
        lastPlayed: today
      };

      const newProgress: ProgressData = {
        totalGamesPlayed: prev.totalGamesPlayed + 1,
        gameStats: {
          ...prev.gameStats,
          [gameMode]: newStats
        },
        achievements: [...prev.achievements],
        streak: isConsecutiveDay ? prev.streak + 1 : 1,
        lastPlayDate: today
      };

      if (newProgress.totalGamesPlayed === 1 && !newProgress.achievements.includes('first-game')) {
        newProgress.achievements.push('first-game');
      }
      if (newProgress.totalGamesPlayed === 10 && !newProgress.achievements.includes('10-games')) {
        newProgress.achievements.push('10-games');
      }
      if (isPerfect && !newProgress.achievements.includes('perfect-score')) {
        newProgress.achievements.push('perfect-score');
      }
      if (newProgress.streak >= 3 && !newProgress.achievements.includes('streak-3')) {
        newProgress.achievements.push('streak-3');
      }

      sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (slowAnimation) {
      document.documentElement.classList.add('slow-animation');
    } else {
      document.documentElement.classList.remove('slow-animation');
    }
  }, [slowAnimation]);

  const speak = (text: string) => {
    if (!narrationEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const languageMap: Record<Language, string> = {
      en: 'en',
      zh: 'zh-CN',
      ms: 'ms'
    };

    const preferredLang = languageMap[language];
    const voice = voices.find(v => v.lang.startsWith(preferredLang));

    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = preferredLang;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      narrationEnabled,
      setNarrationEnabled,
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
      slowAnimation,
      setSlowAnimation,
      user,
      setUser,
      speak,
      progress,
      recordGameCompletion
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}