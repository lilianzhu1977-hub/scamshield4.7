interface DecisionOption {
  text: {
    en: string;
    zh: string;
    ms: string;
  };
  isCorrect: boolean;
  feedback: {
    en: string;
    zh: string;
    ms: string;
  };
}

interface WhatWouldYouDoScenario {
  id: string;
  scenario: {
    en: string;
    zh: string;
    ms: string;
  };
  context: {
    en: string;
    zh: string;
    ms: string;
  };
  options: DecisionOption[];
  educationalNote: {
    en: string;
    zh: string;
    ms: string;
  };
}

export const whatWouldYouDoScenarios: WhatWouldYouDoScenario[] = [
  {
    id: 'scenario-1',
    scenario: {
      en: 'You receive a call from someone claiming to be from your bank, asking for your credit card CVV number.',
      zh: '你接到一个自称是你银行的人打来的电话，要求提供你的信用卡CVV号码。',
      ms: 'Anda terima panggilan dari seseorang yang mendakwa dari bank anda, meminta nombor CVV kad kredit anda.'
    },
    context: {
      en: 'The caller sounds professional and knows your name and last 4 digits of your card.',
      zh: '来电者听起来很专业，知道你的名字和卡号的后4位数字。',
      ms: 'Pemanggil kedengaran profesional dan tahu nama anda dan 4 digit terakhir kad anda.'
    },
    options: [
      {
        text: {
          en: 'Give them the CVV since they already know some details',
          zh: '既然他们已经知道一些详情，就给他们CVV',
          ms: 'Beri mereka CVV kerana mereka sudah tahu beberapa butiran'
        },
        isCorrect: false,
        feedback: {
          en: 'Never share your CVV! Scammers often have partial information to build trust. Real banks NEVER ask for your CVV.',
          zh: '绝不要分享你的CVV！诈骗者通常有部分信息来建立信任。真正的银行绝不会要求你的CVV。',
          ms: 'Jangan sekali-kali kongsikan CVV anda! Penipu sering mempunyai maklumat separa untuk membina kepercayaan. Bank sebenar TIDAK PERNAH minta CVV anda.'
        }
      },
      {
        text: {
          en: 'Hang up and call the bank using the number on the back of your card',
          zh: '挂断电话，用卡背面的号码回拨银行',
          ms: 'Tutup telefon dan hubungi bank menggunakan nombor di belakang kad anda'
        },
        isCorrect: true,
        feedback: {
          en: 'Excellent! Always verify by calling the official number yourself. This is the safest approach.',
          zh: '太好了！总是通过自己拨打官方号码来验证。这是最安全的方法。',
          ms: 'Hebat! Sentiasa sahkan dengan menghubungi nombor rasmi sendiri. Ini adalah pendekatan paling selamat.'
        }
      },
      {
        text: {
          en: 'Ask them to send you an email instead',
          zh: '要求他们发邮件给你',
          ms: 'Minta mereka hantar e-mel sahaja'
        },
        isCorrect: false,
        feedback: {
          en: 'Not safe! Scammers can easily send fake emails. Instead, hang up and call the official bank number.',
          zh: '不安全！诈骗者可以轻易发送假邮件。相反，挂断电话并拨打官方银行号码。',
          ms: 'Tidak selamat! Penipu boleh hantar e-mel palsu dengan mudah. Sebaliknya, tutup telefon dan hubungi nombor bank rasmi.'
        }
      }
    ],
    educationalNote: {
      en: 'Banks will NEVER call you asking for passwords, PINs, or CVV numbers. Always verify by calling official numbers yourself.',
      zh: '银行绝不会打电话要求你提供密码、PIN或CVV号码。总是通过自己拨打官方号码来验证。',
      ms: 'Bank TIDAK PERNAH hubungi anda untuk minta kata laluan, PIN, atau nombor CVV. Sentiasa sahkan dengan menghubungi nombor rasmi sendiri.'
    }
  },
  {
    id: 'scenario-2',
    scenario: {
      en: 'You receive an SMS saying your package needs additional fees with a link to pay.',
      zh: '你收到一条短信说你的包裹需要额外费用，并附有付款链接。',
      ms: 'Anda terima SMS yang mengatakan bungkusan anda perlukan bayaran tambahan dengan pautan untuk bayar.'
    },
    context: {
      en: 'You are expecting a package, and the message looks official.',
      zh: '你正在等待一个包裹，消息看起来很正式。',
      ms: 'Anda menjangkakan bungkusan, dan mesej kelihatan rasmi.'
    },
    options: [
      {
        text: {
          en: 'Click the link to pay the fee quickly',
          zh: '点击链接快速付费',
          ms: 'Klik pautan untuk bayar yuran dengan cepat'
        },
        isCorrect: false,
        feedback: {
          en: 'Dangerous! Never click links in unexpected messages. This could be a phishing scam to steal your banking details.',
          zh: '危险！绝不要点击意外消息中的链接。这可能是窃取你银行详情的钓鱼诈骗。',
          ms: 'Bahaya! Jangan sekali-kali klik pautan dalam mesej tidak dijangka. Ini boleh jadi penipuan pancingan untuk curi butiran perbankan anda.'
        }
      },
      {
        text: {
          en: 'Check the delivery app or official website directly',
          zh: '直接查看快递应用或官方网站',
          ms: 'Semak aplikasi penghantaran atau laman web rasmi secara langsung'
        },
        isCorrect: true,
        feedback: {
          en: 'Smart move! Always verify through official channels, not through links in messages.',
          zh: '明智之举！总是通过官方渠道验证，而不是通过消息中的链接。',
          ms: 'Langkah bijak! Sentiasa sahkan melalui saluran rasmi, bukan melalui pautan dalam mesej.'
        }
      },
      {
        text: {
          en: 'Reply to the SMS asking for more details',
          zh: '回复短信询问更多详情',
          ms: 'Balas SMS untuk tanya lebih butiran'
        },
        isCorrect: false,
        feedback: {
          en: 'Not recommended! Replying confirms your number is active. Instead, check the official delivery app or website.',
          zh: '不推荐！回复确认你的号码是活跃的。相反，查看官方快递应用或网站。',
          ms: 'Tidak disyorkan! Membalas mengesahkan nombor anda aktif. Sebaliknya, semak aplikasi atau laman web penghantaran rasmi.'
        }
      }
    ],
    educationalNote: {
      en: 'Delivery companies will notify you through their official apps. Never click links in SMS. Always go directly to the official app or website.',
      zh: '快递公司会通过其官方应用通知你。绝不要点击短信中的链接。总是直接访问官方应用或网站。',
      ms: 'Syarikat penghantaran akan beritahu anda melalui aplikasi rasmi mereka. Jangan klik pautan dalam SMS. Sentiasa pergi terus ke aplikasi atau laman web rasmi.'
    }
  },
  {
    id: 'scenario-3',
    scenario: {
      en: 'Someone you met online 2 weeks ago says they need $3000 urgently for a family emergency.',
      zh: '你两周前在网上认识的人说他们急需3000新币处理家庭紧急情况。',
      ms: 'Seseorang yang anda jumpa dalam talian 2 minggu lepas kata mereka perlukan $3000 segera untuk kecemasan keluarga.'
    },
    context: {
      en: 'They\'ve been very friendly and say they\'ll pay you back next week.',
      zh: '他们一直很友好，说下周会还你钱。',
      ms: 'Mereka sangat mesra dan kata akan bayar balik minggu depan.'
    },
    options: [
      {
        text: {
          en: 'Send the money because they seem trustworthy',
          zh: '汇款因为他们看起来值得信任',
          ms: 'Hantar wang kerana mereka kelihatan boleh dipercayai'
        },
        isCorrect: false,
        feedback: {
          en: 'Classic romance scam! Scammers build trust quickly online then create emergencies. You\'ll never see that money again.',
          zh: '典型的爱情诈骗！诈骗者在网上快速建立信任然后制造紧急情况。你永远不会再见到那笔钱。',
          ms: 'Penipuan percintaan klasik! Penipu membina kepercayaan dengan cepat dalam talian kemudian cipta kecemasan. Anda tidak akan lihat wang itu lagi.'
        }
      },
      {
        text: {
          en: 'Politely refuse and stop communication',
          zh: '礼貌地拒绝并停止沟通',
          ms: 'Tolak dengan sopan dan hentikan komunikasi'
        },
        isCorrect: true,
        feedback: {
          en: 'Wise decision! Never send money to someone you only know online, especially someone you just met. This is a major red flag.',
          zh: '明智的决定！绝不要给你只在网上认识的人汇款，特别是刚认识的人。这是一个重大的警告信号。',
          ms: 'Keputusan bijak! Jangan hantar wang kepada seseorang yang anda hanya kenal dalam talian, terutama yang baru jumpa. Ini adalah tanda bahaya utama.'
        }
      },
      {
        text: {
          en: 'Send half the amount to help a little',
          zh: '汇一半钱帮一点忙',
          ms: 'Hantar separuh jumlah untuk bantu sikit'
        },
        isCorrect: false,
        feedback: {
          en: 'Still a scam! Any amount you send will be lost. Legitimate emergencies don\'t ask strangers for money online.',
          zh: '仍然是诈骗！你汇的任何金额都会损失。合法的紧急情况不会在网上向陌生人要钱。',
          ms: 'Masih penipuan! Apa sahaja jumlah yang anda hantar akan hilang. Kecemasan sah tidak minta wang dari orang asing dalam talian.'
        }
      }
    ],
    educationalNote: {
      en: 'NEVER send money to people you\'ve only met online. Romance scammers create fake relationships to steal money. Real emergencies don\'t happen to people you just met.',
      zh: '绝不要给你只在网上认识的人汇款。爱情诈骗者制造假关系来偷钱。真正的紧急情况不会发生在你刚认识的人身上。',
      ms: 'JANGAN SEKALI-KALI hantar wang kepada orang yang anda hanya jumpa dalam talian. Penipu percintaan cipta hubungan palsu untuk curi wang. Kecemasan sebenar tidak berlaku kepada orang yang baru jumpa.'
    }
  },
  {
    id: 'scenario-4',
    scenario: {
      en: 'You receive an email with an attachment claiming to be an invoice from a company you don\'t recognize.',
      zh: '你收到一封带附件的电子邮件，声称是来自你不认识的公司的发票。',
      ms: 'Anda terima e-mel dengan lampiran yang mendakwa invois dari syarikat yang anda tidak kenali.'
    },
    context: {
      en: 'The email says you have an outstanding payment and threatens legal action.',
      zh: '电子邮件说你有未付款项并威胁采取法律行动。',
      ms: 'E-mel kata anda ada bayaran tertunggak dan ugut tindakan undang-undang.'
    },
    options: [
      {
        text: {
          en: 'Open the attachment to check the invoice',
          zh: '打开附件查看发票',
          ms: 'Buka lampiran untuk semak invois'
        },
        isCorrect: false,
        feedback: {
          en: 'Dangerous! The attachment likely contains malware. Never open attachments from unknown senders.',
          zh: '危险！附件可能包含恶意软件。绝不要打开来自未知发件人的附件。',
          ms: 'Bahaya! Lampiran mungkin mengandungi perisian hasad. Jangan buka lampiran dari penghantar tidak dikenali.'
        }
      },
      {
        text: {
          en: 'Delete the email immediately',
          zh: '立即删除电子邮件',
          ms: 'Padam e-mel dengan segera'
        },
        isCorrect: true,
        feedback: {
          en: 'Correct! Delete suspicious emails from unknown companies. Legitimate companies you do business with will contact you through proper channels.',
          zh: '正确！删除来自未知公司的可疑电子邮件。你有业务往来的合法公司会通过适当的渠道联系你。',
          ms: 'Betul! Padam e-mel mencurigakan dari syarikat tidak dikenali. Syarikat sah yang anda berurusan akan hubungi anda melalui saluran yang betul.'
        }
      },
      {
        text: {
          en: 'Reply asking for clarification',
          zh: '回复要求澄清',
          ms: 'Balas untuk minta penjelasan'
        },
        isCorrect: false,
        feedback: {
          en: 'Not safe! Replying confirms your email is active. Simply delete suspicious emails from unknown sources.',
          zh: '不安全！回复确认你的电子邮件是活跃的。只需删除来自未知来源的可疑电子邮件。',
          ms: 'Tidak selamat! Membalas mengesahkan e-mel anda aktif. Cuma padam e-mel mencurigakan dari sumber tidak dikenali.'
        }
      }
    ],
    educationalNote: {
      en: 'Never open attachments from unknown senders - they often contain viruses or malware. If you don\'t recognize the company, delete the email.',
      zh: '绝不要打开来自未知发件人的附件 - 它们通常包含病毒或恶意软件。如果你不认识该公司，删除电子邮件。',
      ms: 'Jangan buka lampiran dari penghantar tidak dikenali - ia sering mengandungi virus atau perisian hasad. Jika anda tidak kenali syarikat itu, padam e-mel.'
    }
  },
  {
    id: 'scenario-5',
    scenario: {
      en: 'You see a Facebook ad promising 300% returns on cryptocurrency investment in 3 months.',
      zh: '你看到一个Facebook广告承诺在3个月内加密货币投资回报率为300%。',
      ms: 'Anda lihat iklan Facebook yang janjikan pulangan 300% untuk pelaburan cryptocurrency dalam 3 bulan.'
    },
    context: {
      en: 'The ad shows testimonials from people who claim to have made lots of money.',
      zh: '广告显示声称赚了很多钱的人的推荐。',
      ms: 'Iklan tunjuk testimoni dari orang yang dakwa telah buat banyak wang.'
    },
    options: [
      {
        text: {
          en: 'Invest a small amount to test it out',
          zh: '投资小额测试一下',
          ms: 'Laburkan jumlah kecil untuk cuba'
        },
        isCorrect: false,
        feedback: {
          en: 'Investment scam! Promises of guaranteed high returns are always scams. Any amount you invest will be lost.',
          zh: '投资诈骗！保证高回报的承诺总是诈骗。你投资的任何金额都会损失。',
          ms: 'Penipuan pelaburan! Janji pulangan tinggi yang dijamin sentiasa penipuan. Apa sahaja jumlah yang anda laburkan akan hilang.'
        }
      },
      {
        text: {
          en: 'Ignore it - if it sounds too good to be true, it probably is',
          zh: '忽略它 - 如果听起来好得难以置信，那可能就是骗局',
          ms: 'Abaikan - jika kedengaran terlalu bagus untuk menjadi kenyataan, ia mungkin penipuan'
        },
        isCorrect: true,
        feedback: {
          en: 'Smart! Legitimate investments never guarantee such high returns. These ads use fake testimonials to lure victims.',
          zh: '聪明！合法的投资绝不会保证如此高的回报。这些广告使用假推荐来引诱受害者。',
          ms: 'Bijak! Pelaburan sah tidak pernah jamin pulangan setinggi itu. Iklan ini guna testimoni palsu untuk pikat mangsa.'
        }
      },
      {
        text: {
          en: 'Share it with friends so they can benefit too',
          zh: '与朋友分享让他们也受益',
          ms: 'Kongsi dengan kawan supaya mereka juga boleh dapat manfaat'
        },
        isCorrect: false,
        feedback: {
          en: 'Don\'t spread scams! By sharing, you\'re helping scammers reach more victims. Warn your friends it\'s a scam instead.',
          zh: '不要传播诈骗！通过分享，你在帮助诈骗者接触更多受害者。相反警告你的朋友这是诈骗。',
          ms: 'Jangan sebarkan penipuan! Dengan berkongsi, anda bantu penipu capai lebih ramai mangsa. Amaran kawan anda ia adalah penipuan sebaliknya.'
        }
      }
    ],
    educationalNote: {
      en: 'Investment scams promise unrealistic returns. No legitimate investment can guarantee 300% returns. Always research investment opportunities thoroughly and never invest based on social media ads.',
      zh: '投资诈骗承诺不切实际的回报。没有合法的投资可以保证300%的回报。总是彻底研究投资机会，绝不要基于社交媒体广告投资。',
      ms: 'Penipuan pelaburan janjikan pulangan tidak realistik. Tiada pelaburan sah boleh jamin pulangan 300%. Sentiasa kaji peluang pelaburan dengan teliti dan jangan laburkan berdasarkan iklan media sosial.'
    }
  },
  {
    id: 'scenario-6',
    scenario: {
      en: 'Your computer shows a pop-up saying it\'s infected with viruses and provides a number to call for "Microsoft Support".',
      zh: '你的电脑显示一个弹窗说它感染了病毒，并提供一个"微软支持"的电话号码。',
      ms: 'Komputer anda tunjuk pop-up kata ia dijangkiti virus dan berikan nombor untuk hubungi "Sokongan Microsoft".'
    },
    context: {
      en: 'The pop-up looks official and won\'t close easily.',
      zh: '弹窗看起来很正式，不容易关闭。',
      ms: 'Pop-up kelihatan rasmi dan sukar ditutup.'
    },
    options: [
      {
        text: {
          en: 'Call the number shown on the pop-up',
          zh: '拨打弹窗上显示的号码',
          ms: 'Hubungi nombor yang ditunjukkan pada pop-up'
        },
        isCorrect: false,
        feedback: {
          en: 'Tech support scam! These fake pop-ups trick you into calling scammers who will demand payment or remote access to your computer.',
          zh: '技术支持诈骗！这些假弹窗欺骗你打电话给诈骗者，他们会要求付款或远程访问你的电脑。',
          ms: 'Penipuan sokongan teknikal! Pop-up palsu ini tipu anda untuk hubungi penipu yang akan minta bayaran atau akses jauh ke komputer anda.'
        }
      },
      {
        text: {
          en: 'Close your browser and run your antivirus software',
          zh: '关闭浏览器并运行你的杀毒软件',
          ms: 'Tutup pelayar anda dan jalankan perisian antivirus anda'
        },
        isCorrect: true,
        feedback: {
          en: 'Perfect! Force close your browser (Ctrl+Alt+Delete) and run your legitimate antivirus. Microsoft never displays pop-ups like this.',
          zh: '完美！强制关闭你的浏览器（Ctrl+Alt+Delete）并运行你的合法杀毒软件。微软从不显示这样的弹窗。',
          ms: 'Sempurna! Tutup paksa pelayar anda (Ctrl+Alt+Delete) dan jalankan antivirus sah anda. Microsoft tidak pernah paparkan pop-up seperti ini.'
        }
      },
      {
        text: {
          en: 'Pay for the "fix" using the credit card form on the pop-up',
          zh: '使用弹窗上的信用卡表格付款"修复"',
          ms: 'Bayar untuk "pembaikan" menggunakan borang kad kredit pada pop-up'
        },
        isCorrect: false,
        feedback: {
          en: 'Never pay! This is a scam. Microsoft doesn\'t charge through pop-ups. You\'d lose your money and possibly expose your credit card details.',
          zh: '绝不要付款！这是诈骗。微软不通过弹窗收费。你会损失金钱并可能暴露你的信用卡详情。',
          ms: 'Jangan bayar! Ini penipuan. Microsoft tidak caj melalui pop-up. Anda akan kehilangan wang dan mungkin dedahkan butiran kad kredit anda.'
        }
      }
    ],
    educationalNote: {
      en: 'Microsoft and legitimate tech companies NEVER display virus warnings through pop-ups or ask you to call them. Close the browser and use your own antivirus software.',
      zh: '微软和合法的技术公司绝不会通过弹窗显示病毒警告或要求你打电话给他们。关闭浏览器并使用你自己的杀毒软件。',
      ms: 'Microsoft dan syarikat teknologi sah TIDAK PERNAH paparkan amaran virus melalui pop-up atau minta anda hubungi mereka. Tutup pelayar dan guna perisian antivirus anda sendiri.'
    }
  }
];
