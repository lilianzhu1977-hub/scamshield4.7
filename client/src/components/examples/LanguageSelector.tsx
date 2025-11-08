import { AppProvider } from "@/contexts/AppContext";
import LanguageSelector from "../LanguageSelector";

export default function LanguageSelectorExample() {
  return (
    <AppProvider>
      <LanguageSelector onLanguageSelected={(lang) => console.log('Language selected:', lang)} />
    </AppProvider>
  );
}
