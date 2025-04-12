
import React from "react";
import ExpenseChart from "@/components/ExpenseChart";
import TasksList from "@/components/TasksList";
import { useDashboardData } from "@/contexts/DashboardContext";

const DashboardCharts = () => {
  const { monthlyData, categoryData, tasks } = useDashboardData();

  return (
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
  );
};

export default DashboardCharts;
