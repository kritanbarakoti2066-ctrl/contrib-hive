import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, GitFork, Users, Clock, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: {
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
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'issue-good-first';
      case 'Intermediate': return 'issue-help-wanted';
      case 'Advanced': return 'issue-urgent';
      default: return 'tech-badge';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className="group card-hover cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 mb-2">
              {project.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-muted/50">
            <div className={`w-2 h-2 rounded-full ${getHealthColor(project.healthScore)} bg-current animate-pulse`} />
            <span className={`${getHealthColor(project.healthScore)} text-sm font-medium`}>{project.healthScore}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-4 space-y-6">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="secondary" className="tech-badge px-3 py-1 font-medium rounded-lg hover:scale-105 transition-transform duration-200">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" className="text-xs px-2 py-1 rounded-lg border-dashed">
              +{project.techStack.length - 4} more
            </Badge>
          )}
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
            <Star className="h-4 w-4 text-warning" />
            <span className="font-medium">{project.stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
            <GitFork className="h-4 w-4 text-primary" />
            <span className="font-medium">{project.forks.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
            <Users className="h-4 w-4 text-accent" />
            <span className="font-medium">{project.contributors}</span>
          </div>
        </div>

        {/* Issue Tags */}
        <div className="flex flex-wrap gap-2">
          {project.goodFirstIssues > 0 && (
            <Badge className="issue-good-first text-success px-3 py-1 rounded-lg font-medium">
              {project.goodFirstIssues} Good First Issues
            </Badge>
          )}
          {project.helpWantedIssues > 0 && (
            <Badge className="issue-help-wanted text-warning px-3 py-1 rounded-lg font-medium">
              {project.helpWantedIssues} Help Wanted
            </Badge>
          )}
          <Badge className={`${getDifficultyColor(project.difficulty)} px-3 py-1 rounded-lg font-medium`}>
            {project.difficulty}
          </Badge>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border/50">
          <Clock className="h-4 w-4" />
          <span>Updated {project.lastUpdated}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4 bg-muted/20 border-t">
        <div className="flex w-full gap-3">
          <Button variant="outline" className="flex-1 hover:bg-muted transition-all duration-200 rounded-lg">
            View Issues
          </Button>
          <Button className="flex-1 group/btn hover:scale-105 transition-all duration-200 rounded-lg">
            <span>Contribute</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;