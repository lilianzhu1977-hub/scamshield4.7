import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Phone, MessageSquare, Mail, Shield, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";
import ScamTypeCard from "@/components/ScamTypeCard";
import { useApp } from "@/contexts/AppContext";
import { scamTypes as scamTypesData } from "@shared/data/content";
import { getText } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";

export default function LearnPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();

  const scamTypes = scamTypesData.map(scam => ({
    icon: scam.icon,
    title: getText(scam.title, language),
    description: getText(scam.description, language),
    story: getText(scam.story, language),
    testId: `card-scam-${scam.id}`
  }));

  const actionScenarios = [
    {
      icon: Phone,
      title: language === 'zh' ? '接到诈骗电话时' : language === 'ms' ? 'Ketika Terima Panggilan Penipuan' : 'When You Get a Scam Call',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      steps: language === 'zh' 
        ? [
            '不要回答任何问题',
            '立即挂断电话',
            '不要按任何按键',
            '屏蔽号码',
            '向ScamShield举报 (1799)',
            '警告：骗子可以用AI复制你的声音！说话要小心'
          ]
        : language === 'ms'
        ? [
            'Jangan jawab sebarang soalan',
            'Tutup telefon segera',
            'Jangan tekan apa-apa butang',
            'Sekat nombor',
            'Laporkan ke ScamShield (1799)',
            'Amaran: Penipu boleh guna AI salin suara anda! Berhati-hati'
          ]
        : [
            'Don\'t answer any questions',
            'Hang up immediately',
            'Don\'t press any buttons',
            'Block the number',
            'Report to ScamShield (1799)',
            'Warning: Scammers can use AI to copy your voice! Be careful what you say'
          ]
    },
    {
      icon: MessageSquare,
      title: language === 'zh' ? '收到诈骗短信时' : language === 'ms' ? 'Ketika Terima SMS Penipuan' : 'When You Get a Scam SMS',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      steps: language === 'zh'
        ? [
            '不要点击任何链接',
            '不要回复短信',
            '删除消息',
            '截图保存证据',
            '向ScamShield举报',
            '检查官方应用/网站'
          ]
        : language === 'ms'
        ? [
            'Jangan klik sebarang pautan',
            'Jangan balas SMS',
            'Padam mesej',
            'Screenshot untuk bukti',
            'Laporkan ke ScamShield',
            'Semak aplikasi/laman web rasmi'
          ]
        : [
            'Don\'t click any links',
            'Don\'t reply to the message',
            'Delete the message',
            'Screenshot for evidence',
            'Report to ScamShield',
            'Check official app/website'
          ]
    },
    {
      icon: Mail,
      title: language === 'zh' ? '收到诈骗邮件时' : language === 'ms' ? 'Ketika Terima Email Penipuan' : 'When You Get a Scam Email',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      steps: language === 'zh'
        ? [
            '检查发件人地址',
            '不要下载附件',
            '不要点击链接',
            '标记为垃圾邮件',
            '向公司官方举报',
            '通知IT部门（如果是工作邮箱）'
          ]
        : language === 'ms'
        ? [
            'Semak alamat pengirim',
            'Jangan muat turun lampiran',
            'Jangan klik pautan',
            'Tandakan sebagai spam',
            'Laporkan ke syarikat rasmi',
            'Beritahu jabatan IT (jika email kerja)'
          ]
        : [
            'Check sender address',
            'Don\'t download attachments',
            'Don\'t click links',
            'Mark as spam',
            'Report to official company',
            'Notify IT department (if work email)'
          ]
    },
    {
      icon: Shield,
      title: language === 'zh' ? '怀疑手机被控制时' : language === 'ms' ? 'Jika Syak Telefon Dikawal' : 'If You Suspect Phone is Compromised',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      steps: language === 'zh'
        ? [
            '立即开启飞行模式',
            '关闭手机',
            '不要输入任何密码',
            '联系银行冻结账户',
            '前往授权服务中心',
            '报警 (999)'
          ]
        : language === 'ms'
        ? [
            'Hidupkan mod pesawat segera',
            'Matikan telefon',
            'Jangan masukkan kata laluan',
            'Hubungi bank bekukan akaun',
            'Lawat pusat servis sah',
            'Hubungi polis (999)'
          ]
        : [
            'Turn on airplane mode immediately',
            'Power off phone',
            'Don\'t enter any passwords',
            'Contact bank to freeze accounts',
            'Visit authorized service center',
            'Call police (999)'
          ]
    }
  ];

  const oldScamTypes = [
    {
      icon: "🏛️",
      title: language === 'zh' ? "政府假冒诈骗" : language === 'ms' ? "Penipuan Penyamaran Kerajaan" : "Government Impersonation",
      description: language === 'zh' ? "诈骗者假装是政府机构人员" : language === 'ms' ? "Penipu berpura-pura dari agensi kerajaan" : "Scammers pretend to be from government agencies",
      story: language === 'zh' 
        ? "陈太太接到一个声称来自新加坡警察的电话。他们说她的身份被用于犯罪，要求她将钱转到一个'安全账户'。这是一个常见的诈骗 - 政府机构绝不会通过电话要求转账。"
        : language === 'ms'
        ? "Puan Tan menerima panggilan yang mendakwa dari Polis Singapura. Mereka mengatakan identitinya digunakan dalam jenayah dan meminta dia memindahkan wang ke 'akaun selamat'. Ini adalah penipuan biasa - agensi kerajaan tidak akan meminta wang melalui telefon."
        : "Mrs. Tan received a call claiming to be from Singapore Police. They said her identity was used in a crime and asked her to transfer money to a 'safe account'. This is a common scam - government agencies never ask for money over the phone.",
      testId: "card-scam-government"
    },
    {
      icon: "👨‍👩‍👧",
      title: language === 'zh' ? "假冒亲友诈骗" : language === 'ms' ? "Penipuan Panggilan Rakan/Keluarga Palsu" : "Fake Friend/Family Call",
      description: language === 'zh' ? "诈骗者假装是你的亲友需要紧急帮助" : language === 'ms' ? "Penipu berpura-pura menjadi rakan/keluarga yang memerlukan bantuan kecemasan" : "Scammers pretend to be your loved ones needing urgent help",
      story: language === 'zh'
        ? "李先生收到一条消息，显示是他儿子的号码，说他出了车祸需要紧急汇款。李先生差点上当，但他先打了儿子的电话确认，发现这是诈骗。永远要直接联系你的家人确认。"
        : language === 'ms'
        ? "Encik Lee menerima mesej dari nombor yang kelihatan seperti anaknya, mengatakan dia mengalami kemalangan dan perlukan wang dengan segera. Encik Lee hampir tertipu tetapi dia menghubungi anaknya terus dan mendapati ia penipuan. Sentiasa hubungi keluarga anda secara langsung untuk pengesahan."
        : "Mr. Lee received a message from what appeared to be his son's number, saying he had an accident and needed money urgently. Mr. Lee almost fell for it but called his son directly and found it was a scam. Always contact your family members directly to verify.",
      testId: "card-scam-family"
    },
    {
      icon: "📦",
      title: language === 'zh' ? "电商/快递诈骗" : language === 'ms' ? "Penipuan E-dagang/Penghantaran" : "E-commerce/Delivery Scam",
      description: language === 'zh' ? "虚假的包裹通知和退款要求" : language === 'ms' ? "Pemberitahuan pakej palsu dan permintaan bayaran balik" : "Fake package notifications and refund requests",
      story: language === 'zh'
        ? "王太太收到短信说她的包裹无法投递，需要点击链接支付额外费用。链接看起来很真实，但实际上是个钓鱼网站。永远不要点击短信中的可疑链接，直接访问官方网站或应用。"
        : language === 'ms'
        ? "Puan Wang menerima SMS bahawa paketnya tidak dapat dihantar dan perlu klik pautan untuk bayar yuran tambahan. Pautan kelihatan sahih tetapi sebenarnya laman web pancingan. Jangan klik pautan mencurigakan dalam SMS, lawati laman web rasmi atau aplikasi terus."
        : "Mrs. Wang received an SMS saying her package couldn't be delivered and needed to click a link to pay extra fees. The link looked real but was actually a phishing website. Never click suspicious links in SMS, go directly to official websites or apps.",
      testId: "card-scam-ecommerce"
    },
    {
      icon: "💕",
      title: language === 'zh' ? "爱情/浪漫诈骗" : language === 'ms' ? "Penipuan Cinta/Romantik" : "Love/Romance Scam",
      description: language === 'zh' ? "网上恋爱后骗取金钱" : language === 'ms' ? "Menipu wang selepas hubungan dalam talian" : "Online relationships leading to money requests",
      story: language === 'zh'
        ? "张女士在社交媒体上认识了一个'海外商人'。几个月后，他说遇到紧急情况需要钱。这是典型的浪漫诈骗。永远不要给从未见过面的网友汇款。"
        : language === 'ms'
        ? "Cik Zhang bertemu 'ahli perniagaan luar negara' di media sosial. Selepas beberapa bulan, dia mengatakan menghadapi kecemasan dan perlukan wang. Ini adalah penipuan romantik biasa. Jangan sekali-kali hantar wang kepada kenalan dalam talian yang tidak pernah ditemui."
        : "Ms. Zhang met an 'overseas businessman' on social media. After months of chatting, he said he had an emergency and needed money. This is a classic romance scam. Never send money to online friends you've never met in person.",
      testId: "card-scam-romance"
    },
    {
      icon: "💰",
      title: language === 'zh' ? "投资/快速致富诈骗" : language === 'ms' ? "Penipuan Pelaburan/Cepat Kaya" : "Investment/Get-Rich-Quick Scam",
      description: language === 'zh' ? "承诺高回报的虚假投资" : language === 'ms' ? "Pelaburan palsu yang menjanjikan pulangan tinggi" : "Fake investments promising high returns",
      story: language === 'zh'
        ? "黄先生被邀请加入一个'保证获利'的加密货币投资群。起初他获得了小额回报，但当他投入大笔资金后，网站就消失了。如果听起来好到不真实，那很可能就是诈骗。"
        : language === 'ms'
        ? "Encik Wong dijemput menyertai kumpulan pelaburan mata wang kripto 'untung terjamin'. Pada mulanya dia dapat pulangan kecil, tetapi apabila dia laburkan jumlah besar, laman web hilang. Jika kedengaran terlalu baik untuk menjadi kenyataan, ia mungkin penipuan."
        : "Mr. Wong was invited to join a 'guaranteed profit' cryptocurrency investment group. At first he got small returns, but when he invested a large sum, the website disappeared. If it sounds too good to be true, it probably is a scam.",
      testId: "card-scam-investment"
    }
  ];
  // Using data from shared/data/content.ts instead

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          data-testid="button-back"
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-4"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
        </Button>
        <h1 className="text-4xl font-bold mb-2">
          {language === 'zh' ? '学习识别诈骗' : language === 'ms' ? 'Belajar Mengenali Penipuan' : 'Learn About Scams'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '了解最常见的诈骗类型' : language === 'ms' ? 'Ketahui jenis penipuan yang paling biasa' : 'Understand the most common scam types'}
        </p>
      </div>

      {/* What to Do Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold">
            {language === 'zh' ? '遇到诈骗怎么办？' : language === 'ms' ? 'Apa Yang Perlu Buat?' : 'What to Do When Scammed?'}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {actionScenarios.map((scenario, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg ${scenario.bgColor}`}>
                  <scenario.icon className={`w-6 h-6 ${scenario.color}`} />
                </div>
                <h3 className="text-xl font-bold">{scenario.title}</h3>
              </div>
              <div className="space-y-2">
                {scenario.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5 shrink-0">
                      {stepIndex + 1}
                    </Badge>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Voice Warning Banner */}
      <Card className="p-6 mb-12 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-2">
              {language === 'zh' ? '⚠️ AI语音诈骗警告' : language === 'ms' ? '⚠️ Amaran Penipuan Suara AI' : '⚠️ AI Voice Scam Warning'}
            </h3>
            <p className="text-red-800 mb-2">
              {language === 'zh' 
                ? '骗子现在可以使用人工智能技术复制你的声音！他们只需要短短3秒的录音。'
                : language === 'ms'
                ? 'Penipu kini boleh guna teknologi AI untuk salin suara anda! Mereka hanya perlukan 3 saat rakaman.'
                : 'Scammers can now use AI technology to clone your voice! They only need 3 seconds of audio.'}
            </p>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>
                {language === 'zh' ? '不要在不明电话中说"是"或"好"' : language === 'ms' ? 'Jangan kata "ya" atau "ok" dalam panggilan tak dikenali' : 'Never say "yes" or "okay" in unknown calls'}
              </li>
              <li>
                {language === 'zh' ? '与家人设定暗号确认身份' : language === 'ms' ? 'Tetapkan kod rahsia dengan keluarga' : 'Set up secret codes with family'}
              </li>
              <li>
                {language === 'zh' ? '总是用视频通话确认紧急请求' : language === 'ms' ? 'Sentiasa guna video call untuk sahkan permintaan kecemasan' : 'Always use video calls to verify emergency requests'}
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Scam Types Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-6">
          {language === 'zh' ? '常见诈骗类型' : language === 'ms' ? 'Jenis Penipuan Biasa' : 'Common Scam Types'}
        </h2>
      </div>
      <div className="space-y-6">
        {scamTypes.map((scam) => (
          <ScamTypeCard
            key={scam.testId}
            icon={scam.icon}
            title={scam.title}
            description={scam.description}
            story={scam.story}
            testId={scam.testId}
          />
        ))}
      </div>
    </div>
  );
}
