import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useApp } from "@/contexts/AppContext";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { chatbotResponses } from "@shared/data/content";
import { getText } from "@/lib/translations";

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  const { language } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const greetings = {
    en: "Hello! I'm A-Xin, your intelligent scam prevention assistant powered by AI. I can answer any questions about scams and help keep you safe. What would you like to know?",
    zh: "你好！我是阿信，你的智能防诈骗助手，由AI驱动。我可以回答任何关于诈骗的问题，帮助你保持安全。你想了解什么？",
    ms: "Hello! Saya A-Xin, pembantu pencegahan penipuan pintar anda yang dikuasakan AI. Saya boleh jawab sebarang soalan tentang penipuan dan membantu anda kekal selamat. Apa yang anda ingin tahu?"
  };

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      text: greetings[language]
    }]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest('POST', '/api/chat', { message, language });
      return await response.json();
    },
    onSuccess: (data: { response: string }) => {
      setMessages(prev => [...prev, { role: 'assistant', text: data.response }]);
    },
    onError: () => {
      const errorMessages = {
        en: "Sorry, I couldn't process that. Please try again.",
        zh: "抱歉，我无法处理。请重试。",
        ms: "Maaf, saya tidak dapat memproses itu. Sila cuba lagi."
      };
      setMessages(prev => [...prev, { role: 'assistant', text: errorMessages[language] }]);
    }
  });

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    
    chatMutation.mutate(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-full max-w-md z-50">
      <Card className="flex flex-col h-[500px] shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-primary/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center">
              <Bot className="w-6 h-6" data-testid="icon-bot" />
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2" data-testid="text-assistant-title">
                A-Xin AI 
                <Sparkles className="w-4 h-4" />
              </h3>
              <p className="text-xs text-white/80" data-testid="text-assistant-subtitle">
                {language === 'zh' ? '智能防诈骗助手' : language === 'ms' ? 'Pembantu AI Pintar' : 'Intelligent Assistant'}
              </p>
            </div>
          </div>
          <Button
            data-testid="button-close-chat"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              data-testid={`message-${message.role}-${index}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">U</span>
                )}
              </div>
              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block max-w-[85%] p-3 rounded-2xl ${
                    message.role === 'assistant'
                      ? 'bg-muted text-foreground rounded-tl-none'
                      : 'bg-primary text-primary-foreground rounded-tr-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          
          {chatMutation.isPending && (
            <div className="flex gap-3" data-testid="loading-indicator">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              data-testid="input-chat-message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === 'zh' ? '输入你的问题...' :
                language === 'ms' ? 'Taip soalan anda...' :
                'Type your question...'
              }
              disabled={chatMutation.isPending}
              className="flex-1"
            />
            <Button
              data-testid="button-send-message"
              onClick={handleSend}
              disabled={!input.trim() || chatMutation.isPending}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {language === 'zh' ? '由 AI 驱动 • 实时回答' :
             language === 'ms' ? 'Dikuasakan AI • Jawapan Langsung' :
             'Powered by AI • Real-time Answers'}
          </p>
        </div>
      </Card>
    </div>
  );
}
