import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Language } from "@shared/schema";

interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  narrationEnabled: boolean;
  setNarrationEnabled: (enabled: boolean) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  slowAnimation: boolean;
  setSlowAnimation: (enabled: boolean) => void;
  user: { name: string; initials: string } | null;
  setUser: (user: { name: string; initials: string } | null) => void;
  speak: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [slowAnimation, setSlowAnimation] = useState(false);
  const [user, setUser] = useState<{ name: string; initials: string } | null>(null);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (slowAnimation) {
      document.documentElement.classList.add('slow-animation');
    } else {
      document.documentElement.classList.remove('slow-animation');
    }
  }, [slowAnimation]);

  const speak = (text: string) => {
    if (!narrationEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const languageMap: Record<Language, string> = {
      en: 'en',
      zh: 'zh-CN',
      ms: 'ms'
    };

    const preferredLang = languageMap[language];
    const voice = voices.find(v => v.lang.startsWith(preferredLang));

    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = preferredLang;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      narrationEnabled,
      setNarrationEnabled,
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
      slowAnimation,
      setSlowAnimation,
      user,
      setUser,
      speak
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};