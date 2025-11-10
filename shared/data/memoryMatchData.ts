interface MemoryMatchPair {
  id: string;
  scamType: {
    en: string;
    zh: string;
    ms: string;
  };
  warningSigns: {
    en: string;
    zh: string;
    ms: string;
  };
  iconName: string;
}

export const memoryMatchPairs: MemoryMatchPair[] = [
  {
    id: 'pair-1',
    scamType: {
      en: 'Government Impersonation',
      zh: '政府假冒',
      ms: 'Penyamaran Kerajaan'
    },
    warningSigns: {
      en: 'Demands money over phone',
      zh: '通过电话要求转账',
      ms: 'Minta wang melalui telefon'
    },
    iconName: 'Landmark'
  },
  {
    id: 'pair-2',
    scamType: {
      en: 'Phishing SMS',
      zh: '钓鱼短信',
      ms: 'SMS Pancingan'
    },
    warningSigns: {
      en: 'Suspicious links in messages',
      zh: '短信中的可疑链接',
      ms: 'Pautan mencurigakan dalam mesej'
    },
    iconName: 'Smartphone'
  },
  {
    id: 'pair-3',
    scamType: {
      en: 'Investment Scam',
      zh: '投资诈骗',
      ms: 'Penipuan Pelaburan'
    },
    warningSigns: {
      en: 'Promise of high returns',
      zh: '承诺高回报',
      ms: 'Janji pulangan tinggi'
    },
    iconName: 'DollarSign'
  },
  {
    id: 'pair-4',
    scamType: {
      en: 'Romance Scam',
      zh: '爱情诈骗',
      ms: 'Penipuan Percintaan'
    },
    warningSigns: {
      en: 'Online lover asks for money',
      zh: '网恋对象要钱',
      ms: 'Kekasih dalam talian minta wang'
    },
    iconName: 'HeartCrack'
  },
  {
    id: 'pair-5',
    scamType: {
      en: 'Tech Support Scam',
      zh: '技术支持诈骗',
      ms: 'Penipuan Sokongan Teknikal'
    },
    warningSigns: {
      en: 'Fake virus warnings',
      zh: '假病毒警告',
      ms: 'Amaran virus palsu'
    },
    iconName: 'Monitor'
  },
  {
    id: 'pair-6',
    scamType: {
      en: 'Delivery Scam',
      zh: '快递诈骗',
      ms: 'Penipuan Penghantaran'
    },
    warningSigns: {
      en: 'Fake package notifications',
      zh: '假包裹通知',
      ms: 'Notifikasi pakej palsu'
    },
    iconName: 'Package'
  },
  {
    id: 'pair-7',
    scamType: {
      en: 'Job Scam',
      zh: '工作诈骗',
      ms: 'Penipuan Pekerjaan'
    },
    warningSigns: {
      en: 'Upfront payment required',
      zh: '需要预付款',
      ms: 'Bayaran awal diperlukan'
    },
    iconName: 'Briefcase'
  },
  {
    id: 'pair-8',
    scamType: {
      en: 'Banking Phishing',
      zh: '银行钓鱼',
      ms: 'Pancingan Perbankan'
    },
    warningSigns: {
      en: 'Urgent account verification',
      zh: '紧急账户验证',
      ms: 'Pengesahan akaun segera'
    },
    iconName: 'Building2'
  }
];
