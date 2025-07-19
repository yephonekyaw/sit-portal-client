import FloatingAddButtons from "@/components/staff/central-dashboard/floating-add-buttons";
import MainContentWrapper from "@/components/staff/central-dashboard/main-content-wrapper";
import PageHeader from "@/components/staff/central-dashboard/page-header";

const CentralDashboardPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0 relative">
      <PageHeader />
      <MainContentWrapper />
      <FloatingAddButtons />
    </div>
  );
};

export default CentralDashboardPage;
