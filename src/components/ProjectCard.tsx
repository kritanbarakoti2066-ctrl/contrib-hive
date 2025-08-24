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
    <Card className="card-hover group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
            <div className={`w-2 h-2 rounded-full ${getHealthColor(project.healthScore)} bg-current`} />
            <span className={getHealthColor(project.healthScore)}>{project.healthScore}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="secondary" className="tech-badge">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.techStack.length - 4} more
            </Badge>
          )}
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{project.stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{project.forks.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{project.contributors}</span>
          </div>
        </div>

        {/* Issue Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.goodFirstIssues > 0 && (
            <Badge className="issue-good-first text-success">
              {project.goodFirstIssues} Good First Issues
            </Badge>
          )}
          {project.helpWantedIssues > 0 && (
            <Badge className="issue-help-wanted text-warning">
              {project.helpWantedIssues} Help Wanted
            </Badge>
          )}
          <Badge className={getDifficultyColor(project.difficulty)}>
            {project.difficulty}
          </Badge>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Updated {project.lastUpdated}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1">
            View Issues
          </Button>
          <Button className="flex-1 group">
            <span>Contribute</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;