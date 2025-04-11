import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, User, ChevronDown, LogOut, Search, X, Send } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [showChatDropdown, setShowChatDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{id: number, name: string, avatar: string} | null>(null);
  const [messageText, setMessageText] = useState("");
  
  const userName = userType === "attendee" ? "Jamie Smith" : "Event Organizer";

  // Sample users for the chat dropdown
  const users = [
    { id: 1, name: "Alex Johnson", avatar: "/alex.jpg", status: "online" },
    { id: 2, name: "Sophia Chen", avatar: "/sophia.jpg", status: "offline" },
    { id: 3, name: "Marcus Lee", avatar: "/marcus.jpg", status: "online" },
    { id: 4, name: "Olivia Kim", avatar: "/olivia.jpg", status: "offline" },
    { id: 5, name: "Ethan Wilson", avatar: "", status: "online" },
    { id: 6, name: "Isabella Rodriguez", avatar: "", status: "offline" }
  ];

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
    if (showChatDropdown) setShowChatDropdown(false);
  };

  const toggleChatDropdown = () => {
    setShowChatDropdown(!showChatDropdown);
    if (showNotifications) setShowNotifications(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartChat = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser({
        id: user.id,
        name: user.name,
        avatar: user.avatar
      });
      setShowMessageDialog(true);
      setShowChatDropdown(false);
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      toast({
        title: "Message sent!",
        description: `Your message to ${selectedUser.name} has been sent.`,
      });
      setMessageText("");
      setShowMessageDialog(false);
    }
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
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleChatDropdown}
                className="relative text-white/70 hover:text-white hover:bg-white/5"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center">
                  3
                </span>
              </Button>
              
              {/* Chat Dropdown */}
              {showChatDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-white/10 z-50">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Messages</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-primary h-auto p-0"
                        onClick={() => setShowChatDropdown(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border-b border-white/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        type="text"
                        placeholder="Search people..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-9 bg-white/5 border-white/10 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="max-h-72 overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <div 
                          key={user.id}
                          className="p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer flex items-center"
                          onClick={() => handleStartChat(user.id)}
                        >
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-primary/20 text-primary">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-medium text-sm">{user.name}</h4>
                              <span className={`ml-2 h-2 w-2 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-white/30"}`}></span>
                            </div>
                            <p className="text-xs text-white/50">Click to start chat</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-white/50 text-sm">
                        No users found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Profile Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative text-white/70 hover:text-white hover:bg-white/5"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card border-white/10">
              <DropdownMenuLabel className="text-white/70">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications Button */}
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
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="bg-card border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedUser && (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {selectedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>Message {selectedUser.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="bg-white/5 rounded-md p-4 h-32 mb-4">
            <div className="text-center text-white/50 text-sm">
              {selectedUser && `This is the beginning of your conversation with ${selectedUser.name}`}
            </div>
          </div>
          
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="bg-white/5 border-white/10 focus-visible:ring-primary resize-none"
            rows={3}
          />
          
          <DialogFooter>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowMessageDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="default"
              size="sm"
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
