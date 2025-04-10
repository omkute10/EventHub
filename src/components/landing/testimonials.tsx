
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Computer Science Student",
    image: "/profile1.jpg",
    quote: "EventHub completely changed how I experience campus events. The EventBuddy feature helped me find friends with similar interests, and now we attend hackathons together regularly.",
  },
  {
    name: "Sophia Chen",
    role: "Event Organizer",
    image: "/profile2.jpg",
    quote: "As an organizer, I've been able to reach 3x more attendees since using EventHub. The platform's promotion tools and analytics make planning and improving events so much easier.",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-4 text-center">
          What Our <span className="hero-gradient">Users</span> Say
        </h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">
          Join thousands of students and organizers who have transformed their campus experience
        </p>
        
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`glass-card rounded-2xl p-8 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full filter blur-xl transform translate-x-10 -translate-y-10"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                    {/* This would be an actual image in production */}
                    <div className="text-xl">{index === 0 ? '👨' : '👩'}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="text-4xl text-primary/30 absolute -top-3 -left-2">"</div>
                  <p className="text-white/80 relative z-10">
                    {testimonial.quote}
                  </p>
                  <div className="text-4xl text-primary/30 absolute bottom-0 right-0">"</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
