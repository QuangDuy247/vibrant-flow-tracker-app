import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import ProjectCard from "@/components/ProjectCard";
import ExpensesList from "@/components/ExpensesList";
import TasksList from "@/components/TasksList";
import ExpenseChart from "@/components/ExpenseChart";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  DollarSign, 
  Briefcase, 
  CheckSquare, 
  PlusCircle,
  ArrowRight
} from "lucide-react";

const Dashboard = () => {
  // Sample data for demonstration
  const projects = [
    {
      title: "Website Redesign",
      description: "Redesign company website with modern UI and improved user experience",
      progress: 75,
      deadline: "Jul 30, 2025",
      members: [
        { name: "Alex Smith" },
        { name: "Emma Johnson" },
        { name: "Michael Brown" },
        { name: "Sarah Davis" }
      ],
      category: "Design"
    },
    {
      title: "Mobile App Development",
      description: "Build a cross-platform mobile application for task management",
      progress: 40,
      deadline: "Aug 15, 2025",
      members: [
        { name: "David Wilson" },
        { name: "Lisa Martin" },
        { name: "James Taylor" }
      ],
      category: "Development"
    }
  ];

  const expenses = [
    {
      id: "1",
      title: "Salary",
      amount: 5000,
      category: "Income",
      date: "Today, 13:45 PM",
      type: "income" as const
    },
    {
      id: "2",
      title: "Office Supplies",
      amount: 125.30,
      category: "Office",
      date: "Yesterday, 11:20 AM",
      type: "expense" as const
    },
    {
      id: "3",
      title: "Software Subscription",
      amount: 49.99,
      category: "Software",
      date: "Jul 10, 2025, 09:30 AM",
      type: "expense" as const
    },
    {
      id: "4",
      title: "Client Payment",
      amount: 1250,
      category: "Income",
      date: "Jul 8, 2025, 15:10 PM",
      type: "income" as const
    },
    {
      id: "5",
      title: "Marketing Campaign",
      amount: 350,
      category: "Marketing",
      date: "Jul 5, 2025, 10:15 AM",
      type: "expense" as const
    }
  ];

  const tasks = [
    {
      id: "1",
      title: "Update project documentation",
      completed: false,
      due: "Today",
      priority: "high" as const,
      project: "Website Redesign"
    },
    {
      id: "2",
      title: "Review design mockups",
      completed: true,
      due: "Yesterday",
      priority: "medium" as const,
      project: "Mobile App"
    },
    {
      id: "3",
      title: "Prepare quarterly financial report",
      completed: false,
      due: "Jul 20, 2025",
      priority: "high" as const
    },
    {
      id: "4",
      title: "Book meeting room for team review",
      completed: false,
      due: "Jul 15, 2025",
      priority: "low" as const
    }
  ];

  const monthlyData = [
    { name: "Jan", expenses: 4000, income: 6000 },
    { name: "Feb", expenses: 3500, income: 5800 },
    { name: "Mar", expenses: 5100, income: 7200 },
    { name: "Apr", expenses: 4200, income: 6900 },
    { name: "May", expenses: 3800, income: 6300 },
    { name: "Jun", expenses: 4300, income: 7100 },
  ];

  const categoryData = [
    { name: "Software", value: 35, color: "#8b5cf6" },
    { name: "Office", value: 25, color: "#0ea5e9" },
    { name: "Marketing", value: 20, color: "#f43f5e" },
    { name: "Travel", value: 15, color: "#10b981" },
    { name: "Other", value: 5, color: "#f59e0b" },
  ];

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6 animate-fade-in">
          <StatCard 
            title="Total Balance"
            value="$24,500.00" 
            icon={DollarSign}
            trend={8}
            description="Current account balance"
            iconColor="text-green-500"
          />
          <StatCard 
            title="Monthly Expenses"
            value="$4,300.00" 
            icon={CreditCard}
            trend={-2}
            description="Compared to $4,385 last month"
            iconColor="text-red-500"
          />
          <StatCard 
            title="Active Projects"
            value="8" 
            icon={Briefcase}
            trend={0}
            description="2 due this week"
            iconColor="text-blue-500"
          />
          <StatCard 
            title="Pending Tasks"
            value="16" 
            icon={CheckSquare}
            trend={5}
            description="5 urgent tasks"
            iconColor="text-purple-500"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-8 mb-6">
          <ExpenseChart 
            monthlyData={monthlyData}
            categoryData={categoryData}
            className="md:col-span-5 animate-fade-in"
          />
          <TasksList 
            tasks={tasks}
            className="md:col-span-3 animate-fade-in"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-12 mb-6">
          <div className="md:col-span-7 space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Projects</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  progress={project.progress}
                  deadline={project.deadline}
                  members={project.members}
                  category={project.category}
                />
              ))}
            </div>
          </div>
          <ExpensesList 
            expenses={expenses}
            className="md:col-span-5 animate-fade-in"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
