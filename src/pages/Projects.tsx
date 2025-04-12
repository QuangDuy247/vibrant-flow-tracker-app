
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Briefcase, 
  PlusCircle,
  Search,
  FilterX,
  CheckCircle2,
  Clock,
  Tag,
  Users,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCard from "@/components/ProjectCard";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ProjectMember {
  name: string;
  avatar?: string;
  role?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  members: ProjectMember[];
  category: string;
  status?: "active" | "completed" | "on-hold";
  priority?: "low" | "medium" | "high";
  tasks?: { total: number; completed: number };
}

const Projects = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Website Redesign",
      description: "Redesign company website with modern UI and improved user experience",
      progress: 75,
      deadline: "Jul 30, 2025",
      members: [
        { name: "Alex Smith", role: "Designer" },
        { name: "Emma Johnson", role: "Developer" },
        { name: "Michael Brown", role: "Project Manager" },
        { name: "Sarah Davis", role: "Content Writer" }
      ],
      category: "Design",
      status: "active",
      priority: "high",
      tasks: { total: 24, completed: 18 }
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Build a cross-platform mobile application for task management",
      progress: 40,
      deadline: "Aug 15, 2025",
      members: [
        { name: "David Wilson", role: "Lead Developer" },
        { name: "Lisa Martin", role: "UI/UX Designer" },
        { name: "James Taylor", role: "QA Engineer" }
      ],
      category: "Development",
      status: "active",
      priority: "medium",
      tasks: { total: 32, completed: 12 }
    },
    {
      id: "3",
      title: "Marketing Campaign",
      description: "Develop and execute Q3 digital marketing campaign for new product launch",
      progress: 20,
      deadline: "Sep 5, 2025",
      members: [
        { name: "Emily Clark", role: "Marketing Director" },
        { name: "Ryan Lewis", role: "Content Strategist" },
        { name: "Jessica White", role: "Social Media Specialist" }
      ],
      category: "Marketing",
      status: "active",
      priority: "medium",
      tasks: { total: 18, completed: 4 }
    },
    {
      id: "4",
      title: "CRM System Integration",
      description: "Integrate the new CRM system with existing workflow and migrate data",
      progress: 60,
      deadline: "Aug 10, 2025",
      members: [
        { name: "Thomas Moore", role: "System Analyst" },
        { name: "Jennifer Harris", role: "Data Specialist" },
        { name: "Daniel Lee", role: "Developer" }
      ],
      category: "Infrastructure",
      status: "active",
      priority: "high",
      tasks: { total: 15, completed: 9 }
    },
    {
      id: "5",
      title: "Office Relocation",
      description: "Coordinate the relocation to the new office space and setup infrastructure",
      progress: 100,
      deadline: "Jun 30, 2025",
      members: [
        { name: "Patricia Young", role: "Operations Manager" },
        { name: "Robert King", role: "Facilities Coordinator" },
        { name: "Laura Green", role: "IT Administrator" }
      ],
      category: "Operations",
      status: "completed",
      priority: "high",
      tasks: { total: 20, completed: 20 }
    },
    {
      id: "6",
      title: "Annual Financial Audit",
      description: "Prepare documentation and coordinate with external auditors for annual review",
      progress: 10,
      deadline: "Sep 30, 2025",
      members: [
        { name: "William Turner", role: "Finance Director" },
        { name: "Amanda Ross", role: "Accountant" },
        { name: "Steven Carter", role: "Compliance Officer" }
      ],
      category: "Finance",
      status: "active",
      priority: "medium",
      tasks: { total: 12, completed: 1 }
    }
  ]);

  const filteredProjects = projects.filter(project => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return project.status === "completed";
    if (activeTab === "active") return project.status === "active";
    if (activeTab === "high") return project.priority === "high";
    return true;
  });
  
  const activeCount = projects.filter(p => p.status === "active").length;
  const completedCount = projects.filter(p => p.status === "completed").length;
  const highPriorityCount = projects.filter(p => p.priority === "high").length;

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Projects</h1>
            <p className="text-muted-foreground">Manage your projects and track progress.</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-6 animate-fade-in">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {highPriorityCount} high priority projects
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Successfully delivered
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all active projects
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg">Project Management</CardTitle>
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="high">High Priority</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline">
                <FilterX className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {project.category}
                        </p>
                      </div>
                      <Badge
                        variant={
                          project.status === "completed" 
                            ? "success"
                            : project.priority === "high" 
                              ? "destructive" 
                              : "default"
                        }
                        className="text-[10px]"
                      >
                        {project.status === "completed" 
                          ? "Completed" 
                          : project.priority === "high" 
                            ? "High Priority" 
                            : "Active"}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="space-y-1 mt-4">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{project.deadline}</span>
                      </div>
                      
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((member, idx) => (
                          <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        
                        {project.members.length > 3 && (
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-medium">
                            +{project.members.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {project.tasks && (
                      <div className="text-xs text-muted-foreground mt-4">
                        {project.tasks.completed} of {project.tasks.total} tasks completed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-12 animate-fade-in">
          <Card className="md:col-span-7">
            <CardHeader>
              <CardTitle className="text-lg">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {projects.slice(0, 4).map((project) => (
                  <div key={project.id} className="relative pl-6 pb-8 border-l border-muted last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-primary bg-background" />
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{project.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {project.deadline}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.description.substring(0, 60)}...
                    </p>
                    <div className="flex items-center mt-2 gap-4">
                      <div className="text-xs flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>
                          {project.tasks 
                            ? `${project.tasks.completed}/${project.tasks.total} tasks` 
                            : "No tasks"}
                        </span>
                      </div>
                      <div className="text-xs flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        <span>{project.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-5">
            <CardHeader>
              <CardTitle className="text-lg">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(projects.flatMap(p => p.members.map(m => m.name))))
                  .slice(0, 7)
                  .map((name, idx) => {
                    const member = projects.flatMap(p => p.members).find(m => m.name === name);
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member?.role || "Team Member"}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
