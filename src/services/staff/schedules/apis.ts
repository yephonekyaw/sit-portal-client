import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { GetSchedulesItem, ScheduleResponse } from "./types";
import type {
  ScheduleFormSchemaType,
  UpdateScheduleFormSchemaType,
} from "@/types/staff/schedules.types";

const getSchedules = async () =>
  axiosClient
    .get<ApiResponse<GetSchedulesItem[]>>(
      "/staff/program-requirement-schedules"
    )
    .then((res) => res.data);

const createSchedule = async (data: ScheduleFormSchemaType) =>
  axiosClient
    .post<ApiResponse<ScheduleResponse>>(
      "/staff/program-requirement-schedules",
      data
    )
    .then((res) => res.data);

const updateSchedule = async (data: UpdateScheduleFormSchemaType) =>
  axiosClient
    .put<ApiResponse<ScheduleResponse>>(
      `/staff/program-requirement-schedules/${encodeURIComponent(data.id)}`,
      data
    )
    .then((res) => res.data);

export { getSchedules, createSchedule, updateSchedule };
