import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";

interface AudioButtonProps {
  text: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  testId?: string;
}

export default function AudioButton({ text, variant = "outline", size = "default", testId }: AudioButtonProps) {
  const { speak, language } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    speak(text);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const labels = {
    en: "Play Voice",
    zh: "播放语音",
    ms: "Main Suara"
  };

  return (
    <Button
      data-testid={testId}
      variant={variant}
      size={size}
      onClick={handlePlay}
      className="gap-2"
    >
      <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
      {labels[language]}
    </Button>
  );
}
