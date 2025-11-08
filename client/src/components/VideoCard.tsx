import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  onPlay: () => void;
  testId?: string;
}

export default function VideoCard({ title, description, thumbnail, onPlay, testId }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      data-testid={testId}
      className="overflow-hidden hover-elevate"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-muted">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
          <div className="text-8xl">{thumbnail}</div>
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button
              data-testid={`${testId}-play`}
              size="icon"
              variant="default"
              className="w-20 h-20 rounded-full"
              onClick={onPlay}
            >
              <Play className="w-10 h-10" />
            </Button>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
