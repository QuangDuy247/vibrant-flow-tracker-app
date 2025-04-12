
import { CreditCard, ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

interface ExpensesListProps {
  expenses: Expense[];
  className?: string;
}

const ExpensesList = ({ expenses, className }: ExpensesListProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <div className="relative w-40">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-7 h-8 text-xs"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-auto">
          {expenses.map((expense) => (
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
  );
};

export default ExpensesList;
