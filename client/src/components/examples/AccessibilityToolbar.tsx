import { AppProvider } from "@/contexts/AppContext";
import AccessibilityToolbar from "../AccessibilityToolbar";

export default function AccessibilityToolbarExample() {
  return (
    <AppProvider>
      <div className="p-6 bg-card">
        <AccessibilityToolbar />
      </div>
    </AppProvider>
  );
}
