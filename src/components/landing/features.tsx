
import { useEffect, useRef } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

const FeatureCard = ({ title, description, icon, delay = 0 }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add("animate-fade-in");
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="gradient-card rounded-2xl p-6 opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-full flex flex-col p-2">
        {/* Background glow effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/20 rounded-full filter blur-xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
            <div className="text-2xl">{icon}</div>
          </div>
          
          <h3 className="text-xl font-montserrat font-semibold mb-3">{title}</h3>
          <p className="text-white/70">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-4 text-center">
          Powerful <span className="hero-gradient">Features</span>
        </h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">
          Connect, discover, and engage with campus events through our feature-rich platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="EventBuddy"
            description="Find friends with similar interests to attend events with. Connect before, during, and after events to build meaningful relationships."
            icon="👥"
            delay={0}
          />
          
          <FeatureCard
            title="Event Calendar"
            description="Color-coded calendar system that helps you visualize your schedule. Never double-book or miss an important event again."
            icon="📅"
            delay={200}
          />
          
          <FeatureCard
            title="Categories"
            description="Browse events by category including Sports, Hackathons, Networking, Workshops, and Speaker Sessions."
            icon="🏷️"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
