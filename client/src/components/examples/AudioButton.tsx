import { AppProvider } from "@/contexts/AppContext";
import AudioButton from "../AudioButton";

export default function AudioButtonExample() {
  return (
    <AppProvider>
      <div className="p-6">
        <AudioButton text="This is a scam prevention tip" />
      </div>
    </AppProvider>
  );
}
