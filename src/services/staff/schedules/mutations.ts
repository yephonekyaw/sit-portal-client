import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule, updateSchedule } from "./apis";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type { ScheduleResponse } from "./types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type {
  ScheduleFormSchemaType,
  UpdateScheduleFormSchemaType,
} from "@/types/staff/schedules.types";

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<ScheduleResponse>,
    ApiError,
    ScheduleFormSchemaType
  >({
    mutationFn: createSchedule,
    onSuccess: () => {
      toast.success("Program requirement schedule created successfully");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      navigate("/staff/student-management/dashboard/schedules");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create schedule");
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<ScheduleResponse>,
    ApiError,
    UpdateScheduleFormSchemaType
  >({
    mutationFn: updateSchedule,
    onSuccess: () => {
      toast.success("Program requirement schedule updated successfully");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      navigate("/staff/student-management/dashboard/schedules");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update schedule");
    },
  });
};
