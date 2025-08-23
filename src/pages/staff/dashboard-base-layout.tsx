import FloatingAddButtons from "@/components/staff/dashboard/floating-add-buttons";
import NavPanel from "@/components/staff/dashboard/nav-panel";
import PageHeader from "@/components/staff/dashboard/page-header";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DashboardBaseLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const normalizedPath = location.pathname.replace(/\/$/, "");

  useEffect(() => {
    if (normalizedPath === "/staff/student-management/dashboard") {
      void navigate("schedules", { replace: true });
    }
  }, [normalizedPath, navigate]);

  return (
    <div className="w-full relative">
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
