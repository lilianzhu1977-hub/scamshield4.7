import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import AudioButton from "./AudioButton";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

interface ScamTypeCardProps {
  icon: string;
  title: string;
  description: string;
  story: string;
  testId?: string;
}

export default function ScamTypeCard({ icon, title, description, story, testId }: ScamTypeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { speak } = useApp();

  const handleExpand = () => {
    if (!expanded) {
      speak(title);
    }
    setExpanded(!expanded);
  };

  return (
    <Card data-testid={testId} className="p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-5xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="flex gap-3 mb-4">
        <AudioButton text={title + ". " + description} testId={`${testId}-audio`} />
        <Button
          data-testid={`${testId}-expand`}
          variant="outline"
          onClick={handleExpand}
          className="gap-2"
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          {expanded ? "Show Less" : "Learn More"}
        </Button>
      </div>
      
      {expanded && (
        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2 text-lg">Example Story:</h4>
          <p className="text-foreground leading-relaxed">{story}</p>
        </div>
      )}
    </Card>
  );
}
