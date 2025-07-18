import NavPanel from "./nav-panel";
import { useCentralDashboardNavStore } from "@/stores/staff/central-dashboard.stores";
import ProgramCards from "./program-cards";

const MainContentWrapper = () => {
  const activeItem = useCentralDashboardNavStore((state) => state.activeItem);
  return (
    <div className="w-full">
      <NavPanel />
      <div className="h-[2rem]" />
      {activeItem === "prog" && <ProgramCards />}
    </div>
  );
};

export default MainContentWrapper;
