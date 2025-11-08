import { AppProvider } from "@/contexts/AppContext";
import TipCard from "../TipCard";

export default function TipCardExample() {
  return (
    <AppProvider>
      <div className="p-6 max-w-2xl">
        <TipCard
          icon="✈️"
          title="Turn on Airplane Mode"
          description="Immediately disconnect from the internet to stop remote access"
          stepNumber={1}
        />
      </div>
    </AppProvider>
  );
}
