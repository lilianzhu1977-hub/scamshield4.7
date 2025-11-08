import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  const { language } = useApp();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: language === 'zh' ? '你好！我是阿信小助手。有什么我可以帮你的吗？' : language === 'ms' ? 'Hello! Saya A-Xin. Apa yang boleh saya bantu?' : 'Hello! I\'m A-Xin, your scam prevention assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    
    setTimeout(() => {
      const responses = language === 'zh' 
        ? ['我明白了。请记住：政府部门永远不会通过电话要求你转账。', '这很重要。如果你怀疑是诈骗，请立即挂断电话并拨打官方热线。']
        : language === 'ms'
        ? ['Saya faham. Ingat: Agensi kerajaan tidak akan meminta wang melalui telefon.', 'Penting untuk diingat. Jika anda syak penipuan, tutup telefon dan hubungi talian rasmi.']
        : ['I understand. Remember: Government agencies never ask for money over the phone.', 'That\'s important to know. If you suspect a scam, hang up and call official hotlines.'];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', text: randomResponse }]);
    }, 1000);

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
