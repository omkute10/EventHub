
import React from "react";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import Stats from "@/components/landing/stats";
import Features from "@/components/landing/features";
import Testimonials from "@/components/landing/testimonials";
import Contact from "@/components/landing/contact";
import Footer from "@/components/landing/footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      
      <div className="pt-16"> {/* Add padding for the navbar */}
        <Hero />
        <About />
        <Stats />
        <Features />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
