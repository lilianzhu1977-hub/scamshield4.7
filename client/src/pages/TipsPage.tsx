import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import TipCard from "@/components/TipCard";
import { useApp } from "@/contexts/AppContext";

export default function TipsPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();

  const remoteControlTips = language === 'zh' ? [
    { icon: "✈️", title: "开启飞行模式", description: "立即断开网络连接以阻止远程访问" },
    { icon: "🔌", title: "关闭手机", description: "关机可以中断诈骗者的连接" },
    { icon: "🚫", title: "不要输入密码或验证码", description: "不要提供任何敏感信息" },
    { icon: "📞", title: "联系可信的家人", description: "用另一部手机打给家人寻求帮助" },
    { icon: "🏦", title: "联系银行", description: "用官方号码联系银行冻结账户" },
    { icon: "👮", title: "报警", description: "向警察或反诈骗热线报告" },
    { icon: "🔧", title: "访问授权服务中心", description: "让专业人士检查你的设备" },
    { icon: "♻️", title: "恢复出厂设置", description: "仅在专业建议下进行" }
  ] : language === 'ms' ? [
    { icon: "✈️", title: "Hidupkan Mod Pesawat", description: "Putuskan sambungan internet segera untuk hentikan akses jauh" },
    { icon: "🔌", title: "Matikan Telefon", description: "Matikan kuasa boleh putuskan sambungan penipu" },
    { icon: "🚫", title: "Jangan Masukkan Kata Laluan atau OTP", description: "Jangan berikan sebarang maklumat sensitif" },
    { icon: "📞", title: "Hubungi Keluarga Dipercayai", description: "Guna telefon lain untuk hubungi keluarga minta bantuan" },
    { icon: "🏦", title: "Hubungi Bank", description: "Guna nombor rasmi untuk hubungi bank bekukan akaun" },
    { icon: "👮", title: "Lapor kepada Polis", description: "Laporkan kepada polis atau talian anti-penipuan" },
    { icon: "🔧", title: "Lawat Pusat Servis Sah", description: "Biar profesional periksa peranti anda" },
    { icon: "♻️", title: "Set Semula Kilang", description: "Hanya jika dinasihatkan oleh profesional" }
  ] : [
    { icon: "✈️", title: "Turn on Airplane Mode", description: "Disconnect from internet immediately to stop remote access" },
    { icon: "🔌", title: "Power Off Phone", description: "Shutting down can break the scammer's connection" },
    { icon: "🚫", title: "Don't Enter Passwords or OTPs", description: "Don't provide any sensitive information" },
    { icon: "📞", title: "Call Trusted Family", description: "Use another phone to contact family for help" },
    { icon: "🏦", title: "Contact Your Bank", description: "Use official number to contact bank and freeze account" },
    { icon: "👮", title: "Report to Police", description: "Report to police or anti-scam helpline" },
    { icon: "🔧", title: "Visit Authorized Service Center", description: "Let professionals check your device" },
    { icon: "♻️", title: "Factory Reset", description: "Only if advised by professionals" }
  ];

  const scamCallTips = language === 'zh' ? [
    { icon: "📵", title: "不确定时挂断", description: "如果有任何疑问，立即结束通话" },
    { icon: "❓", title: "提问但不回拨", description: "提问题测试对方，但不要回拨他们提供的号码" },
    { icon: "🔐", title: "永远不要分享验证码", description: "银行或政府绝不会要求验证码" },
    { icon: "⏰", title: "不要被紧迫感所迫", description: "诈骗者制造紧急情况来让你恐慌" }
  ] : language === 'ms' ? [
    { icon: "📵", title: "Tutup Jika Tidak Pasti", description: "Jika ada keraguan, tamatkan panggilan segera" },
    { icon: "❓", title: "Tanya Soalan - Jangan Hubungi Balik", description: "Uji mereka dengan soalan, tapi jangan hubungi nombor yang diberi" },
    { icon: "🔐", title: "Jangan Kongsi OTP", description: "Bank atau kerajaan tidak akan minta OTP" },
    { icon: "⏰", title: "Jangan Terpaksa dengan Desakan", description: "Penipu cipta kecemasan untuk buat anda panik" }
  ] : [
    { icon: "📵", title: "Hang Up If Unsure", description: "If you have any doubt, end the call immediately" },
    { icon: "❓", title: "Ask Questions - Don't Call Back", description: "Test them with questions, but don't call numbers they give" },
    { icon: "🔐", title: "Never Share OTPs", description: "Banks or government never ask for verification codes" },
    { icon: "⏰", title: "Don't Be Rushed", description: "Scammers create urgency to make you panic" }
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
          {language === 'zh' ? '安全提示' : language === 'ms' ? 'Petua Keselamatan' : 'Safety Tips'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '遇到诈骗时的应对措施' : language === 'ms' ? 'Apa yang perlu dilakukan jika hadapi penipuan' : 'What to do when facing scams'}
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            {language === 'zh' ? '如果您怀疑被远程控制' : language === 'ms' ? 'Jika Anda Syak Kawalan Jauh' : 'If You Suspect Remote Control'}
          </h2>
          <div className="space-y-4">
            {remoteControlTips.map((tip, idx) => (
              <TipCard
                key={idx}
                icon={tip.icon}
                title={tip.title}
                description={tip.description}
                stepNumber={idx + 1}
                testId={`tip-remote-${idx}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">
            {language === 'zh' ? '诈骗电话提示' : language === 'ms' ? 'Petua Panggilan Penipuan' : 'Scam Call Tips'}
          </h2>
          <div className="space-y-4">
            {scamCallTips.map((tip, idx) => (
              <TipCard
                key={idx}
                icon={tip.icon}
                title={tip.title}
                description={tip.description}
                testId={`tip-call-${idx}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
