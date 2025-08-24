import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProjectGridProps {
  projects: Array<{
    id: string;
    name: string;
    description: string;
    techStack: string[];
    stars: number;
    forks: number;
    contributors: number;
    lastUpdated: string;
    issuesCount: number;
    goodFirstIssues: number;
    helpWantedIssues: number;
    language: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    healthScore: number;
  }>;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const ProjectGrid = ({ projects, isLoading = false, hasMore = false, onLoadMore }: ProjectGridProps) => {
  if (isLoading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-6xl">🔍</div>
        <h3 className="text-xl font-semibold">No projects found</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Try adjusting your search criteria or explore different categories to discover amazing open source projects.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button 
            onClick={onLoadMore} 
            disabled={isLoading}
            size="lg"
            variant="outline"
            className="min-w-32"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Projects'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;