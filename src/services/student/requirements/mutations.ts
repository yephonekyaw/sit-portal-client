import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSubmitRequirement } from "./apis";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type { StudentRequirementWithSubmission } from "./types";
import { useRequirementStore } from "@/stores/student/requirement.stores";
import { toast } from "sonner";

const usePostSubmitRequirement = () => {
  const queryClient = useQueryClient();
  const { setSelectedRequirement } = useRequirementStore();

  return useMutation<
    ApiResponse<StudentRequirementWithSubmission>,
    ApiError,
    FormData
  >({
    mutationFn: postSubmitRequirement,
    onSuccess: (data) => {
      toast.success("Certificate submitted successfully");
      queryClient.invalidateQueries({
        queryKey: ["student", "requirements"],
      });
      if (data.data) {
        setSelectedRequirement(data.data);
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message || "Failed to submit certificate"
      );
    },
  });
};

export { usePostSubmitRequirement };
