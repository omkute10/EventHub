
const Footer = () => {
  return (
    <footer className="bg-card py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-montserrat font-bold bg-gradient-to-r from-[#6E45E2] to-[#88D3CE] bg-clip-text text-transparent">
              EventHub by Vortex
            </h2>
            <p className="text-white/60 mt-2">Your Campus Event Universe</p>
          </div>
          
          <div className="flex flex-wrap gap-8 justify-center">
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-white/60 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-white/60 hover:text-white transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/60 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EventHub by Vortex. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
