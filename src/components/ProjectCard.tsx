
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectMember {
  name: string;
  avatar?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  deadline: string;
  members: ProjectMember[];
  category: string;
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  progress,
  deadline,
  members,
  category,
  className,
}: ProjectCardProps) => {
  return (
    <Card className={cn("hover-scale overflow-hidden", className)}>
      <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-xs font-medium text-muted-foreground mt-1">
              {category}
            </p>
          </div>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            progress === 100 
              ? "bg-green-100 text-green-800" 
              : "bg-blue-100 text-blue-800"
          )}>
            {progress === 100 ? "Completed" : "In Progress"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="h-3.5 w-3.5" />
          <span>{deadline}</span>
        </div>
        
        <div className="flex -space-x-2">
          {members.slice(0, 3).map((member, index) => (
            <Avatar key={index} className="h-6 w-6 border-2 border-background">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-xs">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ))}
          
          {members.length > 3 && (
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-medium">
              +{members.length - 3}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
