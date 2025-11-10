import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import ChatAssistant from "@/components/ChatAssistant";
import LoginPrompt from "@/components/LoginPrompt";
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
import NotFound from "@/pages/not-found";
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
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { language, setLanguage, user, setUser } = useApp();
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('scamshield-language');
    const savedUser = localStorage.getItem('scamshield-user');

    if (savedLanguage) {
      setLanguage(savedLanguage as 'en' | 'zh' | 'ms');
      setShowLanguageSelector(false);
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setLanguage, setUser]);

  const handleLanguageSelected = (lang: 'en' | 'zh' | 'ms') => {
    setLanguage(lang);
    localStorage.setItem('scamshield-language', lang);
    setShowLanguageSelector(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('scamshield-user');
  };

  return (
    <>
      {!user && <LoginPrompt />}

      {!showLanguageSelector && user && (
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
              <div className="flex items-center gap-4">
                <AccessibilityToolbar />
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-semibold">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">{user.name}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-screen pb-24">
            <Router />
          </main>
        </>
      )}
      {showLanguageSelector && user && (
        <LanguageSelector onLanguageSelected={handleLanguageSelected} />
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