
import { useEffect, useState } from "react";
import { GradientButton } from "@/components/ui/gradient-button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 
              className={`text-5xl sm:text-7xl font-montserrat font-bold hero-gradient animate-glow ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            >
              EventHub
            </h1>
            
            <h2 
              className={`text-2xl sm:text-3xl text-white/90 font-light ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-300`}
            >
              Your Campus Event Universe.
            </h2>
            
            <div className="space-y-4">
              {[
                "Discover 100+ events.",
                "Connect with EventBuddies.",
                "Never miss a deadline."
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-3 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${(index + 1) * 300}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                  <p className="text-lg text-white/80">{item}</p>
                </div>
              ))}
            </div>
            
            <GradientButton 
              size="lg"
              className={`mt-8 text-lg group relative overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-1000 delay-1000`}
              onClick={() => window.location.href = "/signup"}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </GradientButton>
          </div>
          
          {/* Right Side - Animation */}
          <div className="flex-1 max-w-lg">
            {/* This would be where you'd implement your 3D animation */}
            <div className={`relative ${isVisible ? 'animate-float' : 'opacity-0'} transition-opacity duration-1000 delay-500`}>
              <div className="relative h-80 sm:h-96 w-full perspective-card animate-float">
                {/* Card 1 */}
                <div className="absolute top-0 left-0 w-64 h-80 glass-card rounded-2xl transform rotate-[-15deg] translate-x-12 translate-y-8 hover-scale">
                  <div className="p-6 h-full flex flex-col">
                    <div className="w-full h-32 rounded-lg bg-accent/20 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-6 w-3/4 bg-white/10 rounded-md"></div>
                      <div className="h-4 w-1/2 bg-white/10 rounded-md"></div>
                      <div className="h-4 w-2/3 bg-white/10 rounded-md"></div>
                    </div>
                  </div>
                </div>
                
                {/* Card 2 */}
                <div className="absolute top-0 left-0 w-64 h-80 glass-card rounded-2xl transform rotate-[5deg] translate-x-4 translate-y-4 hover-scale">
                  <div className="p-6 h-full flex flex-col">
                    <div className="w-full h-32 rounded-lg bg-primary/20 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-6 w-3/4 bg-white/10 rounded-md"></div>
                      <div className="h-4 w-1/2 bg-white/10 rounded-md"></div>
                      <div className="h-4 w-2/3 bg-white/10 rounded-md"></div>
                    </div>
                  </div>
                </div>
                
                {/* Card 3 - Top card */}
                <div className="absolute top-0 left-0 w-64 h-80 glass-card rounded-2xl hover-scale">
                  <div className="p-6 h-full flex flex-col">
                    <div className="w-full h-32 rounded-lg bg-secondary/20 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-6 w-3/4 bg-white/10 rounded-md"></div>
                      <div className="h-4 w-1/2 bg-white/10 rounded-md"></div>
                      <div className="h-4 w-2/3 bg-white/10 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
