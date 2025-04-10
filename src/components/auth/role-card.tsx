
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

const RoleCard = ({ title, description, icon, selected, onClick }: RoleCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    if (!selected) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!selected) {
      setIsFlipped(false);
    }
  };

  const handleClick = () => {
    onClick();
    setIsFlipped(false);
  };

  return (
    <div
      className={cn(
        "h-64 w-full perspective-card cursor-pointer",
        selected ? "opacity-100" : "opacity-80 hover:opacity-100"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div 
        className={cn(
          "relative h-full w-full preserve-3d transition-all duration-500",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front of card */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden rounded-2xl overflow-hidden",
            selected ? "gradient-border bg-card before:opacity-100" : "bg-card/50"
          )}
        >
          <div className="p-6 h-full flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-white/70 text-center">{description}</p>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden glass-card">
          <div className="p-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4">Select {title}</h3>
            <p className="text-sm text-white/70 text-center mb-6">
              Click to choose this role and continue with registration
            </p>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
