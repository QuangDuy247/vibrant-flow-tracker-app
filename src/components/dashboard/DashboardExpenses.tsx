
import React from "react";
import ExpensesList from "@/components/ExpensesList";
import { useDashboardData } from "@/contexts/DashboardContext";

const DashboardExpenses = () => {
  const { expenses } = useDashboardData();
  
  return (
    <ExpensesList 
      expenses={expenses}
      className="md:col-span-5 animate-fade-in"
    />
  );
};

export default DashboardExpenses;
