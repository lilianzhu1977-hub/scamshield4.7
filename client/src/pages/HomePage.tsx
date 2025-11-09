import { BookOpen, Video, Smartphone, Trophy, Phone, Lightbulb, Newspaper, TrendingUp, Users } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import { useLocation } from "wouter";

export default function HomePage() {
  const { language } = useApp();
  const [, setLocation] = useLocation();

  const modules = [
    {
      icon: BookOpen,
      titleKey: 'learn',
      path: '/learn',
      testId: 'card-module-learn'
    },
    {
      icon: Video,
      titleKey: 'videos',
      path: '/videos',
      testId: 'card-module-videos'
    },
    {
      icon: Smartphone,
      titleKey: 'simulation',
      path: '/simulation',
      testId: 'card-module-simulation'
    },
    {
      icon: Trophy,
      titleKey: 'quiz',
      path: '/quiz',
      testId: 'card-module-quiz'
    },
    {
      icon: TrendingUp,
      titleKey: 'progress',
      path: '/progress',
      testId: 'card-module-progress'
    },
    {
      icon: Users,
      titleKey: 'community',
      path: '/community',
      testId: 'card-module-community'
    },
    {
      icon: Phone,
      titleKey: 'helplines',
      path: '/helplines',
      testId: 'card-module-helplines'
    },
    {
      icon: Lightbulb,
      titleKey: 'tips',
      path: '/tips',
      testId: 'card-module-tips'
    },
    {
      icon: Newspaper,
      titleKey: 'news',
      path: '/news',
      testId: 'card-module-news'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {translations.home.title[language]}
        </h1>
        <p className="text-xl text-muted-foreground">
          {translations.home.subtitle[language]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.titleKey}
            icon={module.icon}
            title={translations.modules[module.titleKey as keyof typeof translations.modules][language]}
            subtitle=""
            onClick={() => setLocation(module.path)}
            testId={module.testId}
          />
        ))}
      </div>
    </div>
  );
}
