import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSubmitRequirement } from "./apis";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type {
  RequirementSubmissionRequest,
  RequirementSubmissionResponse,
} from "./types";

const usePostSubmitRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<RequirementSubmissionResponse>,
    ApiError,
    RequirementSubmissionRequest
  >({
    mutationFn: (data) => postSubmitRequirement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student", "requirements"],
      });
    },
    onError: () => {},
  });
};

export { usePostSubmitRequirement };
