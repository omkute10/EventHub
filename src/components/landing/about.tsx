
import { useEffect, useRef } from "react";

const About = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }
    
    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left side - Animation */}
          <div 
            ref={animationRef} 
            className="w-full lg:w-1/2 opacity-0"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex justify-center">
              {/* This would be where you'd implement your Lottie animation */}
              <div className="relative h-80 w-80">
                {/* Network nodes visualization */}
                <div className="absolute w-full h-full rounded-full border border-primary/30 animate-pulse-slow"></div>
                <div className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/30 animate-pulse-slow" style={{ animationDelay: "500ms" }}></div>
                <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 animate-pulse-slow" style={{ animationDelay: "1000ms" }}></div>
                
                {/* Network nodes */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-secondary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-secondary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-secondary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-secondary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/4 left-3/4 w-2 h-2 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  {/* Center to mid nodes */}
                  <line x1="100" y1="100" x2="100" y2="50" stroke="hsl(var(--secondary))" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="100" y1="100" x2="100" y2="150" stroke="hsl(var(--secondary))" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="100" y1="100" x2="50" y2="100" stroke="hsl(var(--secondary))" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="100" y1="100" x2="150" y2="100" stroke="hsl(var(--secondary))" strokeWidth="1" strokeOpacity="0.5" />
                  
                  {/* Mid to corner nodes */}
                  <line x1="100" y1="50" x2="50" y2="50" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="100" y1="50" x2="150" y2="50" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="50" y1="100" x2="50" y2="50" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="50" y1="100" x2="50" y2="150" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="150" y1="100" x2="150" y2="50" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="150" y1="100" x2="150" y2="150" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="100" y1="150" x2="50" y2="150" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="100" y1="150" x2="150" y2="150" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right side - Text */}
          <div 
            ref={textRef} 
            className="w-full lg:w-1/2 opacity-0"
            style={{ transitionDelay: "400ms" }}
          >
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-6 text-center lg:text-left">
              <span className="hero-gradient">Connect</span> with your campus community
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              EventHub bridges students and organizers with real-time event tracking, AI-curated matches, and seamless RSVPs. We make it effortless to discover events that match your interests and connect with like-minded peers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 className="font-medium">Real-time Updates</h3>
                  <p className="text-sm text-white/60">Never miss any event updates</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-secondary"></div>
                </div>
                <div>
                  <h3 className="font-medium">Personalized Matches</h3>
                  <p className="text-sm text-white/60">Find events that fit your interests</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-accent"></div>
                </div>
                <div>
                  <h3 className="font-medium">Event Buddies</h3>
                  <p className="text-sm text-white/60">Connect with like-minded attendees</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-event-speakers/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-event-speakers"></div>
                </div>
                <div>
                  <h3 className="font-medium">Easy Organization</h3>
                  <p className="text-sm text-white/60">Create and manage events effortlessly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
