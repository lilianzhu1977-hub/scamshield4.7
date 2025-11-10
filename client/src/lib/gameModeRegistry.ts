import type { GameModeConfig, GameModeId } from '@shared/types/gameTypes';

export const gameModeRegistry: Record<GameModeId, GameModeConfig> = {
  traditional: {
    id: 'traditional',
    title: {
      en: 'Traditional Quiz',
      zh: '传统测验',
      ms: 'Kuiz Tradisional'
    },
    description: {
      en: 'Multiple choice questions to test your knowledge',
      zh: '多项选择题测试你的知识',
      ms: 'Soalan pelbagai pilihan ujian pengetahuan anda'
    },
    iconName: 'Trophy',
    badgeVariant: 'secondary',
    totalQuestions: 0
  },
  'spot-scam': {
    id: 'spot-scam',
    title: {
      en: 'Spot the Scam',
      zh: '发现诈骗',
      ms: 'Kesan Penipuan'
    },
    description: {
      en: 'Analyze real scenarios and identify scams',
      zh: '分析真实场景，识别诈骗',
      ms: 'Analisis senario sebenar, kenal pasti penipuan'
    },
    iconName: 'AlertTriangle',
    badgeVariant: 'destructive',
    totalQuestions: 0
  },
  'memory-match': {
    id: 'memory-match',
    title: {
      en: 'Memory Match',
      zh: '记忆配对',
      ms: 'Padanan Memori'
    },
    description: {
      en: 'Match scam types with their warning signs',
      zh: '将诈骗类型与警告信号配对',
      ms: 'Padankan jenis penipuan dengan tanda amaran'
    },
    iconName: 'Brain',
    badgeVariant: 'default',
    totalQuestions: 8
  },
  'drag-sort': {
    id: 'drag-sort',
    title: {
      en: 'Sort Messages',
      zh: '分类信息',
      ms: 'Susun Mesej'
    },
    description: {
      en: 'Drag messages to Safe or Scam categories',
      zh: '将消息拖到安全或诈骗类别',
      ms: 'Seret mesej ke kategori Selamat atau Penipuan'
    },
    iconName: 'ArrowLeftRight',
    badgeVariant: 'outline',
    totalQuestions: 10
  },
  'what-would-you-do': {
    id: 'what-would-you-do',
    title: {
      en: 'What Would You Do?',
      zh: '你会怎么做？',
      ms: 'Apa Yang Anda Akan Lakukan?'
    },
    description: {
      en: 'Make decisions in scam scenarios',
      zh: '在诈骗场景中做决定',
      ms: 'Buat keputusan dalam senario penipuan'
    },
    iconName: 'MessageCircleQuestion',
    badgeVariant: 'secondary',
    totalQuestions: 6
  }
};

export function getGameMode(id: GameModeId): GameModeConfig {
  return gameModeRegistry[id];
}

export function getAllGameModes(): GameModeConfig[] {
  return Object.values(gameModeRegistry);
}
