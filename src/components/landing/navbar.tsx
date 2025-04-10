
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-montserrat font-bold bg-gradient-to-r from-[#6E45E2] to-[#88D3CE] bg-clip-text text-transparent">
            EventHub by Vortex
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {["home", "features", "testimonials", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-white/70 hover:text-white transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex space-x-4">
          <Button 
            variant="outline" 
            className="border-white/20 hover:bg-white/10"
            onClick={() => window.location.href = "/login"}
          >
            Login
          </Button>
          <GradientButton 
            className="animate-pulse-slow" 
            onClick={() => window.location.href = "/signup"}
          >
            Sign Up
          </GradientButton>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-lg border-b border-white/10">
          <div className="px-4 py-4 space-y-4">
            {["home", "features", "testimonials", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <div className="flex space-x-3 pt-2">
              <Button 
                variant="outline" 
                className="w-1/2 border-white/20"
                onClick={() => window.location.href = "/login"}
              >
                Login
              </Button>
              <GradientButton 
                className="w-1/2" 
                onClick={() => window.location.href = "/signup"}
              >
                Sign Up
              </GradientButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
