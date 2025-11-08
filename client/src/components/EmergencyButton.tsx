import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface EmergencyButtonProps {
  number: string;
  label: string;
  description: string;
  testId?: string;
}

export default function EmergencyButton({ number, label, description, testId }: EmergencyButtonProps) {
  const handleCall = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <Button
      data-testid={testId}
      variant="destructive"
      size="lg"
      className="w-full h-auto min-h-[100px] flex items-center justify-start gap-6 px-8 py-6"
      onClick={handleCall}
    >
      <Phone className="w-12 h-12 flex-shrink-0" />
      <div className="text-left flex-1">
        <div className="text-2xl font-bold mb-1">{number}</div>
        <div className="text-lg font-semibold mb-1">{label}</div>
        <div className="text-sm opacity-90">{description}</div>
      </div>
    </Button>
  );
}
