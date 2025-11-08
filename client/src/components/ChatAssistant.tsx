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
    
    if (lowerInput.includes('government') || lowerInput.includes('police') || lowerInput.includes('政府') || lowerInput.includes('警察') || lowerInput.includes('kerajaan') || lowerInput.includes('polis')) {
      return getText(chatbotResponses.government_scam, language);
    }
    if (lowerInput.includes('otp') || lowerInput.includes('验证码') || lowerInput.includes('code') || lowerInput.includes('password') || lowerInput.includes('kod')) {
      return getText(chatbotResponses.otp_safety, language);
    }
    if (lowerInput.includes('link') || lowerInput.includes('sms') || lowerInput.includes('链接') || lowerInput.includes('短信') || lowerInput.includes('pautan') || lowerInput.includes('message')) {
      return getText(chatbotResponses.suspicious_link, language);
    }
    if (lowerInput.includes('remote') || lowerInput.includes('control') || lowerInput.includes('远程') || lowerInput.includes('控制') || lowerInput.includes('kawalan') || lowerInput.includes('jauh')) {
      return getText(chatbotResponses.remote_control, language);
    }
    if (lowerInput.includes('report') || lowerInput.includes('举报') || lowerInput.includes('报告') || lowerInput.includes('lapor') || lowerInput.includes('help')) {
      return getText(chatbotResponses.report_scam, language);
    }
    
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
