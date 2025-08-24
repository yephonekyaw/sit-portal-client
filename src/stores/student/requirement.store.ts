import type { RequirementStoreState } from "@/types/student/requirement.types";
import { create } from "zustand";

// Store creation
export const useRequirementStore = create<RequirementStoreState>((set) => ({
  detailSheetState: false,
  selectedRequirement: null,

  openDetailSheet: (requirement) =>
    set({ detailSheetState: true, selectedRequirement: requirement }),
  closeDetailSheet: () =>
    set({ detailSheetState: false, selectedRequirement: null }),
}));
