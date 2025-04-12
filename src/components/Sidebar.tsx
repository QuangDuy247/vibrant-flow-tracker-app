
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  CreditCard, 
  Briefcase, 
  CheckSquare, 
  BarChart4, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  User,
  LogOut
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: CreditCard, label: "Expenses", path: "/expenses" },
    { icon: Briefcase, label: "Projects", path: "/projects" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: BarChart4, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h1 className="text-xl font-bold gradient-text">FlowTrack</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-1">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className={cn(
              "justify-start mb-1",
              collapsed ? "px-2" : "px-4"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon className={cn("h-5 w-5", location.pathname === item.path ? "text-accent" : "")} />
            {!collapsed && <span className="ml-2">{item.label}</span>}
          </Button>
        ))}
      </div>
      
      <div className="p-4 border-t mt-auto">
        <Button 
          variant="ghost"
          className={cn("justify-start w-full", collapsed ? "px-2" : "px-4")}
        >
          <User className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Profile</span>}
        </Button>
        <Button 
          variant="ghost"
          className={cn("justify-start w-full mt-1", collapsed ? "px-2" : "px-4")}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
