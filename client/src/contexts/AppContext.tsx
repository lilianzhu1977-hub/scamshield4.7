import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@shared/schema';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  narrationEnabled: boolean;
  toggleNarration: () => void;
  largeFontSize: boolean;
  toggleFontSize: () => void;
  highContrast: boolean;
  toggleContrast: () => void;
  slowAnimation: boolean;
  toggleSlowAnimation: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [largeFontSize, setLargeFontSize] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [slowAnimation, setSlowAnimation] = useState(false);

  const speak = (text: string) => {
    if (!narrationEnabled || typeof window === 'undefined' || !text) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (language === 'zh') {
      utterance.lang = 'zh-CN';
      const voices = window.speechSynthesis.getVoices();
      const zhVoice = voices.find(v => v.lang.startsWith('zh'));
      if (zhVoice) utterance.voice = zhVoice;
    } else if (language === 'ms') {
      utterance.lang = 'ms-MY';
      const voices = window.speechSynthesis.getVoices();
      const msVoice = voices.find(v => v.lang.startsWith('ms'));
      if (msVoice) utterance.voice = msVoice;
    } else {
      utterance.lang = 'en-US';
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    }
    
    utterance.rate = slowAnimation ? 0.7 : 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => {
    if (largeFontSize) {
      document.documentElement.classList.add('text-lg');
      document.body.style.fontSize = '120%';
    } else {
      document.documentElement.classList.remove('text-lg');
      document.body.style.fontSize = '';
    }
  }, [largeFontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
      document.documentElement.style.setProperty('--background', '0 0% 0%');
      document.documentElement.style.setProperty('--foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--card', '0 0% 5%');
      document.documentElement.style.setProperty('--border', '0 0% 30%');
    } else {
      document.documentElement.classList.remove('high-contrast');
      document.documentElement.style.removeProperty('--background');
      document.documentElement.style.removeProperty('--foreground');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--border');
    }
  }, [highContrast]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        narrationEnabled,
        toggleNarration: () => setNarrationEnabled(prev => !prev),
        largeFontSize,
        toggleFontSize: () => setLargeFontSize(prev => !prev),
        highContrast,
        toggleContrast: () => setHighContrast(prev => !prev),
        slowAnimation,
        toggleSlowAnimation: () => setSlowAnimation(prev => !prev),
        speak,
        stopSpeaking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
