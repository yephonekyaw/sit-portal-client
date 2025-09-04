import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "./apis";

const useGetSchedules = () => {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });
};

export { useGetSchedules };