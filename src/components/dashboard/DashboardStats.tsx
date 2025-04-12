
import React from "react";
import StatCard from "@/components/StatCard";
import { DollarSign, CreditCard, Briefcase, CheckSquare } from "lucide-react";

const DashboardStats = () => {
  return (
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
  );
};

export default DashboardStats;
