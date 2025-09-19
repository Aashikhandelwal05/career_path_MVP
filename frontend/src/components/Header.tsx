import { Button } from "@/components/ui/button";
import LanguageRegionSwitcher from "./LanguageRegionSwitcher";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-display font-bold text-2xl text-foreground">
            Career<span className="text-coral">Path</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#stories" className="text-foreground hover:text-coral transition-colors">
              Stories
            </a>
            <a href="#roadmaps" className="text-foreground hover:text-coral transition-colors">
              Roadmaps
            </a>
            <a href="/about" className="text-foreground hover:text-coral transition-colors">
              About
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageRegionSwitcher />
            {/* <Button variant="ghost">Sign In</Button>
            <Button variant="coral">Get Started</Button> */}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#stories" className="text-foreground hover:text-coral transition-colors">
                Stories
              </a>
              <a href="#roadmaps" className="text-foreground hover:text-coral transition-colors">
                Roadmaps
              </a>
              <a href="/about" className="text-foreground hover:text-coral transition-colors">
                About
              </a>
              <div className="pt-4 border-t border-border">
                <LanguageRegionSwitcher />
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="ghost" className="justify-start">Sign In</Button>
                <Button variant="coral" className="justify-start">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;