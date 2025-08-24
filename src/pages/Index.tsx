import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import SearchFilters from "@/components/SearchFilters";
import ProjectGrid from "@/components/ProjectGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Code2, Heart } from "lucide-react";

interface FilterState {
  category: string;
  difficulty: string;
  techStack: string[];
  issueType: string;
  language: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    difficulty: "",
    techStack: [],
    issueType: "",
    language: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock project data
  const mockProjects = [
    {
      id: "1",
      name: "react-awesome-ui",
      description: "A comprehensive React UI component library with modern design patterns and accessibility features built-in.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
      stars: 15420,
      forks: 2340,
      contributors: 89,
      lastUpdated: "2 hours ago",
      issuesCount: 45,
      goodFirstIssues: 12,
      helpWantedIssues: 8,
      language: "TypeScript",
      difficulty: "Beginner" as const,
      healthScore: 95
    },
    {
      id: "2", 
      name: "ml-training-pipeline",
      description: "Scalable machine learning training pipeline with automated model versioning and deployment capabilities.",
      techStack: ["Python", "TensorFlow", "Docker", "Kubernetes"],
      stars: 8920,
      forks: 1560,
      contributors: 45,
      lastUpdated: "1 day ago",
      issuesCount: 23,
      goodFirstIssues: 5,
      helpWantedIssues: 15,
      language: "Python",
      difficulty: "Advanced" as const,
      healthScore: 88
    },
    {
      id: "3",
      name: "devtools-extension",
      description: "Browser extension for enhanced developer productivity with debugging tools and performance monitoring.",
      techStack: ["JavaScript", "Chrome APIs", "CSS", "HTML"],
      stars: 5670,
      forks: 890,
      contributors: 32,
      lastUpdated: "3 days ago",
      issuesCount: 18,
      goodFirstIssues: 8,
      helpWantedIssues: 4,
      language: "JavaScript",
      difficulty: "Intermediate" as const,
      healthScore: 82
    },
    {
      id: "4",
      name: "go-microservices",
      description: "Production-ready microservices architecture template with observability, testing, and deployment automation.",
      techStack: ["Go", "gRPC", "PostgreSQL", "Redis"],
      stars: 12100,
      forks: 1890,
      contributors: 67,
      lastUpdated: "5 hours ago",
      issuesCount: 31,
      goodFirstIssues: 9,
      helpWantedIssues: 12,
      language: "Go",
      difficulty: "Advanced" as const,
      healthScore: 91
    },
    {
      id: "5",
      name: "design-system-tokens",
      description: "Universal design system tokens package that works across multiple platforms and frameworks.",
      techStack: ["JavaScript", "CSS", "Figma", "JSON"],
      stars: 3450,
      forks: 540,
      contributors: 28,
      lastUpdated: "1 week ago",
      issuesCount: 14,
      goodFirstIssues: 6,
      helpWantedIssues: 3,
      language: "JavaScript",
      difficulty: "Beginner" as const,
      healthScore: 76
    },
    {
      id: "6",
      name: "blockchain-wallet",
      description: "Secure cryptocurrency wallet with multi-chain support and advanced security features.",
      techStack: ["Rust", "WebAssembly", "React", "Electron"],
      stars: 7800,
      forks: 1240,
      contributors: 41,
      lastUpdated: "4 days ago",
      issuesCount: 27,
      goodFirstIssues: 4,
      helpWantedIssues: 18,
      language: "Rust",
      difficulty: "Advanced" as const,
      healthScore: 85
    }
  ];

  const [projects, setProjects] = useState(mockProjects);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockProjects.filter(project =>
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
      );
      setProjects(filtered);
      setIsLoading(false);
    }, 800);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsLoading(true);
    
    // Simulate filtering
    setTimeout(() => {
      let filtered = [...mockProjects];
      
      if (newFilters.difficulty) {
        filtered = filtered.filter(p => p.difficulty === newFilters.difficulty);
      }
      
      if (newFilters.language) {
        filtered = filtered.filter(p => p.language.toLowerCase() === newFilters.language.toLowerCase());
      }
      
      if (newFilters.techStack.length > 0) {
        filtered = filtered.filter(p => 
          newFilters.techStack.some(tech => 
            p.techStack.some(pTech => pTech.toLowerCase().includes(tech.toLowerCase()))
          )
        );
      }
      
      setProjects(filtered);
      setIsLoading(false);
    }, 600);
  };

  const featuredCategories = [
    { name: "Web Development", count: "2,500+ projects", icon: Code2, color: "bg-blue-500/10 text-blue-600" },
    { name: "AI/ML", count: "1,200+ projects", icon: TrendingUp, color: "bg-purple-500/10 text-purple-600" },
    { name: "Mobile", count: "800+ projects", icon: Users, color: "bg-green-500/10 text-green-600" },
    { name: "DevOps", count: "600+ projects", icon: Heart, color: "bg-orange-500/10 text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover projects across different domains and find the perfect match for your skills and interests.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border card-hover cursor-pointer">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Discovery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Discover Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find open source projects that match your skills and interests. Filter by technology, difficulty, and contribution type.
            </p>
          </div>

          <div className="space-y-8">
            <SearchFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
            
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">
                  {projects.length} Projects Found
                </h3>
                {(searchQuery || Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v !== "")) && (
                  <Badge variant="secondary">Filtered Results</Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Sorted by relevance
              </div>
            </div>

            <ProjectGrid 
              projects={projects}
              isLoading={isLoading}
              hasMore={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;