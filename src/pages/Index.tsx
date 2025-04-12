
import DashboardLayout from "@/components/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { DashboardProvider } from "@/contexts/DashboardContext";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </DashboardLayout>
  );
};

export default Dashboard;
