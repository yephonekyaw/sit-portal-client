import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { GetSchedulesItem, ScheduleResponse } from "./types";
import type {
  CreateScheduleFormSchemaType,
  UpdateScheduleFormSchemaType,
} from "@/types/staff/schedules.types";

const getSchedules = async () =>
  axiosClient
    .get<ApiResponse<GetSchedulesItem[]>>(
      `/staff/${encodeURIComponent("program-requirement-schedules")}`
    )
    .then((res) => res.data);

const createSchedule = async (data: CreateScheduleFormSchemaType) =>
  axiosClient
    .post<ApiResponse<ScheduleResponse>>(
      `/staff/${encodeURIComponent("program-requirement-schedules")}`,
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
