
import { useState } from "react";
import { Calendar, MapPin, Clock, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/gradient-button";
import { useToast } from "@/hooks/use-toast";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  category: "sports" | "hackathons" | "networking" | "speakers" | "workshops";
  location: string;
  date: string;
  time: string;
  fee: number;
  image: string;
  capacity?: number;
  facilities?: string[];
  termsAndConditions?: string;
}

const categoryColors = {
  sports: "bg-event-sports/20 text-event-sports border-event-sports/30",
  hackathons: "bg-event-hackathons/20 text-event-hackathons border-event-hackathons/30",
  networking: "bg-primary/20 text-primary border-primary/30",
  speakers: "bg-event-speakers/20 text-event-speakers border-event-speakers/30",
  workshops: "bg-event-workshops/20 text-event-workshops border-event-workshops/30",
};

const categoryIcons = {
  sports: "🏆",
  hackathons: "💻",
  networking: "🌐",
  speakers: "🎤",
  workshops: "🔧",
};

const EventCard = ({
  id,
  title,
  description,
  category,
  location,
  date,
  time,
  fee,
  image,
  capacity,
  facilities = [],
  termsAndConditions = "",
}: EventCardProps) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [registered, setRegistered] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleRegister = () => {
    setRegistered(true);
    toast({
      title: `Registered for ${title}!`,
      description: "Check your email for confirmation details.",
    });
  };

  return (
    <div className={cn(
      "bg-card rounded-xl overflow-hidden border transition-all duration-300",
      expanded ? "border-primary/30" : "border-white/10",
      "hover-float"
    )}>
      <div className="relative">
        <div className="h-48 w-full bg-muted/50 overflow-hidden">
          {/* Replace with actual image if available */}
          <div className={`w-full h-full flex items-center justify-center text-4xl bg-${category}-100`}>
            {categoryIcons[category]}
          </div>
        </div>
        
        <Badge 
          className={cn(
            "absolute top-3 right-3 border",
            categoryColors[category]
          )}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        
        <p className="text-white/70 text-sm line-clamp-2 mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-white/60">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-white/60">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-sm text-white/60">
            <Clock className="h-4 w-4 mr-2" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-sm text-white/60">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{fee === 0 ? "Free" : `$${fee}`}</span>
          </div>
        </div>
        
        {/* Expandable content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/10">
            {capacity && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Capacity</h4>
                <p className="text-sm text-white/70">{capacity} attendees</p>
              </div>
            )}
            
            {facilities.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {facilities.map((facility, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-white/5"
                    >
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {termsAndConditions && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Terms & Conditions</h4>
                <p className="text-xs text-white/70">{termsAndConditions}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpand}
            className="text-primary flex items-center"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Know More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
          
          <GradientButton 
            size="sm" 
            disabled={registered}
            onClick={handleRegister}
          >
            {registered ? "Registered" : "Register"}
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
