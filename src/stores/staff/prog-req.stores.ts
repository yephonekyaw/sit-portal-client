import type { ProgramRequirementStoreState } from "@/types/staff/prog-req.types";
import { create } from "zustand";

export const useProgramRequirementStore = create<ProgramRequirementStoreState>(
  (set) => ({
    selectedRequirement: null,
    setSelectedRequirement: (requirement) =>
      set({ selectedRequirement: requirement }),
    clearSelectedRequirement: () => set({ selectedRequirement: null }),

    archiveConfirmModalState: false,
    setArchiveConfirmModalState: (state) =>
      set({ archiveConfirmModalState: state }),

    archiveRequirementId: null,
    setArchiveRequirementId: (id) => set({ archiveRequirementId: id }),
  })
);
