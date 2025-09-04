import type z from "zod";
import type { scheduleFormSchema } from "@/schemas/staff/schedules.schemas";
import type { GetSchedulesItem } from "@/services/staff/schedules/types";

type ScheduleFormSchemaType = z.infer<typeof scheduleFormSchema>;

type UpdateScheduleFormSchemaType = Omit<ScheduleFormSchemaType, ""> & {
  id: string;
};

interface ScheduleStoreState {
  selectedSchedule: GetSchedulesItem | null;
  setSelectedSchedule: (schedule: GetSchedulesItem | null) => void;
  clearSelectedSchedule: () => void;

  // Modal states if needed in the future
  // createModalState: boolean;
  // setCreateModalState: (state: boolean) => void;

  // editModalState: boolean;
  // setEditModalState: (state: boolean) => void;

  // editScheduleId: string | null;
  // setEditScheduleId: (id: string | null) => void;
}

interface ScheduleFormProps {
  isEdit: boolean;
  scheduleId?: string;
}

export type {
  ScheduleFormSchemaType,
  ScheduleStoreState,
  ScheduleFormProps,
  UpdateScheduleFormSchemaType,
};
