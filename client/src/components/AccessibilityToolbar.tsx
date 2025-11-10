import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Type, Contrast, Turtle, Languages } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccessibilityToolbar() {
  const {
    narrationEnabled,
    setNarrationEnabled,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    slowAnimation,
    setSlowAnimation,
    language,
    setLanguage,
  } = useApp();

  const largeFontSize = fontSize > 16;
  const toggleNarration = () => setNarrationEnabled(!narrationEnabled);
  const toggleFontSize = () => setFontSize(largeFontSize ? 16 : 20);
  const toggleContrast = () => setHighContrast(!highContrast);
  const toggleSlowAnimation = () => setSlowAnimation(!slowAnimation);

  const languageOptions = [
    { code: 'en' as const, label: 'English' },
    { code: 'zh' as const, label: '中文' },
    { code: 'ms' as const, label: 'Bahasa Melayu' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Button
        data-testid="button-toggle-narration"
        size="icon"
        variant={narrationEnabled ? "default" : "outline"}
        onClick={toggleNarration}
        title="Toggle Narration"
      >
        {narrationEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </Button>
      
      <Button
        data-testid="button-toggle-fontsize"
        size="icon"
        variant={largeFontSize ? "default" : "outline"}
        onClick={toggleFontSize}
        title="Toggle Font Size"
      >
        <Type className="w-5 h-5" />
      </Button>
      
      <Button
        data-testid="button-toggle-contrast"
        size="icon"
        variant={highContrast ? "default" : "outline"}
        onClick={toggleContrast}
        title="Toggle High Contrast"
      >
        <Contrast className="w-5 h-5" />
      </Button>
      
      <Button
        data-testid="button-toggle-animation"
        size="icon"
        variant={slowAnimation ? "default" : "outline"}
        onClick={toggleSlowAnimation}
        title="Toggle Slow Animation"
      >
        <Turtle className="w-5 h-5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            data-testid="button-toggle-language"
            size="icon"
            variant="outline"
            title="Change Language"
          >
            <Languages className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languageOptions.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                localStorage.setItem('scamshield-language', lang.code);
              }}
              className={language === lang.code ? "bg-accent" : ""}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
