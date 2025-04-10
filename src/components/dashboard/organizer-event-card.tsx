
import { useState } from "react";
import { Calendar, MapPin, Clock, DollarSign, ChevronDown, ChevronUp, Users, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrganizerEventCardProps {
  id: number;
  title: string;
  description: string;
  category: "sports" | "hackathons" | "networking" | "speakers" | "workshops";
  location: string;
  date: string;
  time: string;
  fee: number;
  image: string;
  capacity: number;
  registeredCount: number;
  attendedCount?: number;
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

const OrganizerEventCard = ({
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
  registeredCount,
  attendedCount = 0,
}: OrganizerEventCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  
  const registrationPercentage = Math.round((registeredCount / capacity) * 100);
  const attendancePercentage = registeredCount ? Math.round((attendedCount / registeredCount) * 100) : 0;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
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
          
          {/* Registration Stats */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/70">Registration</span>
              <span className="text-xs font-medium">{registeredCount}/{capacity}</span>
            </div>
            <Progress value={registrationPercentage} className="h-1.5" />
          </div>
          
          {/* Expandable content */}
          {expanded && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/70">Attendance</span>
                    <span className="text-xs font-medium">{attendedCount}/{registeredCount}</span>
                  </div>
                  <Progress value={attendancePercentage} className="h-1.5 bg-white/10">
                    <div 
                      className="h-full bg-secondary rounded-full transition-all" 
                      style={{ width: `${attendancePercentage}%` }}
                    />
                  </Progress>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-medium">{registrationPercentage}%</div>
                    <div className="text-xs text-white/60">Registration Rate</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-medium">{attendancePercentage}%</div>
                    <div className="text-xs text-white/60">Attendance Rate</div>
                  </div>
                </div>
              </div>
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
                  Show More <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
              onClick={() => setShowMetrics(true)}
            >
              <BarChart className="h-4 w-4 mr-2" />
              View Metrics
            </Button>
          </div>
        </div>
      </div>
      
      {/* Metrics Dialog */}
      <Dialog open={showMetrics} onOpenChange={setShowMetrics}>
        <DialogContent className="bg-card border-white/10 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>Event Metrics: {title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="glass-card rounded-lg p-4 text-center">
              <div className="text-3xl font-semibold text-primary">{registeredCount}</div>
              <div className="text-sm text-white/70">Registered</div>
            </div>
            <div className="glass-card rounded-lg p-4 text-center">
              <div className="text-3xl font-semibold text-secondary">{attendedCount}</div>
              <div className="text-sm text-white/70">Attended</div>
            </div>
            <div className="glass-card rounded-lg p-4 text-center">
              <div className="text-3xl font-semibold text-event-speakers">{capacity}</div>
              <div className="text-sm text-white/70">Capacity</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Registration Timeline</h3>
              <div className="h-40 bg-white/5 rounded-lg flex items-end justify-between p-4">
                {/* Mock timeline bars */}
                <div className="h-[20%] w-8 bg-primary rounded-t-md"></div>
                <div className="h-[35%] w-8 bg-primary rounded-t-md"></div>
                <div className="h-[60%] w-8 bg-primary rounded-t-md"></div>
                <div className="h-[80%] w-8 bg-primary rounded-t-md"></div>
                <div className="h-[90%] w-8 bg-primary rounded-t-md"></div>
                <div className="h-[75%] w-8 bg-primary rounded-t-md"></div>
                <div className="h-[40%] w-8 bg-primary rounded-t-md"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>7 Days Ago</span>
                <span>Today</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Demographics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-lg p-4">
                  <h4 className="text-xs text-white/60 mb-2">Gender Distribution</h4>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Male (65%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="text-sm">Female (35%)</span>
                  </div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <h4 className="text-xs text-white/60 mb-2">Age Groups</h4>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 bg-event-hackathons rounded-full"></div>
                    <span className="text-sm">18-24 (78%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-event-sports rounded-full"></div>
                    <span className="text-sm">25-34 (22%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrganizerEventCard;
