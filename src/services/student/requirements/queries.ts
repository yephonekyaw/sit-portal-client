import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getStudentRequirements, getVerificationHistory } from "./apis";

const useGetStudentRequirements = () => {
  return useQuery({
    queryKey: ["student", "requirements"],
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

const useGetVerificationHistory = (submissionId: string) => {
  return useQuery({
    queryKey: ["student", "requirements", "history", submissionId],
    queryFn: () => getVerificationHistory(submissionId),
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 60 * 60 * 1000, // Refetch every 1 hour
  });
};

export { useGetStudentRequirements, useGetVerificationHistory };
