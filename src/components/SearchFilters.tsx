import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  difficulty: string;
  techStack: string[];
  issueType: string;
  language: string;
}

const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    difficulty: "",
    techStack: [],
    issueType: "",
    language: ""
  });

  const categories = [
    "Web Development", "Mobile", "AI/ML", "DevOps", "Data Science", 
    "Blockchain", "Game Development", "Desktop", "API/Backend", "UI/UX Tools"
  ];

  const techStacks = [
    "React", "TypeScript", "Python", "JavaScript", "Java", "Go", 
    "Rust", "Vue.js", "Angular", "Node.js", "Docker", "Kubernetes"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const addTechStack = (tech: string) => {
    if (!filters.techStack.includes(tech)) {
      const newFilters = { ...filters, techStack: [...filters.techStack, tech] };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const removeTechStack = (tech: string) => {
    const newFilters = { ...filters, techStack: filters.techStack.filter(t => t !== tech) };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      category: "",
      difficulty: "",
      techStack: [],
      issueType: "",
      language: ""
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ""
  );

  return (
    <div className="bg-gradient-to-r from-card/80 to-card border rounded-2xl p-8 space-y-8 backdrop-blur-sm">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search projects, issues, or technologies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 h-14 text-lg border-2 bg-background/50 focus:bg-background transition-all duration-300 rounded-xl"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10 blur-xl"></div>
      </form>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
          <SelectTrigger className="h-12 border-2 bg-background/50 hover:bg-background transition-all duration-300 rounded-xl">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {categories.map(category => (
              <SelectItem key={category} value={category} className="rounded-lg">{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.difficulty} onValueChange={(value) => updateFilter('difficulty', value)}>
          <SelectTrigger className="h-12 border-2 bg-background/50 hover:bg-background transition-all duration-300 rounded-xl">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="Beginner" className="rounded-lg">Beginner</SelectItem>
            <SelectItem value="Intermediate" className="rounded-lg">Intermediate</SelectItem>
            <SelectItem value="Advanced" className="rounded-lg">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.issueType} onValueChange={(value) => updateFilter('issueType', value)}>
          <SelectTrigger className="h-12 border-2 bg-background/50 hover:bg-background transition-all duration-300 rounded-xl">
            <SelectValue placeholder="Issue Type" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="good-first-issue" className="rounded-lg">Good First Issue</SelectItem>
            <SelectItem value="help-wanted" className="rounded-lg">Help Wanted</SelectItem>
            <SelectItem value="bug" className="rounded-lg">Bug Fix</SelectItem>
            <SelectItem value="feature" className="rounded-lg">Feature Request</SelectItem>
            <SelectItem value="documentation" className="rounded-lg">Documentation</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.language} onValueChange={(value) => updateFilter('language', value)}>
          <SelectTrigger className="h-12 border-2 bg-background/50 hover:bg-background transition-all duration-300 rounded-xl">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="javascript" className="rounded-lg">JavaScript</SelectItem>
            <SelectItem value="typescript" className="rounded-lg">TypeScript</SelectItem>
            <SelectItem value="python" className="rounded-lg">Python</SelectItem>
            <SelectItem value="java" className="rounded-lg">Java</SelectItem>
            <SelectItem value="go" className="rounded-lg">Go</SelectItem>
            <SelectItem value="rust" className="rounded-lg">Rust</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tech Stack Tags */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-semibold">Tech Stack</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {techStacks.map(tech => (
            <Badge
              key={tech}
              variant={filters.techStack.includes(tech) ? "default" : "outline"}
              className="cursor-pointer hover:scale-105 transition-all duration-200 px-4 py-2 text-sm font-medium rounded-lg border-2"
              onClick={() => filters.techStack.includes(tech) ? removeTechStack(tech) : addTechStack(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-6 border-t-2 border-border/50">
          <div className="flex flex-wrap gap-2">
            {filters.techStack.map(tech => (
              <Badge key={tech} variant="secondary" className="gap-2 px-3 py-1 rounded-lg">
                {tech}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors" 
                  onClick={() => removeTechStack(tech)}
                />
              </Badge>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 rounded-lg"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;