import type { ProgramStoreState } from "@/types/staff/programs.types";
import { create } from "zustand";

export const useProgramStore = create<ProgramStoreState>((set) => ({
  selectedProgram: null,
  setSelectedProgram: (program) => set({ selectedProgram: program }),
  clearSelectedProgram: () => set({ selectedProgram: null }),

  deleteConfirmModalState: false,
  setDeleteConfirmModalState: (state) =>
    set({ deleteConfirmModalState: state }),

  archiveProgramId: null,
  setArchiveProgramId: (id) => set({ archiveProgramId: id }),
}));
