export type GameModeId = 'traditional' | 'spot-scam' | 'memory-match' | 'drag-sort' | 'what-would-you-do';

export interface GameProgress {
  totalSteps: number;
  completedSteps: number;
  currentStreak: number;
  achievementsUnlocked: string[];
}

export interface GameSessionState {
  modeId: GameModeId | null;
  questionIndices?: number[];
  currentQuestionIndex: number;
  score: number;
  answeredCount: number;
  language: string;
  // Memory Match specific
  flippedCards?: string[];
  matchedPairs?: string[];
  moves?: number;
  // Drag & Sort specific
  sortedItems?: Record<string, 'safe' | 'scam'>;
  // What Would You Do specific
  decisionPath?: string[];
}

export interface GameModeConfig {
  id: GameModeId;
  title: {
    en: string;
    zh: string;
    ms: string;
  };
  description: {
    en: string;
    zh: string;
    ms: string;
  };
  iconName: string;
  badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline';
  totalQuestions: number;
}

export type CelebrationEventType = 'correct' | 'complete' | 'perfect-score' | 'streak';
