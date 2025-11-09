import { TranslatedText } from '../schema';

export const scamTypes = [
  {
    id: 'government',
    title: {
      en: "Government Impersonation",
      zh: "政府假冒诈骗",
      ms: "Penipuan Penyamaran Kerajaan"
    },
    description: {
      en: "Scammers pretend to be from government agencies",
      zh: "诈骗者假装是政府机构人员",
      ms: "Penipu berpura-pura dari agensi kerajaan"
    },
    story: {
      en: "Mrs. Tan received a call claiming to be from Singapore Police. They said her identity was used in a crime and asked her to transfer money to a 'safe account'. This is a common scam - government agencies never ask for money over the phone.",
      zh: "陈太太接到一个声称来自新加坡警察的电话。他们说她的身份被用于犯罪，要求她将钱转到一个'安全账户'。这是一个常见的诈骗 - 政府机构绝不会通过电话要求转账。",
      ms: "Puan Tan menerima panggilan yang mendakwa dari Polis Singapura. Mereka mengatakan identitinya digunakan dalam jenayah dan meminta dia memindahkan wang ke 'akaun selamat'. Ini adalah penipuan biasa - agensi kerajaan tidak akan meminta wang melalui telefon."
    },
    icon: "🏛️"
  },
  {
    id: 'family',
    title: {
      en: "Fake Friend/Family Call",
      zh: "假冒亲友诈骗",
      ms: "Panggilan Rakan/Keluarga Palsu"
    },
    description: {
      en: "Scammers pretend to be your loved ones needing urgent help",
      zh: "诈骗者假装是你的亲友需要紧急帮助",
      ms: "Penipu berpura-pura menjadi rakan/keluarga yang memerlukan bantuan kecemasan"
    },
    story: {
      en: "Mr. Lee received a message from what appeared to be his son's number, saying he had an accident and needed money urgently. Mr. Lee almost fell for it but called his son directly and found it was a scam. Always contact your family members directly to verify.",
      zh: "李先生收到一条消息，显示是他儿子的号码，说他出了车祸需要紧急汇款。李先生差点上当，但他先打了儿子的电话确认，发现这是诈骗。永远要直接联系你的家人确认。",
      ms: "Encik Lee menerima mesej dari nombor yang kelihatan seperti anaknya, mengatakan dia mengalami kemalangan dan perlukan wang dengan segera. Encik Lee hampir tertipu tetapi dia menghubungi anaknya terus dan mendapati ia penipuan. Sentiasa hubungi keluarga anda secara langsung untuk pengesahan."
    },
    icon: "👨‍👩‍👧"
  },
  {
    id: 'ecommerce',
    title: {
      en: "E-commerce/Delivery Scam",
      zh: "电商/快递诈骗",
      ms: "Penipuan E-dagang/Penghantaran"
    },
    description: {
      en: "Fake package notifications and refund requests",
      zh: "虚假的包裹通知和退款要求",
      ms: "Pemberitahuan pakej palsu dan permintaan bayaran balik"
    },
    story: {
      en: "Mrs. Wang received an SMS saying her package couldn't be delivered and needed to click a link to pay extra fees. The link looked real but was actually a phishing website. Never click suspicious links in SMS, go directly to official websites or apps.",
      zh: "王太太收到短信说她的包裹无法投递，需要点击链接支付额外费用。链接看起来很真实，但实际上是个钓鱼网站。永远不要点击短信中的可疑链接，直接访问官方网站或应用。",
      ms: "Puan Wang menerima SMS bahawa paketnya tidak dapat dihantar dan perlu klik pautan untuk bayar yuran tambahan. Pautan kelihatan sahih tetapi sebenarnya laman web pancingan. Jangan klik pautan mencurigakan dalam SMS, lawati laman web rasmi atau aplikasi terus."
    },
    icon: "📦"
  },
  {
    id: 'romance',
    title: {
      en: "Love/Romance Scam",
      zh: "爱情/浪漫诈骗",
      ms: "Penipuan Cinta/Romantik"
    },
    description: {
      en: "Online relationships leading to money requests",
      zh: "网上恋爱后骗取金钱",
      ms: "Hubungan dalam talian yang membawa kepada permintaan wang"
    },
    story: {
      en: "Ms. Zhang met an 'overseas businessman' on social media. After months of chatting, he said he had an emergency and needed money. This is a classic romance scam. Never send money to online friends you've never met in person.",
      zh: "张女士在社交媒体上认识了一个'海外商人'。几个月后，他说遇到紧急情况需要钱。这是典型的浪漫诈骗。永远不要给从未见过面的网友汇款。",
      ms: "Cik Zhang bertemu 'ahli perniagaan luar negara' di media sosial. Selepas beberapa bulan, dia mengatakan menghadapi kecemasan dan perlukan wang. Ini adalah penipuan romantik biasa. Jangan sekali-kali hantar wang kepada kenalan dalam talian yang tidak pernah ditemui."
    },
    icon: "💕"
  },
  {
    id: 'investment',
    title: {
      en: "Investment/Get-Rich-Quick Scam",
      zh: "投资/快速致富诈骗",
      ms: "Penipuan Pelaburan/Cepat Kaya"
    },
    description: {
      en: "Fake investments promising high returns",
      zh: "承诺高回报的虚假投资",
      ms: "Pelaburan palsu yang menjanjikan pulangan tinggi"
    },
    story: {
      en: "Mr. Wong was invited to join a 'guaranteed profit' cryptocurrency investment group. At first he got small returns, but when he invested a large sum, the website disappeared. If it sounds too good to be true, it probably is a scam.",
      zh: "黄先生被邀请加入一个'保证获利'的加密货币投资群。起初他获得了小额回报，但当他投入大笔资金后，网站就消失了。如果听起来好到不真实，那很可能就是诈骗。",
      ms: "Encik Wong dijemput menyertai kumpulan pelaburan mata wang kripto 'untung terjamin'. Pada mulanya dia dapat pulangan kecil, tetapi apabila dia laburkan jumlah besar, laman web hilang. Jika kedengaran terlalu baik untuk menjadi kenyataan, ia mungkin penipuan."
    },
    icon: "💰"
  }
];

