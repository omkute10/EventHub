
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import RoleCard from "@/components/auth/role-card";
import InterestPicker from "@/components/auth/interest-picker";
import OrganizerDetails from "@/components/auth/organizer-details";

type SignupStep = "role" | "form" | "interests" | "organizer-details";
type UserRole = "attendee" | "organizer" | null;

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<SignupStep>("role");
  const [role, setRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep("form");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating form submission to Firebase Auth
    setTimeout(() => {
      setIsLoading(false);
      
      if (formData.password.length < 6) {
        return toast({
          variant: "destructive",
          title: "Sign up failed",
          description: "Password must be at least 6 characters.",
        });
      }
      
      // Set next step based on role
      if (role === "attendee") {
        setStep("interests");
      } else {
        setStep("organizer-details");
      }
    }, 1000);
  };

  const handleInterestsSelected = (selectedInterests: string[]) => {
    setInterests(selectedInterests);
    
    // Show success toast
    toast({
      title: "Account created successfully!",
      description: "Welcome to EventHub!",
    });
    
    // Redirect to attendee dashboard
    setTimeout(() => {
      navigate("/attendee-dashboard");
    }, 1500);
  };

  const handleOrganizerDetailsSubmitted = () => {
    // Show success toast
    toast({
      title: "Account created successfully!",
      description: "Welcome to EventHub!",
    });
    
    // Redirect to organizer dashboard
    setTimeout(() => {
      navigate("/organizer-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="z-10 w-full max-w-md">
        {step === "role" && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-montserrat font-bold hero-gradient">
                Create Account
              </h1>
              <p className="text-white/70 mt-2">
                Choose your role to get started
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <RoleCard
                title="Attendee"
                description="Discover events, connect with event buddies, and manage your schedule."
                icon="👤"
                selected={role === "attendee"}
                onClick={() => handleRoleSelect("attendee")}
              />
              
              <RoleCard
                title="Organizer"
                description="Plan and manage events, track attendance, and grow your audience."
                icon="🎪"
                selected={role === "organizer"}
                onClick={() => handleRoleSelect("organizer")}
              />
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                variant="ghost" 
                className="text-white/40 hover:text-white"
                onClick={() => navigate("/")}
              >
                ← Back to Homepage
              </Button>
            </div>
          </>
        )}
        
        {step === "form" && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-montserrat font-bold hero-gradient">
                Create {role === "attendee" ? "Attendee" : "Organizer"} Account
              </h1>
              <p className="text-white/70 mt-2">
                Fill in your details to continue
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    disabled={isLoading}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isLoading}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-white/80">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white"
                  >
                    {isLoading ? "Creating Account..." : "Continue"}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-white/60">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto font-normal"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </Button>
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                variant="ghost" 
                className="text-white/40 hover:text-white"
                onClick={() => setStep("role")}
              >
                ← Back
              </Button>
            </div>
          </>
        )}
        
        {step === "interests" && (
          <div className="glass-card rounded-2xl p-8">
            <InterestPicker onInterestsSelected={handleInterestsSelected} />
          </div>
        )}
        
        {step === "organizer-details" && (
          <div className="glass-card rounded-2xl p-8">
            <OrganizerDetails onDetailsSubmitted={handleOrganizerDetailsSubmitted} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
