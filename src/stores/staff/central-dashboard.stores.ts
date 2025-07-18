import type { NavState } from "@/types/staff/central-dashboard.types";
import { create } from "zustand";

export const useCentralDashboardNavStore = create<NavState>((set) => ({
  activeItem: "prog",
  setActiveItem: (id) => set({ activeItem: id }),
}));
