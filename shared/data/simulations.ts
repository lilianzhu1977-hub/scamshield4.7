
import type { Language } from '../schema';

export interface SimulationMessage {
  type: 'sms' | 'call' | 'email' | 'whatsapp' | 'system';
  sender: string;
  content: string;
  timestamp?: string;
  callerId?: string;
  choices?: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

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
  messages: {
    en: SimulationMessage[];
    zh: SimulationMessage[];
    ms: SimulationMessage[];
  };
  successMessage: {
    en: string;
    zh: string;
    ms: string;
  };
  failureMessage: {
    en: string;
    zh: string;
    ms: string;
  };
}

export const simulationScenarios: SimulationScenario[] = [
  {
    id: 'bank_phishing_call',
    title: {
      en: 'Suspicious Bank Call',
      zh: '可疑银行来电',
      ms: 'Panggilan Bank Mencurigakan'
    },
    description: {
      en: 'You receive a phone call claiming to be from your bank',
      zh: '你接到一个声称来自银行的电话',
      ms: 'Anda terima panggilan yang mendakwa dari bank'
    },
    difficulty: 'medium',
    category: 'banking',
    messages: {
      en: [
        {
          type: 'call',
          sender: 'DBS Bank',
          callerId: '+65 6111 1111',
          content: 'Hello, this is Sarah from DBS Security Department. We detected unusual transactions on your account. Have you made a transfer of $5,000 to an overseas account today?',
          choices: [
            {
              text: 'No, I haven\'t made any transfers',
              isCorrect: false,
              feedback: 'The scammer will now create urgency and ask for your details. Real banks don\'t call about transactions like this.'
            },
            {
              text: 'Let me check my account first',
              isCorrect: false,
              feedback: 'They will pressure you not to hang up. Always verify by calling back on the official number.'
            },
            {
              text: 'I\'ll call DBS back on their official number',
              isCorrect: true,
              feedback: 'Excellent! This is the safest approach. Hang up and call 1800-111-1111 directly.'
            },
            {
              text: 'What do I need to do?',
              isCorrect: false,
              feedback: 'Never follow instructions from unexpected callers. They\'ll ask for OTP or banking details.'
            }
          ]
        }
      ],
      zh: [
        {
          type: 'call',
          sender: '星展银行',
          callerId: '+65 6111 1111',
          content: '您好，我是星展银行安全部门的Sarah。我们检测到您的账户有异常交易。请问您今天是否向海外账户转账了5000新元？',
          choices: [
            {
              text: '没有，我没有转账',
              isCorrect: false,
              feedback: '骗子会制造紧迫感并要求你的详细信息。真正的银行不会这样打电话询问交易。'
            },
            {
              text: '让我先查看我的账户',
              isCorrect: false,
              feedback: '他们会施压让你不要挂断。永远通过官方号码回拨验证。'
            },
            {
              text: '我会用官方号码回拨星展银行',
              isCorrect: true,
              feedback: '非常好！这是最安全的做法。挂断电话并直接拨打1800-111-1111。'
            },
            {
              text: '我需要做什么？',
              isCorrect: false,
              feedback: '永远不要听从意外来电者的指示。他们会要求验证码或银行详情。'
            }
          ]
        }
      ],
      ms: [
        {
          type: 'call',
          sender: 'DBS Bank',
          callerId: '+65 6111 1111',
          content: 'Hello, saya Sarah dari Jabatan Keselamatan DBS. Kami kesan transaksi luar biasa pada akaun anda. Adakah anda buat pindahan $5,000 ke akaun luar negara hari ini?',
          choices: [
            {
              text: 'Tidak, saya tak buat pindahan',
              isCorrect: false,
              feedback: 'Penipu akan cipta kepanikan dan minta butiran anda. Bank sebenar tidak hubungi tentang transaksi begini.'
            },
            {
              text: 'Biar saya semak akaun dahulu',
              isCorrect: false,
              feedback: 'Mereka akan paksa anda jangan tutup. Sentiasa sahkan dengan hubungi nombor rasmi.'
            },
            {
              text: 'Saya akan hubungi DBS balik di nombor rasmi',
              isCorrect: true,
              feedback: 'Bagus! Ini pendekatan paling selamat. Tutup dan hubungi 1800-111-1111 terus.'
            },
            {
              text: 'Apa yang perlu saya buat?',
              isCorrect: false,
              feedback: 'Jangan ikut arahan dari pemanggil tak dijangka. Mereka akan minta OTP atau butiran bank.'
            }
          ]
        }
      ]
    },
    successMessage: {
      en: '✅ Well done! You avoided the scam by verifying through official channels.',
      zh: '✅ 做得好！你通过官方渠道验证避免了诈骗。',
      ms: '✅ Bagus! Anda elak penipuan dengan sahkan melalui saluran rasmi.'
    },
    failureMessage: {
      en: '❌ This was a scam! Never trust unexpected calls asking about your account. Always hang up and call back on official numbers.',
      zh: '❌ 这是诈骗！永远不要相信询问账户的意外来电。务必挂断并用官方号码回拨。',
      ms: '❌ Ini penipuan! Jangan percaya panggilan tak dijangka tanya tentang akaun. Tutup dan hubungi semula di nombor rasmi.'
    }
  },
  {
    id: 'whatsapp_family_scam',
    title: {
      en: 'Family WhatsApp Emergency',
      zh: 'WhatsApp家人紧急求助',
      ms: 'Kecemasan Keluarga WhatsApp'
    },
    description: {
      en: 'Someone claiming to be your child messages on WhatsApp',
      zh: '有人在WhatsApp上声称是你的孩子',
      ms: 'Seseorang mendakwa anak anda di WhatsApp'
    },
    difficulty: 'easy',
    category: 'ecommerce',
    messages: {
      en: [
        {
          type: 'whatsapp',
          sender: '+60 12-345-6789',
          content: 'Hi Mum/Dad! 😢 My phone dropped in toilet, this is my new number. Need urgent help - got into accident, hospital asking $3000 deposit before they treat me. Can you transfer to this account? URGENT!!! 🆘',
          timestamp: '10:23 AM',
          choices: [
            {
              text: 'Transfer money immediately',
              isCorrect: false,
              feedback: 'STOP! This is a classic scam. Your real child would have other ways to prove their identity.'
            },
            {
              text: 'Call my child\'s known number',
              isCorrect: true,
              feedback: 'Perfect! Always verify by calling the known number or video calling to confirm identity.'
            },
            {
              text: 'Ask for hospital name and call them',
              isCorrect: true,
              feedback: 'Good thinking! Hospitals don\'t demand payment before emergency treatment in Singapore.'
            },
            {
              text: 'Ask a question only my child would know',
              isCorrect: true,
              feedback: 'Smart! But be careful - scammers might have researched you on social media.'
            }
          ]
        }
      ],
      zh: [
        {
          type: 'whatsapp',
          sender: '+60 12-345-6789',
          content: '爸/妈！😢 我手机掉进厕所了，这是我的新号码。需要紧急帮助 - 出车祸了，医院要求3000新元押金才肯治疗。能转账到这个账户吗？紧急！！！🆘',
          timestamp: '上午10:23',
          choices: [
            {
              text: '立即转账',
              isCorrect: false,
              feedback: '停止！这是典型的诈骗。你真正的孩子会有其他方式证明身份。'
            },
            {
              text: '打电话给我孩子的已知号码',
              isCorrect: true,
              feedback: '完美！永远通过拨打已知号码或视频通话来确认身份。'
            },
            {
              text: '询问医院名称并致电确认',
              isCorrect: true,
              feedback: '好想法！在新加坡，医院不会在急救前要求付款。'
            },
            {
              text: '问一个只有我孩子知道的问题',
              isCorrect: true,
              feedback: '聪明！但要小心 - 骗子可能在社交媒体上研究过你。'
            }
          ]
        }
      ],
      ms: [
        {
          type: 'whatsapp',
          sender: '+60 12-345-6789',
          content: 'Hi Mak/Ayah! 😢 Telefon jatuh dalam tandas, ini nombor baru. Perlukan bantuan segera - kemalangan, hospital minta deposit $3000 sebelum rawat. Boleh pindah ke akaun ini? SEGERA!!! 🆘',
          timestamp: '10:23 PAGI',
          choices: [
            {
              text: 'Pindah wang segera',
              isCorrect: false,
              feedback: 'BERHENTI! Ini penipuan klasik. Anak sebenar ada cara lain buktikan identiti.'
            },
            {
              text: 'Hubungi nombor anak yang dikenali',
              isCorrect: true,
              feedback: 'Sempurna! Sentiasa sahkan dengan hubungi nombor dikenali atau video call.'
            },
            {
              text: 'Tanya nama hospital dan hubungi mereka',
              isCorrect: true,
              feedback: 'Bagus! Hospital di Singapura tak minta bayaran sebelum rawatan kecemasan.'
            },
            {
              text: 'Tanya soalan hanya anak saya tahu',
              isCorrect: true,
              feedback: 'Bijak! Tapi berhati-hati - penipu mungkin selidik anda di media sosial.'
            }
          ]
        }
      ]
    },
    successMessage: {
      en: '✅ Excellent! You verified before sending money. Family emergency scams prey on emotions.',
      zh: '✅ 非常好！你在转账前进行了验证。家庭紧急诈骗利用情感。',
      ms: '✅ Bagus! Anda sahkan sebelum hantar wang. Penipuan kecemasan keluarga manfaatkan emosi.'
    },
    failureMessage: {
      en: '❌ This was a scam! Real family emergencies can be verified. Never rush to transfer money based on messages alone.',
      zh: '❌ 这是诈骗！真正的家庭紧急情况可以验证。永远不要仅凭消息就急于转账。',
      ms: '❌ Ini penipuan! Kecemasan keluarga sebenar boleh disahkan. Jangan tergesa hantar wang berdasarkan mesej sahaja.'
    }
  }
];

export function getRandomScenario(difficulty?: 'easy' | 'medium' | 'hard'): SimulationScenario {
  const scenarios = difficulty 
    ? simulationScenarios.filter(s => s.difficulty === difficulty)
    : simulationScenarios;
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

export function getSimulationsByDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
  return simulationScenarios.filter(s => s.difficulty === difficulty);
}

export function getSimulationsByCategory(category: string) {
  return simulationScenarios.filter(s => s.category === category);
}
