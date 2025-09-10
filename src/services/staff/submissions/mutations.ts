import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVerifySubmission } from "./apis";
import { toast } from "sonner";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type { VerificationHistoryResponse } from "./types";
import type { ManualVerificationFormSchemaType } from "@/types/staff/submission.types";
import { useNavigate } from "react-router-dom";

export const usePostVerifySubmission = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<VerificationHistoryResponse>,
    ApiError,
    ManualVerificationFormSchemaType
  >({
    mutationFn: postVerifySubmission,
    onSuccess: (_, variables) => {
      toast.success("Submission verified successfully");
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(variables.submissionId) ||
          query.queryKey.includes(variables.scheduleId),
      });
      navigate(`/staff/submissions?scheduleId=${variables.scheduleId}`);
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message || "Failed to verify submission"
      );
    },
  });
};
