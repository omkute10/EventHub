
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, User, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  userType: "attendee" | "organizer";
}

const Header = ({ userType }: HeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New friend request", message: "Alex wants to be your EventBuddy", time: "5m ago" },
    { id: 2, title: "Event reminder", message: "AI Hackathon starts in 2 hours", time: "1h ago" },
    { id: 3, title: "Event update", message: "Campus Job Fair has changed venues", time: "3h ago" }
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  
  const userName = userType === "attendee" ? "Jamie Smith" : "Event Organizer";

  const handleLogout = () => {
    // Show toast notification
    toast({
      title: "Logged out successfully",
      description: "We hope to see you again soon!",
    });
    
    // Navigate to home page
    navigate("/");
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-card/70 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-xl font-montserrat font-bold bg-gradient-to-r from-[#6E45E2] to-[#88D3CE] bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate("/")}
        >
          EventHub
        </div>
        
        {/* Right Side - User Menu, Notifications, etc. */}
        <div className="flex items-center space-x-2">
          {userType === "attendee" && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/chat")}
              className="relative text-white/70 hover:text-white hover:bg-white/5"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center">
                3
              </span>
            </Button>
          )}
          
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleNotifications}
              className="relative text-white/70 hover:text-white hover:bg-white/5"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center">
                {notifications.length}
              </span>
            </Button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-white/10 z-50">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Notifications</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-primary h-auto p-0"
                    >
                      Mark all as read
                    </Button>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-white/40">{notification.time}</span>
                      </div>
                      <p className="text-sm text-white/70 mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <Button 
                    variant="link" 
                    className="text-primary text-xs h-auto p-0"
                  >
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-card border-white/10"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                className="cursor-pointer flex items-center"
                onClick={() => navigate("/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
