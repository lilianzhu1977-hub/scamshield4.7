import { Language, TranslatedText } from "@shared/schema";

export const translations = {
  appName: {
    en: "ScamShield+",
    zh: "守骗者",
    ms: "ScamShield+"
  },
  languageSelect: {
    title: {
      en: "Choose Your Language",
      zh: "选择您的语言",
      ms: "Pilih Bahasa Anda"
    },
    english: {
      en: "English",
      zh: "English",
      ms: "English"
    },
    chinese: {
      en: "中文",
      zh: "中文",
      ms: "中文"
    },
    malay: {
      en: "Bahasa Melayu",
      zh: "Bahasa Melayu",
      ms: "Bahasa Melayu"
    }
  },
  home: {
    title: {
      en: "Stay Safe from Scams",
      zh: "远离诈骗,保护自己",
      ms: "Lindungi Diri dari Penipuan"
    },
    subtitle: {
      en: "Learn, recognize, and report scams",
      zh: "学习、识别并举报诈骗",
      ms: "Belajar, kenali, dan laporkan penipuan"
    }
  },
  modules: {
    learn: {
      en: "Learn",
      zh: "学习",
      ms: "Belajar"
    },
    videos: {
      en: "Videos",
      zh: "视频",
      ms: "Video"
    },
    simulation: {
      en: "Simulation",
      zh: "模拟体验",
      ms: "Simulasi"
    },
    quiz: {
      en: "Quiz",
      zh: "测验",
      ms: "Kuiz"
    },
    progress: {
      en: "My Progress",
      zh: "我的进度",
      ms: "Kemajuan Saya"
    },
    community: {
      en: "Community",
      zh: "社区",
      ms: "Komuniti"
    },
    helplines: {
      en: "Help Lines",
      zh: "求助热线",
      ms: "Talian Bantuan"
    },
    tips: {
      en: "Safety Tips",
      zh: "安全提示",
      ms: "Petua Keselamatan"
    },
    news: {
      en: "Scam News",
      zh: "诈骗新闻",
      ms: "Berita Penipuan"
    }
  },
  accessibility: {
    narration: {
      en: "Narration",
      zh: "语音播报",
      ms: "Naration"
    },
    fontSize: {
      en: "Font Size",
      zh: "字体大小",
      ms: "Saiz Fon"
    },
    contrast: {
      en: "High Contrast",
      zh: "高对比度",
      ms: "Kontras Tinggi"
    },
    slowAnimation: {
      en: "Slow Motion",
      zh: "慢速动画",
      ms: "Animasi Perlahan"
    }
  },
  common: {
    playAudio: {
      en: "Play Voice",
      zh: "播放语音",
      ms: "Main Suara"
    },
    learnMore: {
      en: "Learn More",
      zh: "了解更多",
      ms: "Ketahui Lebih Lanjut"
    },
    back: {
      en: "Back",
      zh: "返回",
      ms: "Kembali"
    },
    next: {
      en: "Next",
      zh: "下一步",
      ms: "Seterusnya"
    },
    previous: {
      en: "Previous",
      zh: "上一步",
      ms: "Sebelumnya"
    },
    share: {
      en: "Share",
      zh: "分享",
      ms: "Kongsi"
    }
  }
} as const;

export function getText(text: TranslatedText, language: Language): string {
  return text[language];
}
