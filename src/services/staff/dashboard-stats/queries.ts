import { useQuery } from "@tanstack/react-query";
import { getDashboardStatsByScheduleId } from "./apis";

export const useGetDashboardStatsByScheduleId = (scheduleId: string | null) =>
  useQuery({
    queryKey: ["staff", "dashboard-stats", "schedule", scheduleId],
    queryFn: () => getDashboardStatsByScheduleId(scheduleId!),
    enabled: !!scheduleId && scheduleId.trim() !== "",
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
