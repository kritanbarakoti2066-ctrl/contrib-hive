import { Button } from "@/components/ui/button";
import { Search, Users, Code, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const stats = [
    { icon: Code, label: "Active Projects", value: "12,000+" },
    { icon: Users, label: "Contributors", value: "50,000+" },
    { icon: Star, label: "Issues Resolved", value: "75,000+" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Hero image overlay */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Developer collaboration" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover Your Next
            <span className="block bg-gradient-to-r from-white to-accent-foreground bg-clip-text text-transparent">
              Open Source Contribution
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
            Connect with projects that need your skills. Find beginner-friendly issues, 
            contribute to meaningful projects, and grow your developer journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button size="lg" variant="secondary" className="group hover:scale-105 transition-transform">
              <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Explore Projects
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Start Contributing
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;