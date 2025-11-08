import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import ScamTypeCard from "@/components/ScamTypeCard";
import { useApp } from "@/contexts/AppContext";

export default function LearnPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();

  const scamTypes = [
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
