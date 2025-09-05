import type { ProgramStoreState } from "@/types/staff/program.types";
import { create } from "zustand";

export const useProgramStore = create<ProgramStoreState>((set) => ({
  selectedProgram: null,
  setSelectedProgram: (program) => set({ selectedProgram: program }),
  clearSelectedProgram: () => set({ selectedProgram: null }),

  archiveConfirmModalState: false,
  setArchiveConfirmModalState: (state) =>
    set({ archiveConfirmModalState: state }),

  archiveProgramId: null,
  setArchiveProgramId: (id) => set({ archiveProgramId: id }),
}));
