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
  return (
    <div
      className={cn(
        "h-64 w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
        "hover:translate-y-[-8px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]",
        selected ? "gradient-border bg-card before:opacity-100" : "bg-card/50 hover:bg-card/70"
      )}
      onClick={onClick}
    >
      <div className="p-6 h-full flex flex-col items-center justify-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-white/90 text-center max-w-[90%]">{description}</p>
      </div>
    </div>
  );
};

export default RoleCard;
