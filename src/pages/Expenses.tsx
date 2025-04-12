
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  CreditCard, 
  PlusCircle,
  Search,
  Download,
  Upload,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  CalendarDays
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ExpenseChart from "@/components/ExpenseChart";
import ExpensesList from "@/components/ExpensesList";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
  description?: string;
}

const Expenses = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      title: "Salary",
      amount: 5000,
      category: "Income",
      date: "Today, 13:45 PM",
      type: "income" as const,
      description: "Monthly salary payment"
    },
    {
      id: "2",
      title: "Office Supplies",
      amount: 125.30,
      category: "Office",
      date: "Yesterday, 11:20 AM",
      type: "expense" as const,
      description: "Paper, pens, and notebooks"
    },
    {
      id: "3",
      title: "Software Subscription",
      amount: 49.99,
      category: "Software",
      date: "Jul 10, 2025, 09:30 AM",
      type: "expense" as const,
      description: "Monthly payment for design software"
    },
    {
      id: "4",
      title: "Client Payment",
      amount: 1250,
      category: "Income",
      date: "Jul 8, 2025, 15:10 PM",
      type: "income" as const,
      description: "Website project payment"
    },
    {
      id: "5",
      title: "Marketing Campaign",
      amount: 350,
      category: "Marketing",
      date: "Jul 5, 2025, 10:15 AM",
      type: "expense" as const,
      description: "Social media advertising"
    },
    {
      id: "6",
      title: "Hosting Services",
      amount: 79.95,
      category: "Infrastructure",
      date: "Jul 3, 2025, 14:30 PM",
      type: "expense" as const,
      description: "Website and email hosting"
    },
    {
      id: "7",
      title: "Team Lunch",
      amount: 120,
      category: "Food",
      date: "Jul 2, 2025, 13:10 PM",
      type: "expense" as const,
      description: "Team building lunch"
    },
    {
      id: "8",
      title: "Conference Ticket",
      amount: 299,
      category: "Education",
      date: "Jun 28, 2025, 09:45 AM",
      type: "expense" as const,
      description: "Tech conference registration"
    }
  ]);

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

  const totalIncome = expenses
    .filter(e => e.type === "income")
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const totalExpenses = expenses
    .filter(e => e.type === "expense")
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const balance = totalIncome - totalExpenses;

  const filteredExpenses = expenses.filter(expense => {
    if (activeTab === "all") return true;
    if (activeTab === "income") return expense.type === "income";
    if (activeTab === "expense") return expense.type === "expense";
    return true;
  });

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Expenses</h1>
            <p className="text-muted-foreground">Manage your income and expenses.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Transaction
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-6 animate-fade-in">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Current account balance</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">All time income</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">All time expenses</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-12 mb-6">
          <div className="md:col-span-7 animate-fade-in">
            <ExpenseChart 
              monthlyData={monthlyData}
              categoryData={categoryData}
            />
          </div>
          
          <Card className="md:col-span-5 animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Transactions</CardTitle>
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="expense">Expense</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-8 h-9"
                  />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[400px] overflow-auto">
                {filteredExpenses.map((expense) => (
                  <div 
                    key={expense.id}
                    className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        expense.type === "income" 
                          ? "bg-green-100" 
                          : "bg-red-100"
                      )}>
                        {expense.type === "income" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{expense.title}</p>
                        <p className="text-xs text-muted-foreground">{expense.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-medium",
                        expense.type === "income" 
                          ? "text-green-600" 
                          : "text-red-600"
                      )}>
                        {expense.type === "income" ? "+" : "-"}${expense.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">{expense.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="animate-fade-in">
          <ExpensesList expenses={expenses} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expenses;
