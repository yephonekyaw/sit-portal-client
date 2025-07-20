import FloatingAddButtons from "@/components/staff/central-dashboard/floating-add-buttons";
import NavPanel from "@/components/staff/central-dashboard/nav-panel";
import PageHeader from "@/components/staff/central-dashboard/page-header";
import { Outlet } from "react-router-dom";

const CentralDashboardBaseLayout = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0 relative">
      <PageHeader />
      <div className="w-full">
        <NavPanel />
        <div className="h-[1rem]" />
        <Outlet />
      </div>
      <FloatingAddButtons />
    </div>
  );
};

export default CentralDashboardBaseLayout;
