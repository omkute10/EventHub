
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would authenticate with Firebase
    // Simulating a login request
    setTimeout(() => {
      setIsLoading(false);
      
      // Hardcoded user role for demo
      const userRole = formData.email.includes("organizer") ? "organizer" : "attendee";
      
      if (formData.password.length < 6) {
        return toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Try again.",
        });
      }
      
      // Success
      toast({
        title: "Login successful",
        description: "Welcome back to EventHub!",
      });
      
      // Redirect to appropriate dashboard
      navigate(`/${userRole}-dashboard`);
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-montserrat font-bold hero-gradient">
            Welcome Back
          </h1>
          <p className="text-white/70 mt-2">
            Sign in to continue to your EventHub account
          </p>
        </div>
        
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-white/80">
                  Password
                </label>
                <a href="#" className="text-xs text-primary hover:text-primary/80">
                  Forgot Password?
                </a>
              </div>
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
            
            <GradientButton
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </GradientButton>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/60">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="text-primary p-0 h-auto font-normal"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </p>
          </div>
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
      </div>
    </div>
  );
};

export default Login;
