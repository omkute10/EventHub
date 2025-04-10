
import { useState } from "react";
import Header from "@/components/dashboard/header";
import OrganizerEventCard from "@/components/dashboard/organizer-event-card";
import CreateEventForm from "@/components/dashboard/create-event-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, X, CalendarDays, PenSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data for organizer's events
const mockOrganizerEvents = [
  {
    id: 1,
    title: "Campus Hackathon 2025",
    description: "Join us for 24 hours of coding, innovation, and fun. Great prizes to be won!",
    category: "hackathons",
    location: "Engineering Building",
    date: "Apr 15, 2025",
    time: "10:00 AM - 10:00 AM (next day)",
    fee: 0,
    image: "",
    capacity: 100,
    registeredCount: 87,
    attendedCount: 74
  },
  {
    id: 2,
    title: "AI in Healthcare Panel",
    description: "Leading experts discuss the future of AI applications in healthcare and medicine.",
    category: "speakers",
    location: "Medical Sciences Auditorium",
    date: "Apr 18, 2025",
    time: "3:00 PM - 5:00 PM",
    fee: 0,
    image: "",
    capacity: 200,
    registeredCount: 143,
    attendedCount: 121
  },
  {
    id: 3,
    title: "Resume Building Workshop",
    description: "Learn how to create a standout resume with industry recruiters.",
    category: "workshops",
    location: "Business School, Room 202",
    date: "Apr 22, 2025",
    time: "2:00 PM - 4:00 PM",
    fee: 5,
    image: "",
    capacity: 30,
    registeredCount: 28,
    attendedCount: 22
  },
  {
    id: 4,
    title: "Alumni Networking Mixer",
    description: "Connect with successful alumni from various industries for career advice and opportunities.",
    category: "networking",
    location: "Student Union Ballroom",
    date: "Apr 25, 2025",
    time: "6:00 PM - 9:00 PM",
    fee: 15,
    image: "",
    capacity: 150,
    registeredCount: 98,
    attendedCount: 0 // Upcoming event
  }
] as const;

const OrganizerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState([...mockOrganizerEvents]);

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    // Search filter
    if (
      searchTerm &&
      !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Category filter
    if (categoryFilter && event.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  const handleEventCreated = () => {
    // Add a mock new event to the list
    const newEvent = {
      id: events.length + 1,
      title: "New Campus Event",
      description: "This is your newly created event.",
      category: "networking",
      location: "Student Union",
      date: "May 10, 2025",
      time: "2:00 PM - 5:00 PM",
      fee: 0,
      image: "",
      capacity: 100,
      registeredCount: 0,
      attendedCount: 0
    };
    
    setEvents([newEvent, ...events]);
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType="organizer" />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-2xl font-montserrat font-bold mb-4 sm:mb-0">Event Management</h1>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="bg-card/50 border border-white/10">
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Your Events
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
              onClick={() => setShowCreateModal(true)}
            >
              <PenSquare className="h-4 w-4 mr-2" />
              Plan an Event
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>

              <select
                value={categoryFilter || ""}
                onChange={(e) => setCategoryFilter(e.target.value || null)}
                className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Categories</option>
                <option value="sports">Sports</option>
                <option value="hackathons">Hackathons</option>
                <option value="networking">Networking</option>
                <option value="speakers">Speaker Sessions</option>
                <option value="workshops">Workshops</option>
              </select>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <OrganizerEventCard key={event.id} {...event} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-card/50 rounded-lg border border-white/10">
                <X className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-white/60">Try adjusting your filters or create a new event</p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 bg-primary hover:bg-primary/80 text-white"
                >
                  Create New Event
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Create Event Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-card text-white sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Event</DialogTitle>
          </DialogHeader>
          <CreateEventForm onEventCreated={handleEventCreated} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizerDashboard;
