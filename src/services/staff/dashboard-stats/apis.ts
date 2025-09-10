import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { DashboardStatsResponse } from "./types";

export const getDashboardStatsByScheduleId = async (scheduleId: string) =>
  axiosClient
    .get<ApiResponse<DashboardStatsResponse>>(
      `/staff/dashboard-stats/schedule/${encodeURIComponent(scheduleId)}`
    )
    .then((res) => res.data);