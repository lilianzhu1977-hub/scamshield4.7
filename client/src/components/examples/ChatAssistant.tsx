import { AppProvider } from "@/contexts/AppContext";
import ChatAssistant from "../ChatAssistant";

export default function ChatAssistantExample() {
  return (
    <AppProvider>
      <div className="h-screen bg-background p-6">
        <ChatAssistant isOpen={true} onClose={() => console.log('Close chat')} />
      </div>
    </AppProvider>
  );
}
