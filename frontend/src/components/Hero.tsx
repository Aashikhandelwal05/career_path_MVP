import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Target } from "lucide-react";
import heroImage from "@/assets/hero-careers.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your{" "}
          <span className="bg-gradient-accent bg-clip-text text-transparent">
            Perfect Career Match
          </span>{" "}
          in Minutes
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light">
          Like having a startup cofounder who gets you. Real stories, honest advice, 
          and a clear path forward. No more career confusion.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={handleSignupClick}
            className="group"
          >
            <Target className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="glass" 
            size="xl"
            onClick={() => {
              const storiesSection = document.getElementById('stories');
              storiesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Play className="w-5 h-5 mr-2" />
            Explore Stories
          </Button>
          
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-coral/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-teal/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/2 right-8 w-16 h-16 bg-mustard/20 rounded-full blur-lg animate-pulse" />
    </section>
  );
};

export default Hero;