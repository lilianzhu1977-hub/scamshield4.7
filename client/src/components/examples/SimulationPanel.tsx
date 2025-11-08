import { AppProvider } from "@/contexts/AppContext";
import SimulationPanel from "../SimulationPanel";

export default function SimulationPanelExample() {
  return (
    <AppProvider>
      <div className="p-6">
        <SimulationPanel
          currentStep={2}
          totalSteps={8}
          title="Scammer Sends Fake Message"
          description="The scammer sends a message pretending to be from your bank, asking you to verify your account details immediately."
          visual="📱"
          onNext={() => console.log('Next')}
          onPrevious={() => console.log('Previous')}
          canGoNext={true}
          canGoPrevious={true}
        />
      </div>
    </AppProvider>
  );
}
