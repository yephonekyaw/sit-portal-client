import { columns } from "@/components/staff/submissions/columns";
import PageHeader from "@/components/staff/submissions/page-header";
import ScheduleNotSelected from "@/components/staff/submissions/schedule-not-selected";
import SubmissionDetailSheet from "@/components/staff/submissions/submission-detail-sheet";
import DataTable from "@/components/ui/data-table/data-table";
import DefaultLoader from "@/components/ui/default-loader";
import { useGetAllSubmissionsByScheduleId } from "@/services/staff/submissions/queries";
import { useSubmissionStore } from "@/stores/staff/submission.stores";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const SubmissionsPage = () => {
  const [searchParams] = useSearchParams();
  const scheduleId = searchParams.get("scheduleId");
  const { currentTab, setSubmissionRelatedDetail } = useSubmissionStore();
  const {
    data: submissions,
    isLoading,
    error,
  } = useGetAllSubmissionsByScheduleId(scheduleId);

  useEffect(() => {
    if (error && isAxiosError(error) && error.status === 422) {
      toast.error("Invalid schedule ID provided", {
        description: "It should be a valid UUID.",
      });
    } else if (error) {
      toast.error("Failed to load submissions");
    }
  }, [error]);

  useEffect(() => {
    if (submissions?.data?.submissionRelatedData) {
      setSubmissionRelatedDetail(submissions.data.submissionRelatedData);
    }
  }, [submissions?.data?.submissionRelatedData, setSubmissionRelatedDetail]);

  if (isLoading) {
    return <DefaultLoader label="Loading submissions..." />;
  }

  return (
    <div className="w-full">
      <PageHeader />
      {!scheduleId && <ScheduleNotSelected />}
      {currentTab === "submitted" ? (
        <DataTable
          columns={columns}
          data={submissions?.data?.submittedSubmissions || []}
        />
      ) : currentTab === "not_submitted" ? (
        <DataTable
          columns={columns}
          data={submissions?.data?.unsubmittedSubmissions || []}
        />
      ) : (
        <div>Nothing to show here</div>
      )}
      <SubmissionDetailSheet />
    </div>
  );
};

export default SubmissionsPage;
