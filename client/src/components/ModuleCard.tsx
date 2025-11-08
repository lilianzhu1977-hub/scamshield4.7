import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
  testId?: string;
}

export default function ModuleCard({ icon: Icon, title, subtitle, onClick, testId }: ModuleCardProps) {
  const { speak } = useApp();

  const handleClick = () => {
    speak(title);
    onClick();
  };

  return (
    <Card
      data-testid={testId}
      className="p-8 flex flex-col items-center justify-center text-center cursor-pointer hover-elevate active-elevate-2 min-h-[160px]"
      onClick={handleClick}
    >
      <Icon className="w-16 h-16 mb-4 text-primary" />
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{subtitle}</p>
      <ChevronRight className="w-6 h-6 text-muted-foreground" />
    </Card>
  );
}
