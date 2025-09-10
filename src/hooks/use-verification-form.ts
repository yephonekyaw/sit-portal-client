import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSubmissionStore } from "@/stores/staff/submission.stores";
import { ManualVerificationFormSchema } from "@/schemas/staff/submission.schemas";
import type { ManualVerificationFormSchemaType } from "@/types/staff/submission.types";
import { usePostVerifySubmission } from "@/services/staff/submissions/mutations";

export const useVerificationForm = () => {
  const navigate = useNavigate();
  const { selectedSubmission, submissionRelatedDetail } = useSubmissionStore();
  const { mutateAsync: verify, isPending: isVerifying } =
    usePostVerifySubmission();

  const form = useForm<ManualVerificationFormSchemaType>({
    resolver: zodResolver(ManualVerificationFormSchema),
    defaultValues: {
      submissionId: "",
      scheduleId: "",
      status: undefined,
      comments: "",
      reasons: "",
    },
  });

  // Populate form when submission data is available
  useEffect(() => {
    if (selectedSubmission?.submissionId) {
      form.reset({
        submissionId: selectedSubmission.submissionId,
        scheduleId: submissionRelatedDetail?.scheduleId || "",
        status: undefined,
        comments: "",
        reasons: "",
      });
    }
  }, [selectedSubmission, submissionRelatedDetail, form]);

  // Validate submission can be verified
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

  const onSubmit = async (data: ManualVerificationFormSchemaType) => {
    if (!selectedSubmission) {
      toast.error("No submission selected for verification");
      return;
    }

    if (!submissionRelatedDetail) {
      toast.error("Submission details are missing");
      return;
    }

    await verify(data);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const canBeVerified =
    selectedSubmission &&
    selectedSubmission.submissionStatus === "manual_review";

  return {
    form,
    selectedSubmission,
    submissionRelatedDetail,
    canBeVerified,
    onSubmit,
    handleGoBack,
    isSubmitting: form.formState.isSubmitting,
    isVerifying,
  };
};
