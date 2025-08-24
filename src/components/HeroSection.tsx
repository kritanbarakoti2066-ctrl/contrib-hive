import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Code, Star, Sparkles } from "lucide-react";
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
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Hero image overlay */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src={heroImage} 
          alt="Developer collaboration" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Join the Open Source Revolution
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in leading-tight">
            Discover Your Next
            <span className="block bg-gradient-to-r from-white via-accent-foreground to-white bg-clip-text text-transparent mt-2">
              Open Source Contribution
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-white/90 animate-fade-in max-w-4xl mx-auto leading-relaxed">
            Connect with projects that need your skills. Find beginner-friendly issues, 
            contribute to meaningful projects, and grow your developer journey with our community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button size="lg" variant="secondary" className="group hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl">
              <Search className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Explore Projects
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-all duration-300">
              Start Contributing
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 border border-white/30">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator - enhanced */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;