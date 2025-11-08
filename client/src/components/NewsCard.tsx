import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  testId?: string;
}

export default function NewsCard({ title, summary, date, severity, testId }: NewsCardProps) {
  const severityConfig = {
    high: { icon: AlertTriangle, color: 'bg-destructive text-destructive-foreground', label: 'High Alert' },
    medium: { icon: AlertCircle, color: 'bg-yellow-500 text-white', label: 'Warning' },
    low: { icon: Info, color: 'bg-blue-500 text-white', label: 'Info' }
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Card data-testid={testId} className="p-6 hover-elevate">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${config.color}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary">{config.label}</Badge>
            <span className="text-sm text-muted-foreground">{date}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{summary}</p>
        </div>
      </div>
    </Card>
  );
}
