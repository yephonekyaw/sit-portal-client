import { useQuery } from "@tanstack/react-query";
import { getProgramRequirements } from "./apis";

export const useGetProgramRequirements = () => {
  return useQuery({
    queryKey: ["program", "requirements"],
    queryFn: getProgramRequirements,
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
};