export const quizQuestions = [
  {
    id: 'q1',
    language: 'en',
    question: {
      en: "A caller claims to be from the police and asks you to transfer money to a 'safe account'. What should you do?",
      zh: "接到声称是警察的电话，要求你转账到'安全账户'，你应该怎么做？",
      ms: "Pemanggil mendakwa dari polis dan minta anda pindahkan wang ke 'akaun selamat'. Apa yang perlu anda lakukan?"
    },
    options: [
      {
        en: "Give them your bank details",
        zh: "提供你的银行详情",
        ms: "Berikan butiran bank anda"
      },
      {
        en: "Transfer the money immediately",
        zh: "立即转账",
        ms: "Pindahkan wang dengan segera"
      },
      {
        en: "Ask them to call back later",
        zh: "请他们稍后再打",
        ms: "Minta mereka hubungi semula nanti"
      },
      {
        en: "Hang up and call the police using their official number",
        zh: "挂断电话并用官方号码回拨警察局",
        ms: "Tutup telefon dan hubungi polis menggunakan nombor rasmi"
      }
    ],
    correctIndex: 3,
    explanation: {
      en: "Never transfer money or give personal details over the phone, even if the caller claims to be from the police. Always hang up and call back using official numbers.",
      zh: "绝不要通过电话转账或提供个人信息，即使对方声称是警察。应该挂断电话并用官方号码回拨。",
      ms: "Jangan sekali-kali pindahkan wang atau berikan maklumat peribadi melalui telefon, walaupun pemanggil mendakwa dari polis. Tutup telefon dan hubungi semula menggunakan nombor rasmi."
    }
  },
  {
    id: 'q2',
    language: 'en',
    question: {
      en: "You receive an SMS saying your package needs extra fees with a link. What should you do?",
      zh: "你收到一条短信说你的包裹需要额外费用，并附有一个链接。你应该？",
      ms: "Anda terima SMS bahawa pakej anda perlukan bayaran tambahan dengan pautan. Apa yang perlu anda lakukan?"
    },
    options: [
      {
        en: "Click the link to pay immediately",
        zh: "点击链接立即付款",
        ms: "Klik pautan untuk bayar segera"
      },
      {
        en: "Ignore the SMS",
        zh: "忽略短信",
        ms: "Abaikan SMS"
      },
      {
        en: "Check through the official app or website",
        zh: "通过官方应用或网站查询",
        ms: "Semak melalui aplikasi atau laman web rasmi"
      },
      {
        en: "Reply to the SMS asking for details",
        zh: "回复短信询问详情",
        ms: "Balas SMS untuk tanya butiran"
      }
    ],
    correctIndex: 2,
    explanation: {
      en: "Don't click suspicious links in SMS. Go directly to official websites or apps to verify information.",
      zh: "不要点击短信中的可疑链接。应该直接访问官方网站或应用来验证信息。",
      ms: "Jangan klik pautan mencurigakan dalam SMS. Lawati laman web atau aplikasi rasmi terus untuk sahkan maklumat."
    }
  },
  {
    id: 'q3',
    language: 'en',
    question: {
      en: "An online 'friend' asks to borrow money for an emergency, you've never met this person. What should you do?",
      zh: "网上认识的'朋友'要求你借钱应急，你从未见过这个人。你应该？",
      ms: "'Kawan' dalam talian minta anda pinjam wang untuk kecemasan, anda tidak pernah jumpa orang ini. Apa yang perlu anda lakukan?"
    },
    options: [
      {
        en: "Refuse and consider it might be a scam",
        zh: "拒绝并考虑这可能是诈骗",
        ms: "Tolak dan anggap ia mungkin penipuan"
      },
      {
        en: "Send money immediately to help",
        zh: "立即汇款帮助朋友",
        ms: "Hantar wang segera untuk bantu kawan"
      },
      {
        en: "Send a small amount first to test",
        zh: "先借一小笔钱试试",
        ms: "Pinjam jumlah kecil dahulu untuk cuba"
      },
      {
        en: "Ask them to provide ID proof",
        zh: "要求他们提供身份证明",
        ms: "Minta mereka tunjuk pengenalan diri"
      }
    ],
    correctIndex: 0,
    explanation: {
      en: "Never send money to online friends you've never met in person. This is a classic romance or friendship scam.",
      zh: "永远不要给从未见过面的网友汇款。这是典型的浪漫诈骗或友情诈骗。",
      ms: "Jangan sekali-kali hantar wang kepada kenalan dalam talian yang tidak pernah ditemui. Ini adalah penipuan romantik atau persahabatan biasa."
    }
  },
  {
    id: 'q4',
    language: 'en',
    question: {
      en: "Someone calls claiming your computer has a virus and offers to fix it remotely. What should you do?",
      zh: "有人打电话说你的电脑有病毒，提出远程修复。你应该？",
      ms: "Seseorang menelefon mendakwa komputer anda ada virus dan tawarkan untuk baiki dari jauh. Apa yang perlu anda lakukan?"
    },
    options: [
      {
        en: "Download the software they recommend",
        zh: "下载他们推荐的软件",
        ms: "Muat turun perisian yang mereka cadangkan"
      },
      {
        en: "Pay them to fix the virus",
        zh: "付钱让他们修复病毒",
        ms: "Bayar mereka untuk baiki virus"
      },
      {
        en: "Hang up immediately - it's a tech support scam",
        zh: "立即挂断 - 这是技术支持诈骗",
        ms: "Tutup telefon segera - ini penipuan sokongan teknikal"
      },
      {
        en: "Let them access your computer",
        zh: "让他们访问你的电脑",
        ms: "Biarkan mereka akses komputer anda"
      }
    ],
    correctIndex: 2,
    explanation: {
      en: "This is a classic tech support scam. Real tech companies don't call you unsolicited. Never give remote access to strangers.",
      zh: "这是典型的技术支持诈骗。真正的科技公司不会主动打电话给你。永远不要让陌生人远程访问。",
      ms: "Ini adalah penipuan sokongan teknikal klasik. Syarikat teknologi sebenar tidak akan hubungi anda tanpa diminta. Jangan beri akses jauh kepada orang asing."
    }
  },
  {
    id: 'q5',
    language: 'en',
    question: {
      en: "You receive a job offer with very high pay but they ask for payment upfront for 'training materials'. Is this legitimate?",
      zh: "你收到一份薪水很高的工作机会，但他们要求先付款购买'培训材料'。这合法吗？",
      ms: "Anda terima tawaran kerja dengan gaji sangat tinggi tetapi mereka minta bayaran awal untuk 'bahan latihan'. Adakah ini sah?"
    },
    options: [
      {
        en: "Yes, it's normal to pay for training",
        zh: "是的，为培训付费很正常",
        ms: "Ya, biasa untuk bayar latihan"
      },
      {
        en: "No, this is likely a job scam",
        zh: "不，这很可能是工作诈骗",
        ms: "Tidak, ini kemungkinan penipuan pekerjaan"
      },
      {
        en: "Pay only half first to test them",
        zh: "先付一半来测试他们",
        ms: "Bayar separuh dahulu untuk uji mereka"
      },
      {
        en: "Ask them to deduct it from your first salary",
        zh: "要求从第一个月工资扣除",
        ms: "Minta mereka tolak dari gaji pertama"
      }
    ],
    correctIndex: 1,
    explanation: {
      en: "Legitimate employers never ask for payment upfront. This is a common employment scam targeting job seekers.",
      zh: "合法的雇主从不要求预付款。这是针对求职者的常见就业诈骗。",
      ms: "Majikan sah tidak akan minta bayaran awal. Ini adalah penipuan pekerjaan biasa yang menyasarkan pencari kerja."
    }
  },
  {
    id: 'q6',
    language: 'en',
    question: {
      en: "A bank calls asking you to verify your account by providing your OTP. What should you do?",
      zh: "银行打电话要求你提供验证码来验证账户。你应该？",
      ms: "Bank menelefon minta anda sahkan akaun dengan berikan OTP. Apa yang perlu anda lakukan?"
    },
    options: [
      {
        en: "Ask for their employee ID first",
        zh: "先询问他们的员工编号",
        ms: "Tanya ID pekerja mereka dahulu"
      },
      {
        en: "Provide the OTP immediately",
        zh: "立即提供验证码",
        ms: "Berikan OTP segera"
      },
      {
        en: "Read only the first 3 digits",
        zh: "只读前3位数字",
        ms: "Baca hanya 3 digit pertama"
      },
      {
        en: "Hang up - banks never ask for OTPs over the phone",
        zh: "挂断电话 - 银行绝不会通过电话要求验证码",
        ms: "Tutup telefon - bank tidak akan minta OTP melalui telefon"
      }
    ],
    correctIndex: 3,
    explanation: {
      en: "Banks and legitimate institutions NEVER ask for your OTP. Anyone asking for it is trying to scam you. OTPs are for your eyes only.",
      zh: "银行和合法机构绝不会要求您的验证码。任何索要验证码的人都在试图诈骗你。验证码仅供你自己使用。",
      ms: "Bank dan institusi sah TIDAK AKAN minta OTP anda. Sesiapa yang meminta sedang cuba menipu anda. OTP adalah untuk mata anda sahaja."
    }
  },
  {
    id: 'q7',
    language: 'en',
    question: {
      en: "You win a lottery you never entered. They ask for your bank details to transfer the prize. Should you provide them?",
      zh: "你赢得了从未参加过的彩票。他们要求你的银行信息来转账奖金。你应该提供吗？",
      ms: "Anda menang loteri yang tidak pernah anda sertai. Mereka minta butiran bank untuk pindah hadiah. Patut anda berikan?"
    },
    options: [
      {
        en: "Ask them to mail a cheque instead",
        zh: "要求他们邮寄支票",
        ms: "Minta mereka pos cek sahaja"
      },
      {
        en: "No - you can't win a lottery you didn't enter",
        zh: "不 - 你不可能赢得没参加的彩票",
        ms: "Tidak - anda tidak boleh menang loteri yang tidak disertai"
      },
      {
        en: "Yes, to claim my prize",
        zh: "是的，为了领取奖金",
        ms: "Ya, untuk tuntut hadiah saya"
      },
      {
        en: "Provide only partial bank details",
        zh: "只提供部分银行信息",
        ms: "Berikan hanya sebahagian butiran bank"
      }
    ],
    correctIndex: 1,
    explanation: {
      en: "This is a classic lottery scam. You cannot win a lottery or contest you didn't enter. They want your bank details to steal money, not give it.",
      zh: "这是典型的彩票诈骗。你不可能赢得没参加的彩票或比赛。他们想要你的银行信息是为了盗取资金，而不是给你钱。",
      ms: "Ini adalah penipuan loteri klasik. Anda tidak boleh menang loteri atau pertandingan yang tidak disertai. Mereka mahukan butiran bank untuk curi wang, bukan memberi."
    }
  },
  {
    id: 'q8',
    language: 'en',
    question: {
      en: "A website offers luxury goods at 90% discount but requires immediate payment via bank transfer. Is this safe?",
      zh: "一个网站以90%的折扣出售奢侈品，但要求通过银行转账立即付款。这安全吗？",
      ms: "Laman web tawarkan barang mewah pada diskaun 90% tetapi perlukan bayaran segera melalui pindahan bank. Adakah ini selamat?"
    },
    options: [
      {
        en: "Buy one item first to test",
        zh: "先买一件试试",
        ms: "Beli satu item dahulu untuk uji"
      },
      {
        en: "Yes, it's a great deal",
        zh: "是的，这是很好的交易",
        ms: "Ya, ini tawaran hebat"
      },
      {
        en: "No - too-good-to-be-true deals are usually scams",
        zh: "不 - 好到不真实的交易通常是诈骗",
        ms: "Tidak - tawaran terlalu baik biasanya penipuan"
      },
      {
        en: "Ask for cash on delivery",
        zh: "要求货到付款",
        ms: "Minta bayar semasa penghantaran"
      }
    ],
    correctIndex: 2,
    explanation: {
      en: "Extreme discounts + bank transfer only + pressure to buy immediately = scam. Use secure payment methods and verified sellers only.",
      zh: "极端折扣 + 只接受银行转账 + 催促立即购买 = 诈骗。只使用安全的支付方式和经过验证的卖家。",
      ms: "Diskaun melampau + pindahan bank sahaja + tekanan beli segera = penipuan. Guna kaedah bayaran selamat dan penjual disahkan sahaja."
    }
  },
  {
    id: 'q9',
    language: 'en',
    question: {
      en: "Your phone suddenly has apps you didn't install and unknown numbers appear in your call history. What should you do first?",
      zh: "你的手机突然出现未安装的应用，通话记录中有未知号码。你应该首先做什么？",
      ms: "Telefon anda tiba-tiba ada aplikasi yang tidak dipasang dan nombor tidak dikenali muncul dalam sejarah panggilan. Apa yang perlu anda lakukan dahulu?"
    },
    options: [
      {
        en: "Delete the unknown apps",
        zh: "删除未知应用",
        ms: "Padam aplikasi tidak dikenali"
      },
      {
        en: "Continue using the phone normally",
        zh: "继续正常使用手机",
        ms: "Teruskan guna telefon seperti biasa"
      },
      {
        en: "Turn on airplane mode and seek professional help",
        zh: "开启飞行模式并寻求专业帮助",
        ms: "Hidupkan mod pesawat dan dapatkan bantuan profesional"
      },
      {
        en: "Change your phone password",
        zh: "更改手机密码",
        ms: "Tukar kata laluan telefon"
      }
    ],
    correctIndex: 2,
    explanation: {
      en: "Your phone may be compromised. Turn on airplane mode immediately to stop remote access, then take it to an authorized service center.",
      zh: "你的手机可能已被入侵。立即开启飞行模式以阻止远程访问，然后送到授权服务中心。",
      ms: "Telefon anda mungkin terjejas. Hidupkan mod pesawat segera untuk hentikan akses jauh, kemudian bawa ke pusat servis sah."
    }
  },
  {
    id: 'q10',
    language: 'en',
    question: {
      en: "What is the ACT principle for scam prevention?",
      zh: "ACT防诈骗原则是什么？",
      ms: "Apakah prinsip ACT untuk pencegahan penipuan?"
    },
    options: [
      {
        en: "Act fast, Call police, Transfer money",
        zh: "快速行动，报警，转账",
        ms: "Bertindak pantas, Hubungi polis, Pindah wang"
      },
      {
        en: "Ask questions, Check official sources, Tell authorities",
        zh: "提问，核实官方来源，告知当局",
        ms: "Tanya soalan, Semak sumber rasmi, Beritahu pihak berkuasa"
      },
      {
        en: "Avoid calls, Cut internet, Take photos",
        zh: "避免来电，断网，拍照",
        ms: "Elak panggilan, Putus internet, Ambil foto"
      },
      {
        en: "Accept offers, Complete forms, Trust callers",
        zh: "接受优惠，填写表格，相信来电者",
        ms: "Terima tawaran, Lengkapkan borang, Percaya pemanggil"
      }
    ],
    correctIndex: 1,
    explanation: {
      en: "ACT stands for: Ask questions if unsure, Check with official sources, Tell police or family about suspicious activity. This three-step approach helps protect you from scams.",
      zh: "ACT代表：如有疑问就提问，与官方来源核实，向警察或家人告知可疑活动。这三步法可以帮助你防范诈骗。",
      ms: "ACT bermaksud: Tanya soalan jika tidak pasti, Semak dengan sumber rasmi, Beritahu polis atau keluarga tentang aktiviti mencurigakan. Pendekatan tiga langkah ini membantu melindungi anda dari penipuan."
    }
  }
];

