import { Button } from "@/components/ui/button";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useLocation } from "wouter";
import SimulationPanel from "@/components/SimulationPanel";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card } from "@/components/ui/card";

export default function SimulationPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = language === 'zh' ? [
    {
      title: "诈骗者获取您的号码",
      description: "诈骗者从数据泄露或社交媒体获取您的电话号码和基本信息。",
      visual: "📱"
    },
    {
      title: "发送虚假消息",
      description: "诈骗者发送看似来自银行或政府机构的消息，声称需要紧急验证账户。",
      visual: "💬"
    },
    {
      title: "诱骗点击链接",
      description: "消息包含一个看起来真实的链接，但实际上会下载恶意软件到您的手机。",
      visual: "🔗"
    },
    {
      title: "安装虚假应用",
      description: "诈骗者诱导您安装一个看起来像银行应用的恶意程序。",
      visual: "📲"
    },
    {
      title: "查看您的联系人",
      description: "恶意软件现在可以访问您的联系人列表和消息记录。",
      visual: "📇"
    },
    {
      title: "假装是家人或银行",
      description: "诈骗者使用您的信息假装是您的家人或银行工作人员来建立信任。",
      visual: "👤"
    },
    {
      title: "索要验证码",
      description: "诈骗者要求您提供手机收到的验证码（OTP），声称是为了安全验证。",
      visual: "🔢"
    },
    {
      title: "盗取资金",
      description: "有了验证码，诈骗者可以访问您的账户并转走资金。",
      visual: "💸"
    }
  ] : language === 'ms' ? [
    {
      title: "Penipu Dapatkan Nombor Anda",
      description: "Penipu mendapat nombor telefon dan maklumat asas anda dari kebocoran data atau media sosial.",
      visual: "📱"
    },
    {
      title: "Hantar Mesej Palsu",
      description: "Penipu menghantar mesej yang kelihatan dari bank atau agensi kerajaan, mendakwa perlu pengesahan akaun segera.",
      visual: "💬"
    },
    {
      title: "Tipu untuk Klik Pautan",
      description: "Mesej mengandungi pautan yang kelihatan sahih tetapi sebenarnya akan muat turun perisian hasad ke telefon anda.",
      visual: "🔗"
    },
    {
      title: "Pasang Aplikasi Palsu",
      description: "Penipu memujuk anda memasang program berniat jahat yang kelihatan seperti aplikasi bank.",
      visual: "📲"
    },
    {
      title: "Lihat Kenalan Anda",
      description: "Perisian hasad kini boleh akses senarai kenalan dan rekod mesej anda.",
      visual: "📇"
    },
    {
      title: "Pura-pura Jadi Keluarga atau Bank",
      description: "Penipu gunakan maklumat anda untuk berpura-pura jadi ahli keluarga atau pekerja bank untuk bina kepercayaan.",
      visual: "👤"
    },
    {
      title: "Minta Kod Pengesahan",
      description: "Penipu minta anda berikan kod pengesahan (OTP) yang diterima, mendakwa untuk pengesahan keselamatan.",
      visual: "🔢"
    },
    {
      title: "Curi Wang",
      description: "Dengan kod pengesahan, penipu boleh akses akaun anda dan pindahkan wang.",
      visual: "💸"
    }
  ] : [
    {
      title: "Scammer Gets Your Number",
      description: "Scammers obtain your phone number and basic information from data breaches or social media.",
      visual: "📱"
    },
    {
      title: "Sends Fake Message",
      description: "Scammer sends a message that appears to be from your bank or government agency, claiming urgent account verification needed.",
      visual: "💬"
    },
    {
      title: "Tricks You to Click Link",
      description: "The message contains a link that looks real but actually downloads malware to your phone.",
      visual: "🔗"
    },
    {
      title: "Installs Fake App",
      description: "Scammer persuades you to install a malicious program disguised as a banking app.",
      visual: "📲"
    },
    {
      title: "Views Your Contacts",
      description: "The malware can now access your contact list and message history.",
      visual: "📇"
    },
    {
      title: "Pretends to Be Family or Bank",
      description: "Scammer uses your information to impersonate your family members or bank staff to build trust.",
      visual: "👤"
    },
    {
      title: "Asks for OTP",
      description: "Scammer requests you provide the verification code (OTP) received on your phone, claiming it's for security verification.",
      visual: "🔢"
    },
    {
      title: "Steals Money",
      description: "With the OTP, the scammer can access your account and transfer funds away.",
      visual: "💸"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <div className="text-8xl mb-6">🛡️</div>
          <h1 className="text-4xl font-bold mb-4">
            {language === 'zh' ? '现在您知道了！' : language === 'ms' ? 'Sekarang Anda Tahu!' : 'Now You Know!'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {language === 'zh' 
              ? '这就是诈骗者的手法。记住这些红色警示：虚假应用、弹出窗口、验证码请求。'
              : language === 'ms'
              ? 'Inilah cara penipu bekerja. Ingat tanda amaran ini: aplikasi palsu, pop-up, permintaan OTP.'
              : 'This is how scammers work. Remember these red flags: fake apps, pop-ups, OTP requests.'}
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button
              data-testid="button-restart-simulation"
              size="lg"
              onClick={handleRestart}
              className="gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              {language === 'zh' ? '重新开始' : language === 'ms' ? 'Mula Semula' : 'Start Over'}
            </Button>
            <Button
              data-testid="button-goto-tips"
              size="lg"
              variant="outline"
              onClick={() => setLocation('/tips')}
            >
              {language === 'zh' ? '查看安全提示' : language === 'ms' ? 'Lihat Petua Keselamatan' : 'View Safety Tips'}
            </Button>
            <Button
              data-testid="button-goto-helplines"
              size="lg"
              variant="outline"
              onClick={() => setLocation('/helplines')}
            >
              {language === 'zh' ? '求助热线' : language === 'ms' ? 'Talian Bantuan' : 'Help Lines'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto mb-8">
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
          {language === 'zh' ? '诈骗者视角模拟' : language === 'ms' ? 'Simulasi Pandangan Penipu' : 'A Day in the Scammer\'s Screen'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '了解诈骗者如何思考 - 安全且合乎道德' : language === 'ms' ? 'Fahami cara penipu berfikir - dengan selamat dan beretika' : 'Understand how scammers think - safely and ethically'}
        </p>
      </div>

      <SimulationPanel
        currentStep={currentStep}
        totalSteps={steps.length}
        title={steps[currentStep].title}
        description={steps[currentStep].description}
        visual={steps[currentStep].visual}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={true}
        canGoPrevious={currentStep > 0}
      />
    </div>
  );
}
