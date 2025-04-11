import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  category: "sports" | "hackathons" | "networking" | "speakers" | "workshops";
  registered: boolean;
}

interface EventCalendarProps {
  events: CalendarEvent[];
}

const categoryColors = {
  sports: "bg-event-sports hover:bg-event-sports/80",
  hackathons: "bg-event-hackathons hover:bg-event-hackathons/80",
  networking: "bg-primary hover:bg-primary/80",
  speakers: "bg-event-speakers hover:bg-event-speakers/80",
  workshops: "bg-event-workshops hover:bg-event-workshops/80",
};

const EventCalendar = ({ events }: EventCalendarProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [showRegistered, setShowRegistered] = useState<boolean>(true);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(true);
  
  const filteredEvents = events.filter((event) => {
    if (!showRegistered && event.registered) return false;
    if (!showUpcoming && !event.registered) return false;
    return true;
  });

  const selectedDayEvents = selectedDay 
    ? filteredEvents.filter(event => 
        event.date.getDate() === selectedDay.getDate() && 
        event.date.getMonth() === selectedDay.getMonth() &&
        event.date.getFullYear() === selectedDay.getFullYear()
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <Button
          variant={showRegistered ? "default" : "outline"}
          size="sm"
          onClick={() => setShowRegistered(!showRegistered)}
          className={showRegistered ? "bg-primary hover:bg-primary/80" : "border-white/10"}
        >
          Registered
        </Button>
        <Button
          variant={showUpcoming ? "default" : "outline"}
          size="sm"
          onClick={() => setShowUpcoming(!showUpcoming)}
          className={showUpcoming ? "bg-secondary hover:bg-secondary/80" : "border-white/10"}
        >
          Upcoming
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-7 glass-card rounded-xl p-4">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            className="mx-auto pointer-events-auto"
            disableNavigation={false}
            classNames={{
              day_today: "bg-primary/20 text-primary",
              day_selected: "bg-primary text-white",
            }}
            components={{
              DayContent: (props) => {
                const day = props.date;
                const eventsToday = filteredEvents.filter(
                  event => 
                    event.date.getDate() === day.getDate() && 
                    event.date.getMonth() === day.getMonth() &&
                    event.date.getFullYear() === day.getFullYear()
                );
                
                const hasEvent = eventsToday.length > 0;
                
                // Get unique categories for the day
                const categories = [...new Set(eventsToday.map(event => event.category))];
                
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="text-white">{day.getDate()}</div>
                    {hasEvent && (
                      <div className="absolute bottom-1 flex space-x-1 justify-center">
                        {categories.map((category, i) => (
                          <div 
                            key={i}
                            className={cn(
                              "h-1 w-1 rounded-full",
                              categoryColors[category]
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            }}
          />
        </div>
        
        <div className="md:col-span-5 glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-medium">
              {selectedDay ? (
                <>
                  Events for {selectedDay.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </>
              ) : (
                "Select a date"
              )}
            </h3>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto space-y-3">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((event) => (
                <div 
                  key={event.id}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge 
                      className={cn(
                        "text-[10px]",
                        event.registered ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                      )}
                    >
                      {event.registered ? "Registered" : "Upcoming"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[10px] border", 
                          `bg-event-${event.category}/10 text-event-${event.category} border-event-${event.category}/30`
                        )}
                      >
                        {event.category}
                      </Badge>
                    </div>
                    <div className="text-xs text-white/50">
                      {event.date.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-white/40">
                No events for this day
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
