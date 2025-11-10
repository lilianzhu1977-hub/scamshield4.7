
import { createContext, useContext, useState, ReactNode } from "react";
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [slowAnimation, setSlowAnimation] = useState(false);
  const [user, setUser] = useState<{ name: string; initials: string } | null>(null);

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
      setUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
