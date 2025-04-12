
import React, { createContext, useContext, ReactNode } from "react";

interface Project {
  title: string;
  description: string;
  progress: number;
  deadline: string;
  members: { name: string }[];
  category: string;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  due: string;
  priority: "high" | "medium" | "low";
  project?: string;
}

interface ChartData {
  name: string;
  expenses: number;
  income: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface DashboardContextType {
  projects: Project[];
  expenses: Expense[];
  tasks: Task[];
  monthlyData: ChartData[];
  categoryData: CategoryData[];
}

const defaultContext: DashboardContextType = {
  projects: [
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
  ],
  expenses: [
    {
      id: "1",
      title: "Salary",
      amount: 5000,
      category: "Income",
      date: "Today, 13:45 PM",
      type: "income"
    },
    {
      id: "2",
      title: "Office Supplies",
      amount: 125.30,
      category: "Office",
      date: "Yesterday, 11:20 AM",
      type: "expense"
    },
    {
      id: "3",
      title: "Software Subscription",
      amount: 49.99,
      category: "Software",
      date: "Jul 10, 2025, 09:30 AM",
      type: "expense"
    },
    {
      id: "4",
      title: "Client Payment",
      amount: 1250,
      category: "Income",
      date: "Jul 8, 2025, 15:10 PM",
      type: "income"
    },
    {
      id: "5",
      title: "Marketing Campaign",
      amount: 350,
      category: "Marketing",
      date: "Jul 5, 2025, 10:15 AM",
      type: "expense"
    }
  ],
  tasks: [
    {
      id: "1",
      title: "Update project documentation",
      completed: false,
      due: "Today",
      priority: "high",
      project: "Website Redesign"
    },
    {
      id: "2",
      title: "Review design mockups",
      completed: true,
      due: "Yesterday",
      priority: "medium",
      project: "Mobile App"
    },
    {
      id: "3",
      title: "Prepare quarterly financial report",
      completed: false,
      due: "Jul 20, 2025",
      priority: "high"
    },
    {
      id: "4",
      title: "Book meeting room for team review",
      completed: false,
      due: "Jul 15, 2025",
      priority: "low"
    }
  ],
  monthlyData: [
    { name: "Jan", expenses: 4000, income: 6000 },
    { name: "Feb", expenses: 3500, income: 5800 },
    { name: "Mar", expenses: 5100, income: 7200 },
    { name: "Apr", expenses: 4200, income: 6900 },
    { name: "May", expenses: 3800, income: 6300 },
    { name: "Jun", expenses: 4300, income: 7100 },
  ],
  categoryData: [
    { name: "Software", value: 35, color: "#8b5cf6" },
    { name: "Office", value: 25, color: "#0ea5e9" },
    { name: "Marketing", value: 20, color: "#f43f5e" },
    { name: "Travel", value: 15, color: "#10b981" },
    { name: "Other", value: 5, color: "#f59e0b" },
  ]
};

const DashboardContext = createContext<DashboardContextType>(defaultContext);

export const useDashboardData = () => useContext(DashboardContext);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  // In a real app, you would fetch this data from an API
  return (
    <DashboardContext.Provider value={defaultContext}>
      {children}
    </DashboardContext.Provider>
  );
};

export type { Project, Expense, Task, ChartData, CategoryData };
