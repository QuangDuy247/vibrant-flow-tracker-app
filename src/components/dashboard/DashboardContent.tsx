
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import DashboardProjects from "./DashboardProjects";
import DashboardExpenses from "./DashboardExpenses";

const DashboardContent = () => {
  return (
    <div className="py-6">
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      
      <div className="grid gap-6 md:grid-cols-12 mb-6">
        <DashboardProjects />
        <DashboardExpenses />
      </div>
    </div>
  );
};

export default DashboardContent;
