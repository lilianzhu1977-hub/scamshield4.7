import { AppProvider } from "@/contexts/AppContext";
import ScamTypeCard from "../ScamTypeCard";

export default function ScamTypeCardExample() {
  return (
    <AppProvider>
      <div className="p-6 max-w-2xl">
        <ScamTypeCard
          icon="🏛️"
          title="Government Impersonation"
          description="Scammers pretend to be from government agencies"
          story="Mrs. Tan received a call claiming to be from the Singapore Police. They said her identity was used in a crime and asked her to transfer money to a 'safe account'. This is a common scam - government agencies never ask for money over the phone."
        />
      </div>
    </AppProvider>
  );
}
