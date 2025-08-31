import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "./apis";

const useGetPrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
};

export { useGetPrograms };
