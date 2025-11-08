import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { chatbotResponses } from "@shared/data/content";
import { getText } from "@/lib/translations";

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  const { language } = useApp();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      text: getText(chatbotResponses.greeting, language)
    }]);
  }, [language]);

  const getResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for greetings
    if (lowerInput.match(/^(hi|hello|hey|你好|嗨|哈喽|hai|helo)$/i)) {
      return getText(chatbotResponses.greeting, language);
    }
    
    // Check for thanks
    if (lowerInput.includes('thank') || lowerInput.includes('谢谢') || lowerInput.includes('感谢') || lowerInput.includes('terima kasih')) {
      const responses = {
        en: "You're welcome! Stay safe and feel free to ask if you have more questions about scam prevention.",
        zh: "不客气！保持警惕，如果您有更多关于防诈骗的问题，请随时询问。",
        ms: "Sama-sama! Kekal berwaspada dan tanya lagi jika ada soalan tentang pencegahan penipuan."
      };
      return responses[language];
    }
    
    // Government/Police scams
    if (lowerInput.includes('government') || lowerInput.includes('police') || lowerInput.includes('政府') || lowerInput.includes('警察') || lowerInput.includes('kerajaan') || lowerInput.includes('polis') || lowerInput.includes('officer') || lowerInput.includes('官员')) {
      return getText(chatbotResponses.government_scam, language);
    }
    
    // OTP and password safety
    if (lowerInput.includes('otp') || lowerInput.includes('验证码') || lowerInput.includes('code') || lowerInput.includes('password') || lowerInput.includes('kod') || lowerInput.includes('密码') || lowerInput.includes('kata laluan') || lowerInput.includes('pin')) {
      return getText(chatbotResponses.otp_safety, language);
    }
    
    // Suspicious links and messages
    if (lowerInput.includes('link') || lowerInput.includes('sms') || lowerInput.includes('链接') || lowerInput.includes('短信') || lowerInput.includes('pautan') || lowerInput.includes('message') || lowerInput.includes('url') || lowerInput.includes('click') || lowerInput.includes('点击')) {
      return getText(chatbotResponses.suspicious_link, language);
    }
    
    // Remote control/access
    if (lowerInput.includes('remote') || lowerInput.includes('control') || lowerInput.includes('远程') || lowerInput.includes('控制') || lowerInput.includes('kawalan') || lowerInput.includes('jauh') || lowerInput.includes('access') || lowerInput.includes('anydesk') || lowerInput.includes('teamviewer')) {
      return getText(chatbotResponses.remote_control, language);
    }
    
    // Money/payment related
    if (lowerInput.includes('money') || lowerInput.includes('pay') || lowerInput.includes('transfer') || lowerInput.includes('bank') || lowerInput.includes('钱') || lowerInput.includes('支付') || lowerInput.includes('转账') || lowerInput.includes('银行') || lowerInput.includes('wang') || lowerInput.includes('bayar')) {
      const responses = {
        en: "Never send money to unknown people or click suspicious payment links. Legitimate organizations will never pressure you to make immediate payments. If in doubt, verify through official channels first.",
        zh: "永远不要向陌生人转账或点击可疑的支付链接。正规机构不会催促您立即付款。如有疑问，请先通过官方渠道核实。",
        ms: "Jangan hantar wang kepada orang yang tidak dikenali atau klik pautan bayaran yang mencurigakan. Organisasi sah tidak akan mendesak anda membuat bayaran segera. Jika ragu, sahkan melalui saluran rasmi dahulu."
      };
      return responses[language];
    }
    
    // Reporting scams
    if (lowerInput.includes('report') || lowerInput.includes('举报') || lowerInput.includes('报告') || lowerInput.includes('lapor') || lowerInput.includes('help')) {
      return getText(chatbotResponses.report_scam, language);
    }
    
    // Phone call scams
    if (lowerInput.includes('call') || lowerInput.includes('phone') || lowerInput.includes('电话') || lowerInput.includes('来电') || lowerInput.includes('telefon') || lowerInput.includes('panggilan')) {
      const responses = {
        en: "Be cautious of unexpected calls claiming to be from banks, government agencies, or companies. Never share personal information over the phone. Hang up and call the official number to verify.",
        zh: "警惕声称来自银行、政府机构或公司的意外来电。切勿通过电话分享个人信息。挂断电话并拨打官方号码进行核实。",
        ms: "Berwaspada terhadap panggilan tidak dijangka yang mendakwa dari bank, agensi kerajaan atau syarikat. Jangan kongsi maklumat peribadi melalui telefon. Tutup dan hubungi nombor rasmi untuk pengesahan."
      };
      return responses[language];
    }
    
    // Learning about scams
    if (lowerInput.includes('learn') || lowerInput.includes('how') || lowerInput.includes('what') || lowerInput.includes('学习') || lowerInput.includes('怎么') || lowerInput.includes('什么') || lowerInput.includes('belajar') || lowerInput.includes('bagaimana') || lowerInput.includes('apa')) {
      const responses = {
        en: "Great question! You can explore our Learn section to understand different scam types, watch educational videos, or try our interactive simulation to practice identifying scams. What would you like to know more about?",
        zh: "好问题！您可以浏览我们的学习部分了解不同类型的诈骗，观看教育视频，或尝试我们的互动模拟来练习识别诈骗。您想了解更多关于什么的信息？",
        ms: "Soalan bagus! Anda boleh terokai bahagian Belajar kami untuk memahami jenis penipuan yang berbeza, tonton video pendidikan, atau cuba simulasi interaktif kami untuk berlatih mengenal pasti penipuan. Apa yang ingin anda ketahui lebih lanjut?"
      };
      return responses[language];
    }
    
    // Default response with helpful suggestions
    return getText(chatbotResponses.default, language);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    
    setTimeout(() => {
      const response = getResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 800);

    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-full max-w-md z-50">
      <Card className="flex flex-col h-[500px]">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">A-Xin Assistant</h3>
              <p className="text-xs text-muted-foreground">阿信小助手</p>
            </div>
          </div>
          <Button
            data-testid="button-close-chat"
            size="icon"
            variant="ghost"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              data-testid="input-chat-message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'zh' ? '输入您的问题...' : language === 'ms' ? 'Tulis soalan anda...' : 'Type your question...'}
              className="flex-1"
            />
            <Button
              data-testid="button-send-message"
              size="icon"
              onClick={handleSend}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
