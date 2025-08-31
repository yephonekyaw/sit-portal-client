import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "./apis";

export const useGetCertificates = () => {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
};
