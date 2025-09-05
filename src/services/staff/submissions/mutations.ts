import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCreateVerificationHistory } from "./apis";
import { toast } from "sonner";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type { VerificationHistoryListResponse } from "./types";
import type { VerificationHistoryFormSchemaType } from "@/types/staff/submission.types";

export const usePostCreateVerificationHistory = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<VerificationHistoryListResponse>,
    ApiError,
    VerificationHistoryFormSchemaType & {
      scheduleId: string;
    }
  >({
    mutationFn: (
      { scheduleId, ...data } // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => postCreateVerificationHistory(data),
    onSuccess: (_, variables) => {
      toast.success("Verification history created successfully");
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(variables.submissionId) ||
          query.queryKey.includes(variables.scheduleId),
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message || "Failed to create verification history"
      );
    },
  });
};
