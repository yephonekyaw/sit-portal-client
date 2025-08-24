import { useQuery } from "@tanstack/react-query";
import { getMe } from "./apis";
import { AxiosError } from "axios";

const useGetMeQuery = () => {
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: (failureCount, err) => {
      if (
        err instanceof AxiosError &&
        (err.status === 401 || err.status === 400)
      ) {
        return false;
      }
      return failureCount < 1;
    },
  });
};

export { useGetMeQuery };
