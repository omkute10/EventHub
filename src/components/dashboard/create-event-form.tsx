
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { GradientButton } from "@/components/ui/gradient-button";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateEventFormProps {
  onEventCreated: () => void;
}

const CreateEventForm = ({ onEventCreated }: CreateEventFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    date: undefined as Date | undefined,
    location: "",
    time: "",
    fee: "",
    description: "",
    termsAndConditions: "",
    facilities: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const goToNextStep = () => {
    setStep(2);
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would normally submit to a database
    toast({
      title: "Event created successfully!",
      description: "Your event is now live. Check 'Your Events' to see it.",
    });
    
    onEventCreated();
  };

  const isStep1Valid = formData.name && formData.category && formData.date && formData.location && formData.time;
  const isStep2Valid = formData.description;

  return (
    <div className="glass-card rounded-xl p-6">
      {/* Stepper */}
      <div className="flex items-center mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
          1
        </div>
        <div className={`flex-1 h-[2px] ${step === 1 ? 'bg-white/20' : 'bg-primary'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-white' : 'bg-white/20 text-white/50'}`}>
          2
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Event Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter event name"
                  required
                  className="bg-white/5 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-white/80">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select event category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10">
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="hackathons">Hackathon</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="speakers">Speaker Session</SelectItem>
                    <SelectItem value="workshops">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-white/80">
                  Date <span className="text-red-500">*</span>
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal bg-white/5 border-white/10 ${formData.date ? "text-white" : "text-white/50"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? formData.date.toDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-white/10" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-white/80">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium text-white/80">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="e.g. 2:00 PM"
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="fee" className="text-sm font-medium text-white/80">
                  Fee ($ - leave blank for free)
                </label>
                <Input
                  id="fee"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  placeholder="Enter fee amount"
                  type="number"
                  min="0"
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button
                type="button"
                onClick={goToNextStep}
                disabled={!isStep1Valid}
                className="bg-primary hover:bg-primary/80 text-white"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Event Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-white/80">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter event description"
                  required
                  className="min-h-[120px] bg-white/5 border-white/10 resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="facilities" className="text-sm font-medium text-white/80">
                  Facilities (comma separated)
                </label>
                <Input
                  id="facilities"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleChange}
                  placeholder="e.g. Wifi, Refreshments, Parking"
                  className="bg-white/5 border-white/10"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="termsAndConditions" className="text-sm font-medium text-white/80">
                  Terms & Conditions
                </label>
                <Textarea
                  id="termsAndConditions"
                  name="termsAndConditions"
                  value={formData.termsAndConditions}
                  onChange={handleChange}
                  placeholder="Enter terms and conditions"
                  className="min-h-[100px] bg-white/5 border-white/10 resize-none"
                />
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                className="border-white/10"
              >
                Back
              </Button>
              
              <GradientButton
                type="submit"
                disabled={!isStep2Valid}
              >
                Organize Event
              </GradientButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateEventForm;
