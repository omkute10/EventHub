
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface OrganizerDetailsProps {
  onDetailsSubmitted: () => void;
}

const OrganizerDetails = ({ onDetailsSubmitted }: OrganizerDetailsProps) => {
  const [eventType, setEventType] = useState("");
  const [eventScale, setEventScale] = useState([50]);

  const handleSubmit = () => {
    // Here we would normally save the data
    console.log({ eventType, eventScale });
    onDetailsSubmitted();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-montserrat font-semibold text-center">
        Event Organizer Details
      </h2>
      <p className="text-white/70 text-center mb-8">
        Let us know what kind of events you plan to organize
      </p>
      
      <div className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="event-type" className="text-sm font-medium text-white/80">
            Primary Event Type
          </label>
          <Select onValueChange={(value) => setEventType(value)}>
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="competition">Competition</SelectItem>
              <SelectItem value="speaker">Speaker Session</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="networking">Networking</SelectItem>
              <SelectItem value="party">Party</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="hackathon">Hackathon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="event-scale" className="text-sm font-medium text-white/80">
              Expected Event Scale
            </label>
            <span className="text-sm font-medium text-white/60">
              {eventScale[0]} attendees
            </span>
          </div>
          <Slider 
            id="event-scale"
            defaultValue={[50]} 
            max={500} 
            min={10} 
            step={10}
            onValueChange={setEventScale}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-white/40">
            <span>10</span>
            <span>250</span>
            <span>500</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          disabled={!eventType}
          className={`px-6 py-2 rounded-lg transition-all ${
            eventType
              ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_15px_rgba(110,69,226,0.5)]"
              : "bg-white/10 text-white/50 cursor-not-allowed"
          }`}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default OrganizerDetails;
