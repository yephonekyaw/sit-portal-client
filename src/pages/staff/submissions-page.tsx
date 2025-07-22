import GridView from "@/components/staff/submissions/grid-view";
import PageHeader from "@/components/staff/submissions/page-header";
import StatCardsSection from "@/components/staff/submissions/stat-cards-section";
import { SubmissionsPagination } from "@/components/staff/submissions/pagination";
import SubmissionDetailSheet from "@/components/staff/submissions/submission-detail-sheet";
import { useInitializeSubmissionsFromParams } from "@/stores/staff/submissions-filter.stores";

import { useState } from "react";

const SubmissionsPage = () => {
  const [statsDrawerOpen, setStatsDrawerOpen] = useState(false);
  useInitializeSubmissionsFromParams();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 space-y-4">
      <PageHeader setStatsDrawerOpen={setStatsDrawerOpen} />
      <StatCardsSection
        statsDrawerOpen={statsDrawerOpen}
        setStatsDrawerOpen={setStatsDrawerOpen}
      />
      <GridView />
      <SubmissionsPagination />
      <SubmissionDetailSheet />
    </div>
  );
};

export default SubmissionsPage;
