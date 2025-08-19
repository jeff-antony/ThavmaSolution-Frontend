import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Modern MRI Room Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-primary/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="hero-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 hero-title drop-shadow-lg">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent drop-shadow-none">
              Thavma Solutions
            </span>
          </h1>
        </div>
        
        <div className="hero-subtitle">
          <h2 className="text-2xl md:text-3xl font-medium text-white/95 mb-8 drop-shadow-md">
            Where Innovation Meets Interior Elegance
          </h2>
        </div>

        <div className="hero-description max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed drop-shadow-sm">
            We specialize in crafting high-precision MRI room interiors, including airtight 
            MRI door fittings and ongoing maintenance solutions that meet safety and design standards.
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-sm">
            Our services also span to residential and commercial interiors, creating warm, 
            calming, and intelligent spaces that inspire creativity and wellness.
          </p>
          <p className="text-lg font-medium text-accent mb-12 drop-shadow-sm">
            Located in Ernakulam, Kerala – Serving Clients Across India & Globally
          </p>
          
          <Button className="btn-gradient text-lg px-12 py-4">
            Explore Our Services
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;