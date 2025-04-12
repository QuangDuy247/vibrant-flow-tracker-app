
import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useDashboardData } from "@/contexts/DashboardContext";

const DashboardProjects = () => {
  const { projects } = useDashboardData();

  return (
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
  );
};

export default DashboardProjects;
