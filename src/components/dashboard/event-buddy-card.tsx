
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, UserPlus, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BuddyCardProps {
  id: number;
  name: string;
  interests: string[];
  mutualEvents?: string[];
  avatar: string;
}

const BuddyCard = ({ id, name, interests, mutualEvents = [], avatar }: BuddyCardProps) => {
  const { toast } = useToast();
  const [isFriend, setIsFriend] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleFriendRequest = () => {
    setIsFriend(true);
    toast({
      title: "Friend request sent!",
      description: `Your request to ${name} has been sent.`,
    });
  };

  const handleChatSubmit = () => {
    if (message.trim()) {
      toast({
        title: "Message sent!",
        description: `Your message to ${name} has been sent.`,
      });
      setMessage("");
      setIsChatOpen(false);
    }
  };

  return (
    <>
      <div className="bg-card rounded-xl overflow-hidden border border-white/10 hover-float transition-all duration-300">
        <div className="p-5">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-white/60">
                {mutualEvents.length > 0 
                  ? `${mutualEvents.length} mutual event${mutualEvents.length > 1 ? "s" : ""}` 
                  : "No mutual events"}
              </p>
            </div>
          </div>
          
          {mutualEvents.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-medium text-white/70 mb-2">Mutual Events:</h4>
              <div className="flex flex-wrap gap-1">
                {mutualEvents.map((event, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="bg-primary/10 text-primary/90 border-primary/30 text-[10px]"
                  >
                    {event}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <h4 className="text-xs font-medium text-white/70 mb-2">Interests:</h4>
            <div className="flex flex-wrap gap-1">
              {interests.map((interest, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="bg-white/5 text-[10px]"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4 pt-4 border-t border-white/10">
            <Button 
              variant="outline"
              size="sm"
              className="flex-1 text-sm border-white/10 bg-white/5"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
            
            <Button
              variant={isFriend ? "secondary" : "default"}
              size="sm"
              className="flex-1 text-sm"
              onClick={handleFriendRequest}
              disabled={isFriend}
            >
              {isFriend ? (
                "Requested"
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chat Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="bg-card border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/20 text-primary">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>Message {name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="bg-white/5 rounded-md p-4 h-32">
            <div className="text-center text-white/50 text-sm">
              This is the beginning of your conversation with {name}
            </div>
          </div>
          
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="bg-white/5 border-white/10 focus-visible:ring-primary resize-none"
          />
          
          <DialogFooter>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsChatOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="default"
              size="sm"
              onClick={handleChatSubmit}
              disabled={!message.trim()}
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuddyCard;
