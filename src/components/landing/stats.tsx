
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const Counter = ({ end, label, suffix = "", delay = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const countStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countStarted.current) {
          countStarted.current = true;
          
          setTimeout(() => {
            let start = 0;
            const duration = 2000; // 2 seconds
            const step = Math.floor(duration / end);
            
            const timer = setInterval(() => {
              start += 1;
              setCount(start);
              
              if (start >= end) {
                clearInterval(timer);
                setCount(end);
              }
            }, step);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, delay]);

  return (
    <div 
      ref={nodeRef} 
      className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center hover-float transition-all duration-500 h-full"
    >
      <div className="text-4xl font-montserrat font-bold mb-2 hero-gradient">
        {count}{suffix}
      </div>
      <div className="text-white/70">{label}</div>
    </div>
  );
};

const Stats = () => {
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

  const stats = [
    { end: 100, label: "Events", suffix: "+", delay: 0 },
    { end: 1000, label: "Students", suffix: "+", delay: 300 },
    { end: 50, label: "Organizers", suffix: "+", delay: 600 },
    { end: 95, label: "Satisfaction", suffix: "%", delay: 900 },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-12 text-center">
          The <span className="hero-gradient">Numbers</span> Speak
        </h2>
        
        <div 
          ref={containerRef} 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {stats.map((stat, index) => (
            <Counter
              key={index}
              end={stat.end}
              label={stat.label}
              suffix={stat.suffix}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
