
interface SpotScamQuestion {
  id: string;
  scenario: string;
  messageType: 'sms' | 'email' | 'call' | 'chat';
  content: string;
  sender?: string;
  caller?: string;
  attachmentName?: string;
  redFlags: string[];
  isScam: boolean;
  explanation: string;
  whatToDo: string;
}

export const spotScamQuestions: Record<string, SpotScamQuestion[]> = {
  en: [
    {
      id: 'spot-1',
      scenario: 'You receive this SMS',
      messageType: 'sms' as const,
      content: 'DBS ALERT: Unusual activity detected. Click https://dbs-secure-verify.com to verify your account within 24hrs or it will be suspended.',
      sender: '+65 8234 5678',
      redFlags: [
        'Suspicious URL (not official dbs.com.sg)',
        'Creates urgency (24 hours)',
        'Threatens account suspension',
        'Unknown sender number'
      ],
      isScam: true,
      explanation: 'This is a phishing scam! Real banks never send links via SMS. The URL is fake (real DBS is dbs.com.sg). Scammers create urgency to make you panic and click.',
      whatToDo: 'Delete the SMS immediately. Never click suspicious links. If concerned, call DBS at 1800-111-1111 (official number).'
    },
    {
      id: 'spot-2',
      scenario: 'You receive this phone call',
      messageType: 'call' as const,
      content: 'Hello, this is Officer Tan from Singapore Police Force. Your identity has been used in a money laundering case. We need you to transfer your savings to a safe account for investigation.',
      caller: 'SPF Investigation',
      redFlags: [
        'Asks you to transfer money',
        'Claims urgent police matter',
        'Requests immediate action',
        'Mentions "safe account"'
      ],
      isScam: true,
      explanation: 'Classic government impersonation scam! Police NEVER ask you to transfer money. There is no such thing as a "safe account". Scammers use fear tactics.',
      whatToDo: 'Hang up immediately. Police contact you officially through letters, not random calls demanding money. Report to 1800-255-0000 (SPF hotline).'
    },
    {
      id: 'spot-3',
      scenario: 'You receive this email',
      messageType: 'email' as const,
      content: 'Dear Customer, Your monthly DBS Bank statement is ready. Please review your account activity for December 2024.',
      sender: 'statements@dbs.com.sg',
      attachmentName: 'DBS_Statement_Dec2024.pdf',
      redFlags: [],
      isScam: false,
      explanation: 'This appears legitimate! The email is from official dbs.com.sg domain, no suspicious links, and monthly statements are normal bank communication.',
      whatToDo: 'Still verify by logging into your DBS app directly (not through email link). Check if statement matches your records. When in doubt, call DBS at 1800-111-1111.'
    },
    {
      id: 'spot-4',
      scenario: 'You receive this SMS',
      messageType: 'sms' as const,
      content: 'Your SingPost parcel delivery failed. Pay $2.50 redelivery fee: https://singpost-redelivery.net/track/SG847392',
      sender: 'SingPost',
      redFlags: [
        'Fake URL (real is singpost.com)',
        'Unusual redelivery fee request',
        'Suspicious tracking link',
        'Generic sender name'
      ],
      isScam: true,
      explanation: 'Delivery scam! Real SingPost doesn\'t charge redelivery fees via SMS links. The URL is fake (real is singpost.com). They want your credit card details.',
      whatToDo: 'Delete immediately. Check real SingPost app or website directly. Real delivery notifications come from official channels. Report to SingPost.'
    },
    {
      id: 'spot-5',
      scenario: 'WhatsApp message from unknown number',
      messageType: 'chat' as const,
      content: 'Hi Uncle! It\'s me your grandson. I lost my phone and this is my new number. Can you help me urgently? I need to pay hospital bill $5000. Please transfer to this account...',
      sender: '+60 12-345-6789',
      redFlags: [
        'Foreign number (Malaysia +60)',
        'Urgent money request',
        'Claims to be family member',
        'No way to verify identity',
        'Asks for immediate transfer'
      ],
      isScam: true,
      explanation: 'Family emergency scam! Scammers pretend to be relatives in trouble. Real family would video call or provide verifiable info. Malaysian number is suspicious.',
      whatToDo: 'STOP! Call your real grandson directly on his known number. Ask questions only real family would know. NEVER transfer money without verification.'
    }
  ],
  zh: [
    {
      id: 'spot-1',
      scenario: '你收到这条短信',
      messageType: 'sms' as const,
      content: '星展银行警报：检测到异常活动。请在24小时内点击 https://dbs-secure-verify.com 验证您的账户，否则将被暂停。',
      sender: '+65 8234 5678',
      redFlags: [
        '可疑网址（不是官方 dbs.com.sg）',
        '制造紧迫感（24小时）',
        '威胁暂停账户',
        '未知发送号码'
      ],
      isScam: true,
      explanation: '这是网络钓鱼诈骗！真正的银行从不通过短信发送链接。网址是假的（真正的星展银行是 dbs.com.sg）。骗子制造紧迫感让你恐慌和点击。',
      whatToDo: '立即删除短信。永远不要点击可疑链接。如有疑虑，请拨打星展银行 1800-111-1111（官方号码）。'
    }
  ],
  ms: [
    {
      id: 'spot-1',
      scenario: 'Anda terima SMS ini',
      messageType: 'sms' as const,
      content: 'AMARAN DBS: Aktiviti luar biasa dikesan. Klik https://dbs-secure-verify.com untuk sahkan akaun dalam 24jam atau ia akan digantung.',
      sender: '+65 8234 5678',
      redFlags: [
        'URL mencurigakan (bukan dbs.com.sg rasmi)',
        'Cipta kepanikan (24 jam)',
        'Ancam gantung akaun',
        'Nombor penghantar tidak dikenali'
      ],
      isScam: true,
      explanation: 'Ini penipuan pancingan! Bank sebenar tidak hantar pautan melalui SMS. URL adalah palsu (DBS sebenar ialah dbs.com.sg). Penipu cipta kepanikan.',
      whatToDo: 'Padam SMS segera. Jangan klik pautan mencurigakan. Jika bimbang, hubungi DBS di 1800-111-1111 (nombor rasmi).'
    }
  ]
};
