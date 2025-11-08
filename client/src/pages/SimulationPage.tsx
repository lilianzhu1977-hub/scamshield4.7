
import { Button } from "@/components/ui/button";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StepType = 'sms' | 'call' | 'app' | 'otp' | 'bank' | 'result';

interface SimulationStep {
  id: string;
  type: StepType;
  title: string;
  description: string;
  sender?: string;
  caller?: string;
  callerName?: string;
  appName?: string;
  message: string;
  otpCode?: string;
  choices?: {
    text: string;
    nextStep: string;
  }[];
  resultType?: 'scammed' | 'safe';
  resultMessage?: string;
}

export default function SimulationPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const [currentStepId, setCurrentStepId] = useState('start');
  const [visitedSteps, setVisitedSteps] = useState<string[]>(['start']);
  const [userPath, setUserPath] = useState<string[]>([]);

  const stepsEN: Record<string, SimulationStep> = {
    start: {
      id: 'start',
      type: 'sms',
      title: "Suspicious SMS Received",
      description: "You receive an SMS claiming to be from DBS Bank",
      sender: "DBS Bank",
      message: "URGENT: Unusual activity detected on your account. Click here to verify immediately: http://dbs-verify.com/secure or your account will be locked in 24 hours.",
      choices: [
        { text: "Click the link immediately", nextStep: 'clicked_link' },
        { text: "Ignore and delete the message", nextStep: 'safe_ignore' },
        { text: "Call DBS official hotline to verify", nextStep: 'safe_verify' }
      ]
    },
    clicked_link: {
      id: 'clicked_link',
      type: 'app',
      title: "Fake Website Loaded",
      description: "The link opens a website that looks like DBS",
      appName: "DBS Banking Portal",
      message: "Please enter your username and password to verify your account.",
      choices: [
        { text: "Enter my login details", nextStep: 'entered_credentials' },
        { text: "Close the page - looks suspicious", nextStep: 'safe_closed' },
        { text: "Check the URL carefully", nextStep: 'safe_url_check' }
      ]
    },
    entered_credentials: {
      id: 'entered_credentials',
      type: 'otp',
      title: "OTP Request",
      description: "After entering details, you receive an OTP from the real bank",
      sender: "DBS Bank",
      message: "The fake site now asks: 'Please enter the 6-digit OTP sent to your phone to complete verification.'",
      otpCode: "847293",
      choices: [
        { text: "Enter the OTP code", nextStep: 'scammed_otp' },
        { text: "Stop and call the bank", nextStep: 'safe_stopped' },
        { text: "Close everything and report", nextStep: 'safe_report' }
      ]
    },
    scammed_otp: {
      id: 'scammed_otp',
      type: 'result',
      title: "You've Been Scammed!",
      description: "What happened",
      message: "By giving your credentials and OTP, scammers now have full access to your bank account. They can transfer all your money immediately. The real bank will never ask for your OTP!",
      resultType: 'scammed',
      resultMessage: "Never share your OTP with anyone, even if they claim to be from your bank!"
    },
    safe_ignore: {
      id: 'safe_ignore',
      type: 'result',
      title: "You Stayed Safe!",
      description: "Good decision",
      message: "By ignoring the suspicious message, you avoided the scam. Banks will never send urgent links via SMS. Always verify through official channels.",
      resultType: 'safe',
      resultMessage: "When in doubt, ignore suspicious messages!"
    },
    safe_verify: {
      id: 'safe_verify',
      type: 'call',
      title: "Calling Official Hotline",
      description: "You called DBS at 1800-111-1111",
      caller: "1800-111-1111",
      callerName: "DBS Customer Service",
      message: "'Thank you for calling DBS. We did NOT send any SMS about account verification. This is a scam attempt. Your account is safe.'",
      choices: [
        { text: "Report the scam SMS", nextStep: 'safe_report' },
        { text: "Thank them and hang up", nextStep: 'safe_confirmed' }
      ]
    },
    safe_closed: {
      id: 'safe_closed',
      type: 'result',
      title: "You Stayed Safe!",
      description: "Smart move",
      message: "You recognized something was wrong and closed the page before giving any information. Trust your instincts!",
      resultType: 'safe',
      resultMessage: "If something feels wrong, stop immediately!"
    },
    safe_url_check: {
      id: 'safe_url_check',
      type: 'app',
      title: "URL Inspection",
      description: "You carefully check the website address",
      appName: "Browser Address Bar",
      message: "The URL shows: http://dbs-verify.com/secure - The real DBS website is: https://www.dbs.com.sg (notice the difference!)",
      choices: [
        { text: "Close this fake site", nextStep: 'safe_confirmed' },
        { text: "Continue anyway", nextStep: 'entered_credentials' }
      ]
    },
    safe_stopped: {
      id: 'safe_stopped',
      type: 'result',
      title: "You Stopped in Time!",
      description: "Crisis averted",
      message: "Even though you gave your login details, you stopped before giving the OTP. Contact your bank immediately to change your password. You avoided losing money!",
      resultType: 'safe',
      resultMessage: "It's never too late to stop and verify!"
    },
    safe_report: {
      id: 'safe_report',
      type: 'result',
      title: "Excellent Job!",
      description: "You're a scam fighter",
      message: "Not only did you avoid the scam, you also reported it to help protect others. The authorities can track down these scammers thanks to people like you!",
      resultType: 'safe',
      resultMessage: "Reporting scams helps protect the whole community!"
    },
    safe_confirmed: {
      id: 'safe_confirmed',
      type: 'result',
      title: "You Stayed Safe!",
      description: "Well done",
      message: "You verified through official channels and confirmed this was a scam. Your vigilance protected your account and money!",
      resultType: 'safe',
      resultMessage: "Always verify suspicious messages through official channels!"
    }
  };

  const stepsZH: Record<string, SimulationStep> = {
    start: {
      id: 'start',
      type: 'sms',
      title: "收到可疑短信",
      description: "你收到一条声称来自星展银行的短信",
      sender: "星展银行",
      message: "紧急：检测到您的账户有异常活动。请立即点击链接验证：http://dbs-verify.com/secure 否则您的账户将在24小时内被锁定。",
      choices: [
        { text: "立即点击链接", nextStep: 'clicked_link' },
        { text: "忽略并删除信息", nextStep: 'safe_ignore' },
        { text: "致电星展官方热线核实", nextStep: 'safe_verify' }
      ]
    },
    clicked_link: {
      id: 'clicked_link',
      type: 'app',
      title: "假网站加载完成",
      description: "链接打开了一个看起来像星展的网站",
      appName: "星展银行门户",
      message: "请输入您的用户名和密码以验证您的账户。",
      choices: [
        { text: "输入我的登录详情", nextStep: 'entered_credentials' },
        { text: "关闭页面 - 看起来可疑", nextStep: 'safe_closed' },
        { text: "仔细检查网址", nextStep: 'safe_url_check' }
      ]
    },
    entered_credentials: {
      id: 'entered_credentials',
      type: 'otp',
      title: "验证码请求",
      description: "输入详情后，你收到真实银行发来的验证码",
      sender: "星展银行",
      message: "假网站现在要求：'请输入发送到您手机的6位验证码以完成验证。'",
      otpCode: "847293",
      choices: [
        { text: "输入验证码", nextStep: 'scammed_otp' },
        { text: "停止并致电银行", nextStep: 'safe_stopped' },
        { text: "关闭所有并报告", nextStep: 'safe_report' }
      ]
    },
    scammed_otp: {
      id: 'scammed_otp',
      type: 'result',
      title: "你被骗了！",
      description: "发生了什么",
      message: "通过提供你的凭证和验证码，骗子现在可以完全访问你的银行账户。他们可以立即转走你所有的钱。真正的银行永远不会要求你的验证码！",
      resultType: 'scammed',
      resultMessage: "永远不要与任何人分享你的验证码，即使他们声称来自你的银行！"
    },
    safe_ignore: {
      id: 'safe_ignore',
      type: 'result',
      title: "你保持安全！",
      description: "好决定",
      message: "通过忽略可疑信息，你避免了诈骗。银行永远不会通过短信发送紧急链接。始终通过官方渠道验证。",
      resultType: 'safe',
      resultMessage: "有疑问时，忽略可疑信息！"
    },
    safe_verify: {
      id: 'safe_verify',
      type: 'call',
      title: "致电官方热线",
      description: "你拨打了星展银行1800-111-1111",
      caller: "1800-111-1111",
      callerName: "星展客户服务",
      message: "'感谢致电星展。我们没有发送任何关于账户验证的短信。这是诈骗企图。您的账户是安全的。'",
      choices: [
        { text: "报告诈骗短信", nextStep: 'safe_report' },
        { text: "感谢并挂断", nextStep: 'safe_confirmed' }
      ]
    },
    safe_closed: {
      id: 'safe_closed',
      type: 'result',
      title: "你保持安全！",
      description: "聪明的举动",
      message: "你意识到有问题并在提供任何信息之前关闭了页面。相信你的直觉！",
      resultType: 'safe',
      resultMessage: "如果感觉不对，立即停止！"
    },
    safe_url_check: {
      id: 'safe_url_check',
      type: 'app',
      title: "网址检查",
      description: "你仔细检查网站地址",
      appName: "浏览器地址栏",
      message: "网址显示：http://dbs-verify.com/secure - 真正的星展网站是：https://www.dbs.com.sg（注意区别！）",
      choices: [
        { text: "关闭这个假网站", nextStep: 'safe_confirmed' },
        { text: "无论如何继续", nextStep: 'entered_credentials' }
      ]
    },
    safe_stopped: {
      id: 'safe_stopped',
      type: 'result',
      title: "你及时停止了！",
      description: "危机避免",
      message: "虽然你给了登录详情，但你在给验证码之前停止了。立即联系你的银行更改密码。你避免了损失金钱！",
      resultType: 'safe',
      resultMessage: "停止和验证永远不会太晚！"
    },
    safe_report: {
      id: 'safe_report',
      type: 'result',
      title: "干得好！",
      description: "你是反诈骗战士",
      message: "你不仅避免了诈骗，还报告了它以帮助保护他人。多亏了像你这样的人，当局可以追踪这些骗子！",
      resultType: 'safe',
      resultMessage: "报告诈骗有助于保护整个社区！"
    },
    safe_confirmed: {
      id: 'safe_confirmed',
      type: 'result',
      title: "你保持安全！",
      description: "做得好",
      message: "你通过官方渠道核实并确认这是诈骗。你的警惕保护了你的账户和金钱！",
      resultType: 'safe',
      resultMessage: "始终通过官方渠道验证可疑信息！"
    }
  };

  const stepsMS: Record<string, SimulationStep> = {
    start: {
      id: 'start',
      type: 'sms',
      title: "Terima SMS Mencurigakan",
      description: "Anda terima SMS yang mendakwa dari DBS Bank",
      sender: "DBS Bank",
      message: "SEGERA: Aktiviti luar biasa dikesan pada akaun anda. Klik di sini untuk sahkan: http://dbs-verify.com/secure atau akaun anda akan dikunci dalam 24 jam.",
      choices: [
        { text: "Klik pautan segera", nextStep: 'clicked_link' },
        { text: "Abaikan dan hapus mesej", nextStep: 'safe_ignore' },
        { text: "Hubungi talian rasmi DBS", nextStep: 'safe_verify' }
      ]
    },
    clicked_link: {
      id: 'clicked_link',
      type: 'app',
      title: "Laman Web Palsu Dimuatkan",
      description: "Pautan membuka laman web yang kelihatan seperti DBS",
      appName: "Portal Perbankan DBS",
      message: "Sila masukkan nama pengguna dan kata laluan untuk sahkan akaun anda.",
      choices: [
        { text: "Masukkan butiran login saya", nextStep: 'entered_credentials' },
        { text: "Tutup halaman - nampak mencurigakan", nextStep: 'safe_closed' },
        { text: "Periksa URL dengan teliti", nextStep: 'safe_url_check' }
      ]
    },
    entered_credentials: {
      id: 'entered_credentials',
      type: 'otp',
      title: "Permintaan OTP",
      description: "Selepas masukkan butiran, anda terima OTP dari bank sebenar",
      sender: "DBS Bank",
      message: "Laman palsu kini minta: 'Sila masukkan kod OTP 6 digit yang dihantar ke telefon anda untuk lengkapkan pengesahan.'",
      otpCode: "847293",
      choices: [
        { text: "Masukkan kod OTP", nextStep: 'scammed_otp' },
        { text: "Berhenti dan hubungi bank", nextStep: 'safe_stopped' },
        { text: "Tutup semua dan laporkan", nextStep: 'safe_report' }
      ]
    },
    scammed_otp: {
      id: 'scammed_otp',
      type: 'result',
      title: "Anda Telah Ditipu!",
      description: "Apa yang berlaku",
      message: "Dengan memberikan kelayakan dan OTP anda, penipu kini mempunyai akses penuh ke akaun bank anda. Mereka boleh memindahkan semua wang anda dengan segera. Bank sebenar tidak akan meminta OTP anda!",
      resultType: 'scammed',
      resultMessage: "Jangan kongsikan OTP anda dengan sesiapa, walaupun mereka mendakwa dari bank anda!"
    },
    safe_ignore: {
      id: 'safe_ignore',
      type: 'result',
      title: "Anda Kekal Selamat!",
      description: "Keputusan baik",
      message: "Dengan mengabaikan mesej mencurigakan, anda elakkan penipuan. Bank tidak akan hantar pautan segera melalui SMS. Sentiasa sahkan melalui saluran rasmi.",
      resultType: 'safe',
      resultMessage: "Bila ragu-ragu, abaikan mesej mencurigakan!"
    },
    safe_verify: {
      id: 'safe_verify',
      type: 'call',
      title: "Menghubungi Talian Rasmi",
      description: "Anda hubungi DBS di 1800-111-1111",
      caller: "1800-111-1111",
      callerName: "Perkhidmatan Pelanggan DBS",
      message: "'Terima kasih hubungi DBS. Kami TIDAK hantar SMS tentang pengesahan akaun. Ini adalah cubaan penipuan. Akaun anda selamat.'",
      choices: [
        { text: "Laporkan SMS penipuan", nextStep: 'safe_report' },
        { text: "Terima kasih dan tutup telefon", nextStep: 'safe_confirmed' }
      ]
    },
    safe_closed: {
      id: 'safe_closed',
      type: 'result',
      title: "Anda Kekal Selamat!",
      description: "Langkah bijak",
      message: "Anda sedar ada yang tidak kena dan tutup halaman sebelum beri maklumat. Percayai naluri anda!",
      resultType: 'safe',
      resultMessage: "Jika rasa tidak betul, henti segera!"
    },
    safe_url_check: {
      id: 'safe_url_check',
      type: 'app',
      title: "Pemeriksaan URL",
      description: "Anda periksa alamat laman web dengan teliti",
      appName: "Bar Alamat Pelayar",
      message: "URL tunjuk: http://dbs-verify.com/secure - Laman web DBS sebenar: https://www.dbs.com.sg (perhatikan perbezaan!)",
      choices: [
        { text: "Tutup laman palsu ini", nextStep: 'safe_confirmed' },
        { text: "Teruskan juga", nextStep: 'entered_credentials' }
      ]
    },
    safe_stopped: {
      id: 'safe_stopped',
      type: 'result',
      title: "Anda Berhenti Tepat Masa!",
      description: "Krisis dielakkan",
      message: "Walaupun anda beri butiran login, anda berhenti sebelum beri OTP. Hubungi bank segera untuk tukar kata laluan. Anda elak kehilangan wang!",
      resultType: 'safe',
      resultMessage: "Tidak pernah terlambat untuk berhenti dan sahkan!"
    },
    safe_report: {
      id: 'safe_report',
      type: 'result',
      title: "Kerja Bagus!",
      description: "Anda pejuang anti-penipuan",
      message: "Bukan sahaja anda elak penipuan, anda juga laporkannya untuk lindungi orang lain. Pihak berkuasa boleh kesan penipu ini terima kasih kepada orang seperti anda!",
      resultType: 'safe',
      resultMessage: "Melaporkan penipuan membantu lindungi seluruh komuniti!"
    },
    safe_confirmed: {
      id: 'safe_confirmed',
      type: 'result',
      title: "Anda Kekal Selamat!",
      description: "Bagus",
      message: "Anda sahkan melalui saluran rasmi dan pastikan ini penipuan. Kewaspadaan anda lindungi akaun dan wang anda!",
      resultType: 'safe',
      resultMessage: "Sentiasa sahkan mesej mencurigakan melalui saluran rasmi!"
    }
  };

  const steps = language === 'zh' ? stepsZH : language === 'ms' ? stepsMS : stepsEN;
  const currentStep = steps[currentStepId];

  const handleChoice = (nextStepId: string) => {
    setCurrentStepId(nextStepId);
    setVisitedSteps([...visitedSteps, nextStepId]);
    setUserPath([...userPath, nextStepId]);
  };

  const handleRestart = () => {
    setCurrentStepId('start');
    setVisitedSteps(['start']);
    setUserPath([]);
  };

  const progress = (visitedSteps.length / Object.keys(steps).length) * 100;

  if (currentStep.type === 'result') {
    const isScammed = currentStep.resultType === 'scammed';
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className={`p-12 text-center ${isScammed ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
          <div className="text-8xl mb-6">{isScammed ? '⚠️' : '🛡️'}</div>
          <h1 className="text-4xl font-bold mb-4">{currentStep.title}</h1>
          <p className="text-xl font-semibold mb-4">{currentStep.description}</p>
          <Card className="p-6 mb-6 bg-white">
            <p className="text-lg mb-4">{currentStep.message}</p>
            <div className={`p-4 rounded-lg ${isScammed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              <p className="font-semibold text-lg">{currentStep.resultMessage}</p>
            </div>
          </Card>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={handleRestart} className="gap-2">
              <RotateCcw className="w-5 h-5" />
              {language === 'zh' ? '重新开始' : language === 'ms' ? 'Cuba Lagi' : 'Try Again'}
            </Button>
            <Button size="lg" variant="outline" onClick={() => setLocation('/')}>
              {language === 'zh' ? '返回主页' : language === 'ms' ? 'Kembali' : 'Go Home'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto mb-8">
        <Button variant="ghost" onClick={() => setLocation('/')} className="mb-4">
          <ChevronLeft className="w-5 h-5 mr-2" />
          {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
        </Button>
        <h1 className="text-4xl font-bold mb-2">
          {language === 'zh' ? '真实场景模拟' : language === 'ms' ? 'Simulasi Senario Sebenar' : 'Real Scam Simulation'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '你的每个选择都很重要' : language === 'ms' ? 'Setiap pilihan anda penting' : 'Every choice matters'}
        </p>
      </div>

      <Progress value={progress} className="mb-6 h-2 max-w-4xl mx-auto" />

      <div className="max-w-md mx-auto">
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>
          
          <div className="bg-white rounded-[2.5rem] overflow-hidden min-h-[600px]">
            <div className="bg-gray-100 px-6 py-2 flex justify-between items-center text-xs">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>📶</span>
                <span>📡</span>
                <span>🔋</span>
              </div>
            </div>

            <div className="p-6">
              {currentStep.type === 'sms' && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">💬</div>
                    <h3 className="font-semibold text-lg">{currentStep.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentStep.description}</p>
                  </div>
                  
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                        {currentStep.sender![0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{currentStep.sender}</div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-3 text-sm">
                          {currentStep.message}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Just now</div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {currentStep.type === 'call' && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2 animate-pulse">📞</div>
                    <h3 className="font-semibold text-lg">{currentStep.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentStep.description}</p>
                  </div>
                  
                  <Card className="p-6 text-center space-y-4">
                    <div className="text-xl font-semibold">{currentStep.callerName}</div>
                    <div className="text-muted-foreground">{currentStep.caller}</div>
                    <div className="bg-muted p-4 rounded-lg text-sm italic">
                      {currentStep.message}
                    </div>
                  </Card>
                </div>
              )}

              {currentStep.type === 'app' && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">⚠️</div>
                    <h3 className="font-semibold text-lg">{currentStep.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentStep.description}</p>
                  </div>
                  
                  <Card className="p-6 text-center space-y-4 border-red-300 bg-red-50">
                    <div className="text-4xl">🏦</div>
                    <div className="text-xl font-bold">{currentStep.appName}</div>
                    <div className="text-sm bg-white p-4 rounded-lg">{currentStep.message}</div>
                  </Card>
                </div>
              )}

              {currentStep.type === 'otp' && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">🔢</div>
                    <h3 className="font-semibold text-lg">{currentStep.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentStep.description}</p>
                  </div>
                  
                  <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
                    <div className="text-xs text-muted-foreground mb-2">SMS from Bank</div>
                    <div className="font-mono text-2xl font-bold text-center tracking-widest">
                      {currentStep.otpCode}
                    </div>
                    <div className="text-xs text-center text-muted-foreground mt-2">
                      {language === 'zh' ? '验证码5分钟内有效' : language === 'ms' ? 'Kod sah 5 minit' : 'Code valid for 5 minutes'}
                    </div>
                  </Card>

                  <Card className="p-4 bg-yellow-50 border-yellow-300">
                    <div className="text-sm italic">
                      {currentStep.message}
                    </div>
                  </Card>
                </div>
              )}

              <div className="mt-8 space-y-3">
                <div className="text-sm font-semibold mb-3">
                  {language === 'zh' ? '你会怎么做？' : language === 'ms' ? 'Apa yang anda akan buat?' : 'What will you do?'}
                </div>
                {currentStep.choices?.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice.nextStep)}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 hover:bg-primary hover:text-primary-foreground"
                    size="lg"
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
