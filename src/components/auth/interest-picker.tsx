
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Interest {
  id: string;
  name: string;
  icon: string;
}

interface InterestPickerProps {
  onInterestsSelected: (interests: string[]) => void;
}

const InterestPicker = ({ onInterestsSelected }: InterestPickerProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests: Interest[] = [
    { id: "football", name: "Football", icon: "⚽" },
    { id: "basketball", name: "Basketball", icon: "🏀" },
    { id: "tennis", name: "Tennis", icon: "🎾" },
    { id: "ai-hackathon", name: "AI Hackathon", icon: "🤖" },
    { id: "web-dev", name: "Web Development", icon: "💻" },
    { id: "blockchain", name: "Blockchain", icon: "🔗" },
    { id: "networking", name: "Networking", icon: "🌐" },
    { id: "career-fair", name: "Career Fair", icon: "💼" },
    { id: "workshop", name: "Workshops", icon: "🔧" },
    { id: "speaker", name: "Speaker Sessions", icon: "🎤" },
    { id: "debate", name: "Debates", icon: "🗣" },
    { id: "art", name: "Art & Design", icon: "🎨" },
  ];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

  const handleContinue = () => {
    onInterestsSelected(selectedInterests);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-montserrat font-semibold text-center">
        Select Your Interests
      </h2>
      <p className="text-white/70 text-center mb-8">
        Choose interests to personalize your event recommendations
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {interests.map((interest) => (
          <div
            key={interest.id}
            onClick={() => toggleInterest(interest.id)}
            className={cn(
              "p-3 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all",
              selectedInterests.includes(interest.id)
                ? "bg-primary/30 shadow-[0_0_15px_rgba(110,69,226,0.3)] border border-primary/30"
                : "bg-card/50 border border-white/5 hover:bg-card"
            )}
          >
            <div className="text-2xl mb-2">{interest.icon}</div>
            <div className="text-sm font-medium">{interest.name}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
        <button
          onClick={handleContinue}
          disabled={selectedInterests.length === 0}
          className={cn(
            "px-6 py-2 rounded-lg transition-all",
            selectedInterests.length > 0
              ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_15px_rgba(110,69,226,0.5)]"
              : "bg-white/10 text-white/50 cursor-not-allowed"
          )}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InterestPicker;
