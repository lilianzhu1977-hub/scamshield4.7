interface DragSortMessage {
  id: string;
  content: {
    en: string;
    zh: string;
    ms: string;
  };
  sender: {
    en: string;
    zh: string;
    ms: string;
  };
  isSafe: boolean;
  explanation: {
    en: string;
    zh: string;
    ms: string;
  };
}

export const dragSortMessages: DragSortMessage[] = [
  {
    id: 'msg-1',
    content: {
      en: 'DBS ALERT: Click https://dbs-verify24.com to verify account within 24hrs',
      zh: '星展银行警告：点击 https://dbs-verify24.com 在24小时内验证账户',
      ms: 'AMARAN DBS: Klik https://dbs-verify24.com untuk sahkan akaun dalam 24jam'
    },
    sender: {
      en: '+65 8234 5678',
      zh: '+65 8234 5678',
      ms: '+65 8234 5678'
    },
    isSafe: false,
    explanation: {
      en: 'Phishing scam! Fake URL, creates urgency, threatens suspension',
      zh: '钓鱼诈骗！假网址，制造紧迫感，威胁暂停账户',
      ms: 'Penipuan pancingan! URL palsu, cipta kepentingan, ugut penggantungan'
    }
  },
  {
    id: 'msg-2',
    content: {
      en: 'Your monthly DBS statement for December 2024 is available',
      zh: '您的2024年12月星展银行月结单已准备好',
      ms: 'Penyata bulanan DBS anda untuk Disember 2024 sudah tersedia'
    },
    sender: {
      en: 'statements@dbs.com.sg',
      zh: 'statements@dbs.com.sg',
      ms: 'statements@dbs.com.sg'
    },
    isSafe: true,
    explanation: {
      en: 'Legitimate email from official DBS domain with normal bank communication',
      zh: '来自官方星展银行域名的合法邮件，正常银行通信',
      ms: 'E-mel sah dari domain rasmi DBS dengan komunikasi bank biasa'
    }
  },
  {
    id: 'msg-3',
    content: {
      en: 'Hi, this is Officer Tan from SPF. Your identity used in crime. Transfer funds to safe account now.',
      zh: '你好，我是警察局的陈警官。你的身份被用于犯罪。立即转账到安全账户。',
      ms: 'Hi, saya Pegawai Tan dari SPF. Identiti anda digunakan dalam jenayah. Pindahkan dana ke akaun selamat sekarang.'
    },
    sender: {
      en: 'SPF Investigation',
      zh: 'SPF调查',
      ms: 'Siasatan SPF'
    },
    isSafe: false,
    explanation: {
      en: 'Government impersonation scam! Police never ask for money transfers',
      zh: '政府假冒诈骗！警察绝不会要求转账',
      ms: 'Penipuan penyamaran kerajaan! Polis tidak pernah minta pemindahan wang'
    }
  },
  {
    id: 'msg-4',
    content: {
      en: 'Your appointment with Dr. Lee at SGH is confirmed for 15 Jan 2025, 2pm',
      zh: '您与李医生在新加坡中央医院的预约已确认，2025年1月15日下午2点',
      ms: 'Temujanji anda dengan Dr. Lee di SGH disahkan untuk 15 Jan 2025, 2pm'
    },
    sender: {
      en: 'appointments@sgh.com.sg',
      zh: 'appointments@sgh.com.sg',
      ms: 'appointments@sgh.com.sg'
    },
    isSafe: true,
    explanation: {
      en: 'Legitimate appointment confirmation from official hospital domain',
      zh: '来自官方医院域名的合法预约确认',
      ms: 'Pengesahan temujanji sah dari domain hospital rasmi'
    }
  },
  {
    id: 'msg-5',
    content: {
      en: 'Congrats! You won $50,000! Click here to claim prize: bit.ly/prize2024',
      zh: '恭喜！你赢得了50,000新币！点击这里领取奖品：bit.ly/prize2024',
      ms: 'Tahniah! Anda menang $50,000! Klik sini untuk tuntut hadiah: bit.ly/prize2024'
    },
    sender: {
      en: '+65 9876 1234',
      zh: '+65 9876 1234',
      ms: '+65 9876 1234'
    },
    isSafe: false,
    explanation: {
      en: 'Prize scam! Unsolicited prize claim with suspicious shortened link',
      zh: '奖品诈骗！未经请求的奖品声明和可疑的短链接',
      ms: 'Penipuan hadiah! Tuntutan hadiah tidak diminta dengan pautan pendek mencurigakan'
    }
  },
  {
    id: 'msg-6',
    content: {
      en: 'Your SingPost parcel #SP123456 is ready for collection at Post Office',
      zh: '您的新邮政包裹 #SP123456 已准备好在邮局领取',
      ms: 'Bungkusan SingPost anda #SP123456 sudah sedia untuk diambil di Pejabat Pos'
    },
    sender: {
      en: 'notifications@singpost.com',
      zh: 'notifications@singpost.com',
      ms: 'notifications@singpost.com'
    },
    isSafe: true,
    explanation: {
      en: 'Legitimate notification from official SingPost domain with tracking number',
      zh: '来自官方新邮政域名的合法通知，带有跟踪号码',
      ms: 'Pemberitahuan sah dari domain rasmi SingPost dengan nombor penjejakan'
    }
  },
  {
    id: 'msg-7',
    content: {
      en: 'Urgent: Your Netflix account suspended. Update payment: netflix-update.net/pay',
      zh: '紧急：您的Netflix账户已暂停。更新付款：netflix-update.net/pay',
      ms: 'Segera: Akaun Netflix anda digantung. Kemas kini bayaran: netflix-update.net/pay'
    },
    sender: {
      en: 'support@netflix-alerts.com',
      zh: 'support@netflix-alerts.com',
      ms: 'support@netflix-alerts.com'
    },
    isSafe: false,
    explanation: {
      en: 'Phishing scam! Fake domain, creates urgency, suspicious payment link',
      zh: '钓鱼诈骗！假域名，制造紧迫感，可疑付款链接',
      ms: 'Penipuan pancingan! Domain palsu, cipta kepentingan, pautan bayaran mencurigakan'
    }
  },
  {
    id: 'msg-8',
    content: {
      en: 'Hi sweetheart, I love you so much. But I need $5000 urgently for hospital bills. Please help.',
      zh: '亲爱的，我非常爱你。但我急需5000新币支付医疗费。请帮帮我。',
      ms: 'Hi sayang, saya sangat sayang awak. Tetapi saya perlukan $5000 segera untuk bil hospital. Tolong bantu.'
    },
    sender: {
      en: 'Alex (Met online 2 weeks ago)',
      zh: 'Alex（两周前在线认识）',
      ms: 'Alex (Jumpa dalam talian 2 minggu lepas)'
    },
    isSafe: false,
    explanation: {
      en: 'Romance scam! New online relationship asking for money urgently',
      zh: '爱情诈骗！新的网恋关系紧急要钱',
      ms: 'Penipuan percintaan! Hubungan dalam talian baru minta wang segera'
    }
  },
  {
    id: 'msg-9',
    content: {
      en: 'CPF Board: Your annual CPF statement for 2024 is now available on cpf.gov.sg',
      zh: '公积金局：您的2024年度公积金报表现已在 cpf.gov.sg 上提供',
      ms: 'Lembaga CPF: Penyata tahunan CPF anda untuk 2024 kini tersedia di cpf.gov.sg'
    },
    sender: {
      en: 'info@cpf.gov.sg',
      zh: 'info@cpf.gov.sg',
      ms: 'info@cpf.gov.sg'
    },
    isSafe: true,
    explanation: {
      en: 'Legitimate communication from official CPF government domain',
      zh: '来自官方公积金政府域名的合法通信',
      ms: 'Komunikasi sah dari domain kerajaan CPF rasmi'
    }
  },
  {
    id: 'msg-10',
    content: {
      en: 'Earn $5000/month working from home! No experience needed. Pay $299 training fee to start.',
      zh: '在家工作每月赚5000新币！无需经验。支付299新币培训费即可开始。',
      ms: 'Dapati $5000/bulan bekerja dari rumah! Tiada pengalaman diperlukan. Bayar yuran latihan $299 untuk mula.'
    },
    sender: {
      en: 'JobOpportunities2024',
      zh: 'JobOpportunities2024',
      ms: 'JobOpportunities2024'
    },
    isSafe: false,
    explanation: {
      en: 'Job scam! Unrealistic promises, requires upfront payment for training',
      zh: '工作诈骗！不切实际的承诺，需要预付培训费',
      ms: 'Penipuan pekerjaan! Janji tidak realistik, perlukan bayaran awal untuk latihan'
    }
  }
];
