import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Type, Contrast, Turtle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function AccessibilityToolbar() {
  const {
    narrationEnabled,
    toggleNarration,
    largeFontSize,
    toggleFontSize,
    highContrast,
    toggleContrast,
    slowAnimation,
    toggleSlowAnimation,
  } = useApp();

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
    </div>
  );
}