export const chatbotResponses: Record<string, TranslatedText> = {
  greeting: {
    en: "Hello! I'm A-Xin, your scam prevention assistant. How can I help you today?",
    zh: "你好！我是阿信小助手。有什么我可以帮你的吗？",
    ms: "Hello! Saya A-Xin, pembantu pencegahan penipuan anda. Apa yang boleh saya bantu?"
  },
  government_scam: {
    en: "Government agencies never ask for money over the phone. If someone claims to be from the police or any government agency asking for payment, hang up and call back using the official number.",
    zh: "政府机构绝不会通过电话要求转账。如果有人声称是警察或任何政府机构要求付款，请挂断电话并使用官方号码回拨。",
    ms: "Agensi kerajaan tidak akan meminta wang melalui telefon. Jika seseorang mendakwa dari polis atau agensi kerajaan meminta bayaran, tutup telefon dan hubungi semula menggunakan nombor rasmi."
  },
  otp_safety: {
    en: "Never share your OTP (One-Time Password) with anyone - not even bank staff. OTPs are for your eyes only. Anyone asking for it is trying to scam you.",
    zh: "永远不要与任何人分享你的验证码（OTP）- 即使是银行工作人员。验证码仅供你自己使用。任何索要验证码的人都在试图诈骗你。",
    ms: "Jangan sekali-kali kongsikan OTP (Kata Laluan Sekali) anda dengan sesiapa - termasuk kakitangan bank. OTP adalah untuk mata anda sahaja. Sesiapa yang meminta sedang cuba menipu anda."
  },
  suspicious_link: {
    en: "Don't click on suspicious links in SMS or email. Always go directly to the official website or app instead of clicking links.",
    zh: "不要点击短信或电子邮件中的可疑链接。总是直接访问官方网站或应用，而不是点击链接。",
    ms: "Jangan klik pautan mencurigakan dalam SMS atau e-mel. Sentiasa lawati laman web atau aplikasi rasmi terus dan bukannya klik pautan."
  },
  remote_control: {
    en: "If you suspect your phone is being remotely controlled: 1) Turn on airplane mode immediately, 2) Power off your phone, 3) Don't enter any passwords, 4) Contact your bank, 5) Visit an authorized service center.",
    zh: "如果你怀疑手机被远程控制：1）立即开启飞行模式，2）关闭手机，3）不要输入任何密码，4）联系银行，5）访问授权服务中心。",
    ms: "Jika anda syak telefon dikawal dari jauh: 1) Hidupkan mod pesawat segera, 2) Matikan telefon, 3) Jangan masukkan kata laluan, 4) Hubungi bank, 5) Lawat pusat servis sah."
  },
  report_scam: {
    en: "To report a scam: Call 999 for emergencies, or 1800-722-6688 for the Anti-Scam Helpline. You can also visit www.scamshield.gov.sg for more information.",
    zh: "举报诈骗：拨打999（紧急情况），或1800-722-6688（反诈骗热线）。您也可以访问www.scamshield.gov.sg获取更多信息。",
    ms: "Untuk laporkan penipuan: Hubungi 999 untuk kecemasan, atau 1800-722-6688 untuk Talian Anti-Penipuan. Anda juga boleh lawati www.scamshield.gov.sg untuk maklumat lanjut."
  },
  default: {
    en: "I understand. Remember: If something feels wrong, it probably is. Always verify through official channels and never rush into decisions when money is involved.",
    zh: "我明白了。请记住：如果感觉不对劲，那很可能就是诈骗。永远通过官方渠道验证，涉及金钱时永远不要仓促决定。",
    ms: "Saya faham. Ingat: Jika sesuatu terasa tidak kena, ia mungkin betul. Sentiasa sahkan melalui saluran rasmi dan jangan tergesa-gesa buat keputusan yang melibatkan wang."
  }
};
