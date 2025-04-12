
import { CheckCircle2, Circle, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  due: string;
  priority: "low" | "medium" | "high";
  project?: string;
}

interface TasksListProps {
  tasks: Task[];
  className?: string;
}

const TasksList = ({ tasks, className }: TasksListProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Tasks</CardTitle>
          <Button size="sm" variant="outline">
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={cn(
                "flex items-start space-x-3 p-3 rounded-md transition-all",
                task.completed ? "bg-muted/50" : "hover:bg-muted/30"
              )}
            >
              <Checkbox
                checked={task.completed}
                className={cn(
                  "mt-1",
                  task.completed ? "opacity-50" : ""
                )}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className={cn(
                    "font-medium text-sm",
                    task.completed && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </p>
                  <Badge 
                    variant={
                      task.priority === "high" 
                        ? "destructive" 
                        : task.priority === "medium" 
                          ? "default" 
                          : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {task.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground space-x-3">
                  {task.project && (
                    <span className="flex items-center">
                      <Circle className="mr-1 h-3 w-3 fill-current text-primary" />
                      {task.project}
                    </span>
                  )}
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {task.due}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
