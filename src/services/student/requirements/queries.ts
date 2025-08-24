import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getStudentRequirements } from "./apis";

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

export { useGetStudentRequirements };
