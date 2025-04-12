
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  CheckSquare, 
  PlusCircle,
  Clock,
  Filter,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  due: string;
  priority: "low" | "medium" | "high";
  project?: string;
  description?: string;
  tags?: string[];
}

const Tasks = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Update project documentation",
      completed: false,
      due: "Today",
      priority: "high",
      project: "Website Redesign",
      description: "Ensure documentation is up to date with latest changes"
    },
    {
      id: "2",
      title: "Review design mockups",
      completed: true,
      due: "Yesterday",
      priority: "medium",
      project: "Mobile App",
      tags: ["Design", "Review"]
    },
    {
      id: "3",
      title: "Prepare quarterly financial report",
      completed: false,
      due: "Jul 20, 2025",
      priority: "high",
      tags: ["Finance", "Report"]
    },
    {
      id: "4",
      title: "Book meeting room for team review",
      completed: false,
      due: "Jul 15, 2025",
      priority: "low",
      project: "Team Management",
      tags: ["Meeting"]
    },
    {
      id: "5", 
      title: "Update website content",
      completed: false,
      due: "Jul 18, 2025",
      priority: "medium",
      project: "Website Maintenance",
      tags: ["Content", "Website"]
    },
    {
      id: "6",
      title: "Fix payment gateway issue",
      completed: false,
      due: "Jul 14, 2025",
      priority: "high",
      project: "E-commerce Platform",
      tags: ["Bug", "Critical"]
    }
  ]);

  const filteredTasks = tasks.filter(task => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return task.completed;
    if (activeTab === "pending") return !task.completed;
    if (activeTab === "high") return task.priority === "high";
    return true;
  });

  const addTask = () => {
    if (!taskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      completed: false,
      due: "Today",
      priority: "medium"
    };
    
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    
    toast({
      title: "Task added",
      description: "Your new task has been created."
    });
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed } 
        : task
    ));

    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task marked as pending" : "Task completed",
        description: `"${task.title}" has been updated.`
      });
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    
    if (task) {
      toast({
        title: "Task deleted",
        description: `"${task.title}" has been removed.`,
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Tasks</h1>
            <p className="text-muted-foreground">Manage your tasks and track progress.</p>
          </div>
          <Button onClick={() => addTask()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-12 mb-6">
          <Card className="md:col-span-8 animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <CardTitle className="text-lg">Task Management</CardTitle>
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="high">Priority</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Add a new task..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    className="pr-20"
                  />
                  <Button 
                    size="sm" 
                    onClick={addTask}
                    className="absolute right-1 top-1 h-8"
                  >
                    Add
                  </Button>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="website">Website Redesign</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-auto">
                {filteredTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No tasks available</h3>
                    <p className="text-muted-foreground mt-1">
                      {activeTab === "all" 
                        ? "Create your first task to get started" 
                        : `No ${activeTab} tasks found`}
                    </p>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div 
                      key={task.id}
                      className={cn(
                        "flex items-start space-x-3 p-4 rounded-md transition-all border",
                        task.completed ? "bg-muted/50" : "hover:bg-muted/30"
                      )}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                        className={cn(
                          "mt-1",
                          task.completed ? "opacity-50" : ""
                        )}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className={cn(
                            "font-medium",
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
                        
                        {task.description && (
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center text-xs text-muted-foreground space-x-3 mt-2">
                          {task.project && (
                            <span className="flex items-center">
                              <CheckSquare className="mr-1 h-3 w-3" />
                              {task.project}
                            </span>
                          )}
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {task.due}
                          </span>
                          <span className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </div>
                        
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toggleTaskStatus(task.id)}>
                            {task.completed ? "Mark as pending" : "Mark as completed"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit task</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-4 space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Task Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Tasks</span>
                  <span className="font-bold">{tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="font-bold">{tasks.filter(t => t.completed).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="font-bold">{tasks.filter(t => !t.completed).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">High Priority</span>
                  <span className="font-bold text-red-500">{tasks.filter(t => t.priority === "high").length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks
                    .filter(t => !t.completed)
                    .slice(0, 3)
                    .map(task => (
                      <div key={task.id} className="flex items-center gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          task.priority === "high" ? "bg-red-500" : 
                          task.priority === "medium" ? "bg-blue-500" : "bg-green-500"
                        )} />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.due}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
