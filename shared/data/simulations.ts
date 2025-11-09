import type { Language } from '../schema';

export interface SimulationScenario {
  id: string;
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
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'banking' | 'government' | 'romance' | 'investment' | 'ecommerce' | 'tech';
}

export const simulationScenarios: SimulationScenario[] = [
  {
    id: 'bank_phishing',
    title: {
      en: 'Bank Phishing SMS',
      zh: '银行钓鱼短信',
      ms: 'SMS Pancingan Bank'
    },
    description: {
      en: 'Deal with a fake bank message',
      zh: '处理假银行信息',
      ms: 'Uruskan mesej bank palsu'
    },
    difficulty: 'easy',
    category: 'banking'
  },
  {
    id: 'police_impersonation',
    title: {
      en: 'Police Impersonation Call',
      zh: '假警察电话',
      ms: 'Panggilan Penyamaran Polis'
    },
    description: {
      en: 'Someone claims to be from Singapore Police Force',
      zh: '有人声称来自新加坡警察部队',
      ms: 'Seseorang mendakwa dari Polis Singapura'
    },
    difficulty: 'medium',
    category: 'government'
  },
  {
    id: 'family_emergency',
    title: {
      en: 'Family Emergency Scam',
      zh: '家人紧急诈骗',
      ms: 'Penipuan Kecemasan Keluarga'
    },
    description: {
      en: 'Your "child" needs money urgently',
      zh: '你的"孩子"急需用钱',
      ms: '"Anak" anda perlukan wang segera'
    },
    difficulty: 'medium',
    category: 'ecommerce'
  },
  {
    id: 'investment_scheme',
    title: {
      en: 'Investment Opportunity',
      zh: '投资机会',
      ms: 'Peluang Pelaburan'
    },
    description: {
      en: 'A "guaranteed profit" investment offer',
      zh: '"保证获利"的投资机会',
      ms: 'Tawaran pelaburan "untung terjamin"'
    },
    difficulty: 'hard',
    category: 'investment'
  },
  {
    id: 'package_delivery',
    title: {
      en: 'Fake Package Notification',
      zh: '假包裹通知',
      ms: 'Pemberitahuan Pakej Palsu'
    },
    description: {
      en: 'SMS about an undelivered package',
      zh: '关于未送达包裹的短信',
      ms: 'SMS tentang pakej yang tidak dihantar'
    },
    difficulty: 'easy',
    category: 'ecommerce'
  },
  {
    id: 'romance_scam',
    title: {
      en: 'Online Romance',
      zh: '网络浪漫',
      ms: 'Percintaan Dalam Talian'
    },
    description: {
      en: 'An online friend asks for money',
      zh: '网友要求转账',
      ms: 'Kenalan dalam talian minta wang'
    },
    difficulty: 'hard',
    category: 'romance'
  },
  {
    id: 'remote_access',
    title: {
      en: 'Remote Access Request',
      zh: '远程访问请求',
      ms: 'Permintaan Capaian Jauh'
    },
    description: {
      en: 'Tech support wants to access your device',
      zh: '技术支持想访问您的设备',
      ms: 'Sokongan teknikal mahu akses peranti anda'
    },
    difficulty: 'medium',
    category: 'tech'
  },
  {
    id: 'tax_authority',
    title: {
      en: 'IRAS Tax Scam',
      zh: 'IRAS税务诈骗',
      ms: 'Penipuan Cukai IRAS'
    },
    description: {
      en: 'Fake call from tax authority',
      zh: '来自税务局的假电话',
      ms: 'Panggilan palsu dari pihak cukai'
    },
    difficulty: 'medium',
    category: 'government'
  },
  {
    id: 'crypto_investment',
    title: {
      en: 'Cryptocurrency Scam',
      zh: '加密货币诈骗',
      ms: 'Penipuan Mata Wang Kripto'
    },
    description: {
      en: 'Join an exclusive crypto investment group',
      zh: '加入独家加密货币投资群',
      ms: 'Sertai kumpulan pelaburan kripto eksklusif'
    },
    difficulty: 'hard',
    category: 'investment'
  },
  {
    id: 'social_media_phishing',
    title: {
      en: 'Social Media Account Compromise',
      zh: '社交媒体账户被盗',
      ms: 'Akaun Media Sosial Terjejas'
    },
    description: {
      en: 'Suspicious login attempt notification',
      zh: '可疑登录尝试通知',
      ms: 'Pemberitahuan percubaan log masuk mencurigakan'
    },
    difficulty: 'medium',
    category: 'tech'
  }
];

export function getSimulationsByDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
  return simulationScenarios.filter(s => s.difficulty === difficulty);
}

export function getSimulationsByCategory(category: string) {
  return simulationScenarios.filter(s => s.category === category);
}
