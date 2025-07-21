import GridView from "@/components/staff/submissions/grid-view";
import PageHeader from "@/components/staff/submissions/page-header";
import StatCardsSection from "@/components/staff/submissions/stat-cards-section";
import SubmissionDetailSheet from "@/components/staff/submissions/submission-detail-dialog";

import { dashboardStats } from "@/mock/dashboard-stats.mock";
import { submissions } from "@/mock/submissions.mock";

const SubmissionsPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
      <PageHeader />
      <StatCardsSection stats={dashboardStats[0]} />
      <GridView />
      <SubmissionDetailSheet submission={submissions[0]} />
    </div>
  );
};

export default SubmissionsPage;
