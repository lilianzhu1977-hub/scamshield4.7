import { AppProvider } from "@/contexts/AppContext";
import QuizCard from "../QuizCard";

export default function QuizCardExample() {
  return (
    <AppProvider>
      <div className="p-6">
        <QuizCard
          questionNumber={1}
          totalQuestions={10}
          question="A caller claims to be from the police and asks you to transfer money to a 'safe account'. What should you do?"
          options={[
            "Transfer the money immediately",
            "Hang up and call the police using their official number",
            "Give them your bank details",
            "Ask them to call back later"
          ]}
          correctIndex={1}
          explanation="Never transfer money or give personal details over the phone, even if the caller claims to be from the police. Always hang up and call back using official numbers."
          onAnswer={(isCorrect) => console.log('Answer:', isCorrect)}
        />
      </div>
    </AppProvider>
  );
}
