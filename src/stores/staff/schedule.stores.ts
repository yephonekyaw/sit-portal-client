import type { ScheduleStoreState } from "@/types/staff/schedule.types";
import { create } from "zustand";

export const useScheduleStore = create<ScheduleStoreState>((set) => ({
  selectedSchedule: null,
  setSelectedSchedule: (schedule) => set({ selectedSchedule: schedule }),
  clearSelectedSchedule: () => set({ selectedSchedule: null }),
}));
