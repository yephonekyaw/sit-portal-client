import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getStudentRequirements, postCertificate } from "./apis";

const useGetStudentRequirements = () => {
  return useQuery({
    queryKey: ["student-requirements"],
    queryFn: getStudentRequirements,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: (failureCount, err) => {
      if (
        err instanceof AxiosError &&
        (err.status === 401 || err.status === 400)
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

const usePostCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCertificate,
    onSuccess: () => {
      // Invalidate and refetch student requirements after successful submission
      queryClient.invalidateQueries({
        queryKey: ["student-requirements"],
      });
    },
    onError: (error: AxiosError) => {
      console.error("Certificate submission failed:", error);
    },
  });
};

export { useGetStudentRequirements, usePostCertificate };
