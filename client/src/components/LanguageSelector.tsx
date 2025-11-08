import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Volume2 } from "lucide-react";
import { Language } from "@shared/schema";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";

interface LanguageSelectorProps {
  onLanguageSelected: (lang: Language) => void;
}

export default function LanguageSelector({ onLanguageSelected }: LanguageSelectorProps) {
  const { speak } = useApp();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    speak(languages.find(l => l.code === lang)?.nativeName || '');
    setTimeout(() => {
      onLanguageSelected(lang);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <Globe className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-semibold mb-2">Choose Your Language</h1>
          <p className="text-3xl font-semibold mb-2">选择您的语言</p>
          <p className="text-3xl font-semibold">Pilih Bahasa Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              data-testid={`button-language-${lang.code}`}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-3 text-center hover-elevate active-elevate-2"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <Volume2 className="w-8 h-8" />
              <div>
                <div className="text-2xl font-semibold">{lang.nativeName}</div>
                <div className="text-sm text-muted-foreground mt-1">{lang.name}</div>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
