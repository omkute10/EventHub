import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp, User, Mail, Calendar, MapPin, CreditCard, LogOut } from "lucide-react";

// Mock user data - replace with actual user data from your auth system
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "attendee", // or "organizer"
  interests: ["Technology", "Music", "Sports"],
  events: [
    { id: 1, name: "Tech Conference 2024", date: "2024-03-15", status: "upcoming" },
    { id: 2, name: "Music Festival", date: "2024-02-20", status: "completed" },
  ],
  organizerDetails: {
    organization: "Tech Events Inc",
    eventsCreated: 5,
    rating: 4.8,
  }
};

export default function Profile() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    interests: false,
    events: false,
    organizerInfo: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" alt={mockUser.name} />
            <AvatarFallback className="bg-primary/20 text-primary text-2xl">
              {mockUser.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-white">{mockUser.name}</h1>
            <p className="text-white/70">{mockUser.email}</p>
          </div>
        </div>

        {/* Personal Information Section */}
        <Card className="bg-card/50 border-white/10">
          <CardHeader 
            className="cursor-pointer hover:bg-white/5"
            onClick={() => toggleSection("personalInfo")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
              {expandedSections.personalInfo ? <ChevronUp className="h-5 w-5 text-white/70" /> : <ChevronDown className="h-5 w-5 text-white/70" />}
            </div>
          </CardHeader>
          {expandedSections.personalInfo && (
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-white/70">
                <Mail className="h-4 w-4" />
                <span>{mockUser.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <User className="h-4 w-4" />
                <span>Role: {mockUser.role.charAt(0).toUpperCase() + mockUser.role.slice(1)}</span>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Interests Section */}
        <Card className="bg-card/50 border-white/10">
          <CardHeader 
            className="cursor-pointer hover:bg-white/5"
            onClick={() => toggleSection("interests")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Interests
              </CardTitle>
              {expandedSections.interests ? <ChevronUp className="h-5 w-5 text-white/70" /> : <ChevronDown className="h-5 w-5 text-white/70" />}
            </div>
          </CardHeader>
          {expandedSections.interests && (
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockUser.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Events Section */}
        <Card className="bg-card/50 border-white/10">
          <CardHeader 
            className="cursor-pointer hover:bg-white/5"
            onClick={() => toggleSection("events")}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                My Events
              </CardTitle>
              {expandedSections.events ? <ChevronUp className="h-5 w-5 text-white/70" /> : <ChevronDown className="h-5 w-5 text-white/70" />}
            </div>
          </CardHeader>
          {expandedSections.events && (
            <CardContent className="space-y-4">
              {mockUser.events.map(event => (
                <div 
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <h3 className="text-white font-medium">{event.name}</h3>
                    <p className="text-white/70 text-sm">{event.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.status === "upcoming" 
                      ? "bg-primary/20 text-primary" 
                      : "bg-green-500/20 text-green-500"
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Organizer Information Section - Only show for organizers */}
        {mockUser.role === "organizer" && (
          <Card className="bg-card/50 border-white/10">
            <CardHeader 
              className="cursor-pointer hover:bg-white/5"
              onClick={() => toggleSection("organizerInfo")}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Organizer Information
                </CardTitle>
                {expandedSections.organizerInfo ? <ChevronUp className="h-5 w-5 text-white/70" /> : <ChevronDown className="h-5 w-5 text-white/70" />}
              </div>
            </CardHeader>
            {expandedSections.organizerInfo && (
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-white/70">
                  <User className="h-4 w-4" />
                  <span>Organization: {mockUser.organizerDetails.organization}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <Calendar className="h-4 w-4" />
                  <span>Events Created: {mockUser.organizerDetails.eventsCreated}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <CreditCard className="h-4 w-4" />
                  <span>Rating: {mockUser.organizerDetails.rating}/5</span>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Logout Button */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            className="text-white/70 hover:text-white border-white/10 hover:bg-white/5"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
} 