
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to Firebase
    setTimeout(() => {
      toast({
        title: "Message received!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-4 text-center">
          Get In <span className="hero-gradient">Touch</span>
        </h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">
          Have questions or feedback? We'd love to hear from you!
        </p>
        
        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 focus-visible:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 focus-visible:ring-primary"
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <label htmlFor="message" className="text-sm font-medium text-white/80">
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="bg-white/5 border-white/10 focus-visible:ring-primary resize-none"
              />
            </div>
            
            <div className="flex justify-end">
              <GradientButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </GradientButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
