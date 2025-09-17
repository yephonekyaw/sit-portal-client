import type { ProgramRequirementStoreState } from "@/types/staff/prog-req.types";
import { create } from "zustand";

export const useProgramRequirementStore = create<ProgramRequirementStoreState>(
  (set) => ({
    selectedRequirement: null,
    archiveConfirmModalState: false,
    archiveRequirementId: null,

    setSelectedRequirement: (requirement) =>
      set({ selectedRequirement: requirement }),
    clearSelectedRequirement: () => set({ selectedRequirement: null }),
    setArchiveConfirmModalState: (state) =>
      set({ archiveConfirmModalState: state }),
    setArchiveRequirementId: (id) => set({ archiveRequirementId: id }),
    clearProgramRequirementStore: () =>
      set({
        selectedRequirement: null,
        archiveConfirmModalState: false,
        archiveRequirementId: null,
      }),
  })
);
