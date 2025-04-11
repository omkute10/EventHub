import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/dashboard/header";
import EventCard from "@/components/dashboard/event-card";
import BuddyCard from "@/components/dashboard/event-buddy-card";
import EventCalendar from "@/components/dashboard/event-calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CalendarDays, Users, Users2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data with non-readonly types
const mockEvents = [
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
    facilities: ["WiFi", "Food", "Sleeping Area", "Showers"],
    termsAndConditions: "Participants must be enrolled students. Teams of up to 4 people. Code must be original and created during the event."
  },
  {
    id: 2,
    title: "Basketball Tournament",
    description: "Inter-department basketball tournament. Form your teams and compete!",
    category: "sports",
    location: "Sports Complex",
    date: "Apr 20, 2025",
    time: "1:00 PM - 6:00 PM",
    fee: 10,
    image: "",
    facilities: ["Changing Rooms", "Water Stations", "First Aid"],
    termsAndConditions: "Teams must register at least 1 week before the event. Minimum 5, maximum 8 players per team."
  },
  {
    id: 3,
    title: "AI in Healthcare Panel",
    description: "Leading experts discuss the future of AI applications in healthcare and medicine.",
    category: "speakers",
    location: "Medical Sciences Auditorium",
    date: "Apr 18, 2025",
    time: "3:00 PM - 5:00 PM",
    fee: 0,
    image: "",
    facilities: ["WiFi", "Refreshments"],
    termsAndConditions: "Open to all students and faculty. Please arrive 15 minutes early for seating."
  },
  {
    id: 4,
    title: "Resume Building Workshop",
    description: "Learn how to create a standout resume with industry recruiters.",
    category: "workshops",
    location: "Business School, Room 202",
    date: "Apr 22, 2025",
    time: "2:00 PM - 4:00 PM",
    fee: 5,
    image: "",
    facilities: ["Laptops Provided", "WiFi"],
    termsAndConditions: "Bring a draft of your current resume if you have one. Limited to 30 participants."
  },
  {
    id: 5,
    title: "Alumni Networking Mixer",
    description: "Connect with successful alumni from various industries for career advice and opportunities.",
    category: "networking",
    location: "Student Union Ballroom",
    date: "Apr 25, 2025",
    time: "6:00 PM - 9:00 PM",
    fee: 15,
    image: "",
    facilities: ["Refreshments", "Business Card Exchange"],
    termsAndConditions: "Business casual attire required. Open to juniors and seniors only."
  },
  {
    id: 6,
    title: "Photography Contest",
    description: "Submit your best campus photos and win prizes! Theme: 'Campus Life'",
    category: "workshops",
    location: "Art Department Gallery",
    date: "May 1, 2025",
    time: "All Day",
    fee: 0,
    image: "",
    facilities: [],
    termsAndConditions: "Photos must be original and taken within the last 6 months. Maximum 3 submissions per person."
  }
];

const buddies = [
  {
    id: 1,
    name: "Alex Johnson",
    interests: ["AI", "Machine Learning", "Basketball"],
    mutualEvents: ["Campus Hackathon 2025"],
    avatar: "/alex.jpg"
  },
  {
    id: 2,
    name: "Sophia Chen",
    interests: ["Photography", "Design", "Hiking"],
    mutualEvents: ["Photography Contest"],
    avatar: "/sophia.jpg"
  },
  {
    id: 3,
    name: "Marcus Lee",
    interests: ["Basketball", "Football", "Gaming"],
    mutualEvents: ["Basketball Tournament", "Alumni Networking Mixer"],
    avatar: "/marcus.jpg"
  },
  {
    id: 4,
    name: "Olivia Kim",
    interests: ["Healthcare", "Biology", "Volunteering"],
    mutualEvents: ["AI in Healthcare Panel"],
    avatar: "/olivia.jpg"
  }
];

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  category: string;
  registered: boolean;
}

const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Campus Hackathon 2025",
    date: new Date(2025, 3, 15), // April 15, 2025
    category: "hackathons",
    registered: true
  },
  {
    id: 2,
    title: "AI in Healthcare Panel",
    date: new Date(2025, 3, 18), // April 18, 2025
    category: "speakers",
    registered: true
  },
  {
    id: 3,
    title: "Basketball Tournament",
    date: new Date(2025, 3, 20), // April 20, 2025
    category: "sports",
    registered: false
  },
  {
    id: 4,
    title: "Resume Building Workshop",
    date: new Date(2025, 3, 22), // April 22, 2025
    category: "workshops",
    registered: false
  },
  {
    id: 5,
    title: "Alumni Networking Mixer",
    date: new Date(2025, 3, 25), // April 25, 2025
    category: "networking",
    registered: true
  },
  {
    id: 6,
    title: "Photography Contest",
    date: new Date(2025, 4, 1), // May 1, 2025
    category: "workshops",
    registered: false
  }
];

const AttendeeDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [feeFilter, setFeeFilter] = useState<string | null>(null);

  // Filter events based on search and filters
  const filteredEvents = mockEvents.filter(event => {
    // Search filter
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (categoryFilter && event.category !== categoryFilter) {
      return false;
    }
    
    // Date filter (simplified)
    if (dateFilter === "today") {
      // For demo, just show first 3 events for "today"
      return event.id <= 3;
    } else if (dateFilter === "this-week") {
      // For demo, show first 5 events for "this week"
      return event.id <= 5;
    } else if (dateFilter === "next-week") {
      // For demo, show last 2 events for "next week"
      return event.id > 4;
    }
    
    // Fee filter
    if (feeFilter === "free" && event.fee > 0) {
      return false;
    } else if (feeFilter === "paid" && event.fee === 0) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header userType="attendee" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-2xl font-montserrat font-bold mb-6">Find Your Next Event</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
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
            
            <div className="flex flex-wrap gap-2">
              <select 
                value={categoryFilter || ''} 
                onChange={(e) => setCategoryFilter(e.target.value || null)}
                className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="" className="bg-background text-white">All Categories</option>
                <option value="sports" className="bg-background text-white">Sports</option>
                <option value="hackathons" className="bg-background text-white">Hackathons</option>
                <option value="networking" className="bg-background text-white">Networking</option>
                <option value="speakers" className="bg-background text-white">Speaker Sessions</option>
                <option value="workshops" className="bg-background text-white">Workshops</option>
              </select>
              
              <select 
                value={dateFilter || ''} 
                onChange={(e) => setDateFilter(e.target.value || null)}
                className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="" className="bg-background text-white">All Dates</option>
                <option value="today" className="bg-background text-white">Today</option>
                <option value="this-week" className="bg-background text-white">This Week</option>
                <option value="next-week" className="bg-background text-white">Next Week</option>
              </select>
              
              <select 
                value={feeFilter || ''} 
                onChange={(e) => setFeeFilter(e.target.value || null)}
                className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="" className="bg-background text-white">Any Price</option>
                <option value="free" className="bg-background text-white">Free</option>
                <option value="paid" className="bg-background text-white">Paid</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="bg-card/50 border border-white/10">
            <TabsTrigger value="events" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <CalendarDays className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="buddies" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              EventBuddy
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="mt-6">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    {...event} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-card/50 rounded-lg border border-white/10">
                <Users2 className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-white/60">Try adjusting your filters or search term</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="buddies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buddies.map(buddy => (
                <BuddyCard key={buddy.id} {...buddy} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-6">
            <EventCalendar events={calendarEvents} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AttendeeDashboard;
