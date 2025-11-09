import type { AchievementDefinition, TranslatedText } from '../schema';

export const achievementDefinitions: AchievementDefinition[] = [
  {
    id: 'first_quiz',
    title: {
      en: 'First Steps',
      zh: '第一步',
      ms: 'Langkah Pertama'
    },
    description: {
      en: 'Completed your first quiz',
      zh: '完成第一次测验',
      ms: 'Selesaikan kuiz pertama'
    },
    icon: '🎯',
    requirement: {
      type: 'quiz',
      count: 1
    }
  },
  {
    id: 'quiz_beginner',
    title: {
      en: 'Quiz Beginner',
      zh: '测验新手',
      ms: 'Pemula Kuiz'
    },
    description: {
      en: 'Completed 5 quizzes',
      zh: '完成5次测验',
      ms: 'Selesaikan 5 kuiz'
    },
    icon: '📚',
    requirement: {
      type: 'quiz',
      count: 5
    }
  },
  {
    id: 'quiz_master',
    title: {
      en: 'Quiz Master',
      zh: '测验大师',
      ms: 'Guru Kuiz'
    },
    description: {
      en: 'Completed 20 quizzes',
      zh: '完成20次测验',
      ms: 'Selesaikan 20 kuiz'
    },
    icon: '🏆',
    requirement: {
      type: 'quiz',
      count: 20
    }
  },
  {
    id: 'simulation_expert',
    title: {
      en: 'Simulation Expert',
      zh: '模拟专家',
      ms: 'Pakar Simulasi'
    },
    description: {
      en: 'Completed 3 simulations',
      zh: '完成3次模拟',
      ms: 'Selesaikan 3 simulasi'
    },
    icon: '🎯',
    requirement: {
      type: 'simulation',
      count: 3
    }
  },
  {
    id: 'scam_dodger',
    title: {
      en: 'Scam Dodger',
      zh: '躲避诈骗高手',
      ms: 'Pengelak Penipuan'
    },
    description: {
      en: 'Successfully avoided a scam in simulation',
      zh: '在模拟中成功避免诈骗',
      ms: 'Berjaya elakkan penipuan dalam simulasi'
    },
    icon: '🛡️',
    requirement: {
      type: 'simulation',
      count: 1
    }
  },
  {
    id: 'perfect_score',
    title: {
      en: 'Perfect Score',
      zh: '满分',
      ms: 'Skor Sempurna'
    },
    description: {
      en: 'Reached 500 points',
      zh: '达到500分',
      ms: 'Capai 500 mata'
    },
    icon: '⭐',
    requirement: {
      type: 'score',
      threshold: 500
    }
  },
  {
    id: 'community_hero',
    title: {
      en: 'Community Hero',
      zh: '社区英雄',
      ms: 'Wira Komuniti'
    },
    description: {
      en: 'Reported a scam to help protect others',
      zh: '报告诈骗以帮助保护他人',
      ms: 'Laporkan penipuan untuk lindungi orang lain'
    },
    icon: '🦸',
    requirement: {
      type: 'report',
      count: 1
    }
  },
  {
    id: 'video_enthusiast',
    title: {
      en: 'Video Enthusiast',
      zh: '视频爱好者',
      ms: 'Peminat Video'
    },
    description: {
      en: 'Watched 10 educational videos',
      zh: '观看10个教育视频',
      ms: 'Tonton 10 video pendidikan'
    },
    icon: '📺',
    requirement: {
      type: 'video',
      count: 10
    }
  },
  {
    id: 'level_10',
    title: {
      en: 'Scam Shield Pro',
      zh: '防诈骗专家',
      ms: 'Pro Perisai Penipuan'
    },
    description: {
      en: 'Reached level 10',
      zh: '达到10级',
      ms: 'Capai tahap 10'
    },
    icon: '🏅',
    requirement: {
      type: 'score',
      threshold: 1000
    }
  },
  {
    id: 'guardian',
    title: {
      en: 'Digital Guardian',
      zh: '数字守护者',
      ms: 'Penjaga Digital'
    },
    description: {
      en: 'Completed all simulation scenarios',
      zh: '完成所有模拟场景',
      ms: 'Selesaikan semua senario simulasi'
    },
    icon: '🛡️',
    requirement: {
      type: 'simulation',
      count: 10
    }
  }
];
