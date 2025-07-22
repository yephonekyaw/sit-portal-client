import FloatingAddButtons from "@/components/staff/dashboard/floating-add-buttons";
import NavPanel from "@/components/staff/dashboard/nav-panel";
import PageHeader from "@/components/staff/dashboard/page-header";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DashboardBaseLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/staff/student-management/dashboard/") {
      void navigate("schedules", { replace: true });
    }
  }, [location.pathname, navigate]);

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

export default DashboardBaseLayout;
