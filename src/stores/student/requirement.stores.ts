import type { RequirementStoreState } from "@/types/student/requirement.types";
import { create } from "zustand";

// Store creation
export const useRequirementStore = create<RequirementStoreState>(
  (set, get) => ({
    detailSheetState: false,
    selectedRequirement: null,

    setSelectedRequirement: (requirement) =>
      set({ selectedRequirement: requirement }),
    openDetailSheet: (requirement) =>
      set({ detailSheetState: true, selectedRequirement: requirement }),
    closeDetailSheet: () => {
      set({ detailSheetState: false });
      // Delay clearing selectedRequirement to allow animation to complete
      setTimeout(() => {
        if (!get().detailSheetState) {
          set({ selectedRequirement: null });
        }
      }, 300); // 300ms matches typical sheet animation duration
    },
    clearRequirementStore: () =>
      set({
        detailSheetState: false,
        selectedRequirement: null,
      }),
  })
);
