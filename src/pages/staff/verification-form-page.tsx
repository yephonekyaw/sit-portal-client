import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerificationForm from "@/components/staff/submissions/verification-form";
import { useSubmissionStore } from "@/stores/staff/submission.stores";
import { toast } from "sonner";

const VerificationFormPage = () => {
  const { selectedSubmission, submissionRelatedDetail } = useSubmissionStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedSubmission) {
      toast.error("No submission selected for verification");
      navigate(
        `/staff/submissions?scheduleId=${
          submissionRelatedDetail?.scheduleId ?? ""
        }`
      );
      return;
    }

    if (selectedSubmission.submissionStatus !== "manual_review") {
      toast.error("Only submissions with manual review status can be verified");
      navigate(
        `/staff/submissions?scheduleId=${
          submissionRelatedDetail?.scheduleId ?? ""
        }`
      );
      return;
    }
  }, [selectedSubmission, submissionRelatedDetail, navigate]);

  return <VerificationForm />;
};

export default VerificationFormPage;
