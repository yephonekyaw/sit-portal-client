import NavPanel from "./nav-panel";
import { useCentralDashboardNavStore } from "@/stores/staff/central-dashboard.stores";
import ProgramsSection from "./programs-section";
import CertificatesSection from "./certificates-section";
import ProgramRequirementsSection from "./prog-reqs-section";

const MainContentWrapper = () => {
  const activeItem = useCentralDashboardNavStore((state) => state.activeItem);
  return (
    <div className="w-full">
      <NavPanel />
      <div className="h-[1rem]" />
      {activeItem === "prog" && <ProgramsSection />}
      {activeItem === "cert" && <CertificatesSection />}
      {activeItem === "reqs" && <ProgramRequirementsSection />}
    </div>
  );
};

export default MainContentWrapper;
