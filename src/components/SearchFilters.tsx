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
    <div className="bg-card border rounded-lg p-6 space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects, issues, or technologies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4"
        />
      </form>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.difficulty} onValueChange={(value) => updateFilter('difficulty', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.issueType} onValueChange={(value) => updateFilter('issueType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Issue Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="good-first-issue">Good First Issue</SelectItem>
            <SelectItem value="help-wanted">Help Wanted</SelectItem>
            <SelectItem value="bug">Bug Fix</SelectItem>
            <SelectItem value="feature">Feature Request</SelectItem>
            <SelectItem value="documentation">Documentation</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.language} onValueChange={(value) => updateFilter('language', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tech Stack Tags */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Tech Stack</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {techStacks.map(tech => (
            <Badge
              key={tech}
              variant={filters.techStack.includes(tech) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => filters.techStack.includes(tech) ? removeTechStack(tech) : addTechStack(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {filters.techStack.map(tech => (
              <Badge key={tech} variant="secondary" className="gap-1">
                {tech}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => removeTechStack(tech)}
                />
              </Badge>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;