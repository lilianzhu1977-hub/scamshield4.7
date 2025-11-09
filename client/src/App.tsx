import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useState, useEffect } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import ChatAssistant from "@/components/ChatAssistant";
import HomePage from "@/pages/HomePage";
import LearnPage from "@/pages/LearnPage";
import VideosPage from "@/pages/VideosPage";
import SimulationPage from "@/pages/SimulationPage";
import QuizPage from "@/pages/QuizPage";
import HelpLinesPage from "@/pages/HelpLinesPage";
import TipsPage from "@/pages/TipsPage";
import NewsPage from "@/pages/NewsPage";
import ProgressPage from "@/pages/ProgressPage";
import CommunityPage from "@/pages/CommunityPage";
import { translations } from "@/lib/translations";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/learn" component={LearnPage} />
      <Route path="/videos" component={VideosPage} />
      <Route path="/simulation" component={SimulationPage} />
      <Route path="/quiz" component={QuizPage} />
      <Route path="/helplines" component={HelpLinesPage} />
      <Route path="/tips" component={TipsPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/progress" component={ProgressPage} />
      <Route path="/community" component={CommunityPage} />
    </Switch>
  );
}

function AppContent() {
  const { language, setLanguage } = useApp();
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('scamshield-language');
    if (savedLanguage) {
      setLanguage(savedLanguage as 'en' | 'zh' | 'ms');
      setShowLanguageSelector(false);
    }
  }, [setLanguage]);

  const handleLanguageSelected = (lang: 'en' | 'zh' | 'ms') => {
    setLanguage(lang);
    localStorage.setItem('scamshield-language', lang);
    setShowLanguageSelector(false);
  };

  return (
    <>
      {showLanguageSelector && (
        <LanguageSelector onLanguageSelected={handleLanguageSelected} />
      )}

      {!showLanguageSelector && (
        <>
          <header className="sticky top-0 z-40 bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {translations.appName[language]}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' && 'Scam Prevention for Seniors'}
                  {language === 'zh' && '老年人防诈骗平台'}
                  {language === 'ms' && 'Pencegahan Penipuan untuk Warga Emas'}
                </p>
              </div>
              <AccessibilityToolbar />
            </div>
          </header>

          <main className="min-h-screen pb-24">
            <Router />
          </main>

          <Button
            data-testid="button-open-chat"
            size="icon"
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg z-40"
            onClick={() => setShowChat(!showChat)}
          >
            <Bot className="w-8 h-8" />
          </Button>

          <ChatAssistant isOpen={showChat} onClose={() => setShowChat(false)} />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
