import { useQuery } from "@tanstack/react-query";
import { getAcademicYears } from "./apis";

const useGetAcademicYears = () => {
  return useQuery({
    queryKey: ["academic-years"],
    queryFn: getAcademicYears,
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });
};

export { useGetAcademicYears };