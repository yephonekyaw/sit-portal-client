import { useQuery } from "@tanstack/react-query";
import { getAllSubmissionsByScheduleId, getVerificationHistory } from "./apis";

export const useGetAllSubmissionsByScheduleId = (scheduleId: string) =>
  useQuery({
    queryKey: ["staff", "submissions", "all", scheduleId],
    queryFn: () => getAllSubmissionsByScheduleId(scheduleId),
    enabled: !!scheduleId,
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });

export const useGetVerificationHistory = (submissionId: string) =>
  useQuery({
    queryKey: ["staff", "submissions", "history", submissionId],
    queryFn: () => getVerificationHistory(submissionId),
    enabled: !!submissionId,
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });
