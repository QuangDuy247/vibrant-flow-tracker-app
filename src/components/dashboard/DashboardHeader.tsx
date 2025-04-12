
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DashboardHeader = () => {
  return (
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
  );
};

export default DashboardHeader;
