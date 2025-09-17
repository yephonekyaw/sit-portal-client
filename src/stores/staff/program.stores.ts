import type { ProgramStoreState } from "@/types/staff/program.types";
import { create } from "zustand";

export const useProgramStore = create<ProgramStoreState>((set) => ({
  selectedProgram: null,
  archiveConfirmModalState: false,
  archiveProgramId: null,

  setSelectedProgram: (program) => set({ selectedProgram: program }),
  clearSelectedProgram: () => set({ selectedProgram: null }),
  setArchiveConfirmModalState: (state) =>
    set({ archiveConfirmModalState: state }),
  setArchiveProgramId: (id) => set({ archiveProgramId: id }),
  clearProgramStore: () =>
    set({
      selectedProgram: null,
      archiveConfirmModalState: false,
      archiveProgramId: null,
    }),
}));
