import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Share2, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import EmergencyButton from "@/components/EmergencyButton";
import { useApp } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";

export default function HelpLinesPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();

  const checklistItems = language === 'zh' ? [
    "立即开启飞行模式",
    "关闭手机电源",
    "不要输入密码或验证码",
    "用另一部手机打给家人",
    "联系银行（使用官方号码）",
    "向警察或反诈骗热线报告"
  ] : language === 'ms' ? [
    "Hidupkan mod pesawat segera",
    "Matikan telefon",
    "Jangan masukkan kata laluan atau OTP",
    "Hubungi keluarga (guna telefon lain)",
    "Hubungi bank (guna nombor rasmi)",
    "Lapor kepada polis atau talian anti-penipuan"
  ] : [
    "Turn on airplane mode immediately",
    "Power off your phone",
    "Don't enter passwords or OTPs",
    "Call trusted family (use another phone)",
    "Contact your bank (use official number)",
    "Report to police or anti-scam helpline"
  ];

  const handleShare = () => {
    const text = language === 'zh'
      ? "紧急情况下的重要号码：\n999 - 警察紧急热线\n1800-722-6688 - 反诈骗热线"
      : language === 'ms'
      ? "Nombor penting untuk kecemasan:\n999 - Polis Kecemasan\n1800-722-6688 - Talian Anti-Penipuan"
      : "Important numbers for emergencies:\n999 - Police Emergency\n1800-722-6688 - Anti-Scam Helpline";
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    
    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        window.open(whatsappUrl, '_blank');
      });
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
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
          {language === 'zh' ? '紧急求助热线' : language === 'ms' ? 'Talian Bantuan Kecemasan' : 'Emergency Help Lines'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '需要帮助时立即联系' : language === 'ms' ? 'Hubungi segera jika perlukan bantuan' : 'Contact immediately when you need help'}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'zh' ? '紧急联系方式' : language === 'ms' ? 'Hubungan Kecemasan' : 'Emergency Contacts'}
          </h2>
          <div className="space-y-4">
            <EmergencyButton
              number="999"
              label={language === 'zh' ? '警察紧急热线' : language === 'ms' ? 'Polis Kecemasan' : 'Police Emergency'}
              description={language === 'zh' ? '紧急情况下的即时援助' : language === 'ms' ? 'Bantuan segera untuk kecemasan' : 'Immediate assistance for emergencies'}
              testId="button-call-999"
            />
            <EmergencyButton
              number="1800-722-6688"
              label={language === 'zh' ? '反诈骗热线' : language === 'ms' ? 'Talian Anti-Penipuan' : 'Anti-Scam Helpline'}
              description={language === 'zh' ? '报告诈骗和获取建议' : language === 'ms' ? 'Laporkan penipuan dan dapatkan nasihat' : 'Report scams and get advice'}
              testId="button-call-scam-helpline"
            />
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              {language === 'zh' ? '紧急情况' : language === 'ms' ? 'Kecemasan' : 'EMERGENCY'}
            </Badge>
          </div>
          <h3 className="text-xl font-semibold mb-3">
            {language === 'zh' ? '如果您的手机正在被远程控制' : language === 'ms' ? 'Jika telefon anda sedang dikawal dari jauh' : 'If your phone is being controlled right now'}
          </h3>
          <div className="space-y-3">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  {idx + 1}
                </div>
                <p className="text-lg flex-1 pt-1">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-4">
          <Button
            data-testid="button-share-helplines"
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="flex-1 gap-2"
          >
            <Share2 className="w-5 h-5" />
            {language === 'zh' ? '分享给照顾者' : language === 'ms' ? 'Kongsi dengan Penjaga' : 'Share with Caregiver'}
          </Button>
          <Button
            data-testid="button-official-resources"
            variant="outline"
            size="lg"
            onClick={() => window.open('https://www.scamshield.gov.sg', '_blank')}
            className="flex-1 gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            {language === 'zh' ? '官方资源' : language === 'ms' ? 'Sumber Rasmi' : 'Official Resources'}
          </Button>
        </div>
      </div>
    </div>
  );
}
