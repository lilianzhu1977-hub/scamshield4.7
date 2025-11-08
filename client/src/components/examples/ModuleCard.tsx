import { AppProvider } from "@/contexts/AppContext";
import ModuleCard from "../ModuleCard";
import { BookOpen } from "lucide-react";

export default function ModuleCardExample() {
  return (
    <AppProvider>
      <div className="p-6 max-w-sm">
        <ModuleCard
          icon={BookOpen}
          title="Learn"
          subtitle="Understand common scam types"
          onClick={() => console.log('Module clicked')}
        />
      </div>
    </AppProvider>
  );
}
