import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import type { Submission, SubmissionDetailStoreState } from "@/types/staff/submission.types";

export const useSubmissionDetailStore = create<SubmissionDetailStoreState>((set) => ({
  selectedSubmission: null,
  isDetailSheetOpen: false,

  setSelectedSubmission: (submission: Submission | null) => {
    set({ selectedSubmission: submission });
  },

  openDetailSheet: (submission: Submission) => {
    set({ selectedSubmission: submission, isDetailSheetOpen: true });
  },

  closeDetailSheet: () => {
    set({ isDetailSheetOpen: false });
  },

  clearSelectedSubmission: () => {
    set({ selectedSubmission: null, isDetailSheetOpen: false });
  },
}));

// Selector hook for components
export const useSubmissionDetailSheet = () =>
  useSubmissionDetailStore(
    useShallow((state) => ({
      selectedSubmission: state.selectedSubmission,
      isDetailSheetOpen: state.isDetailSheetOpen,
      openDetailSheet: state.openDetailSheet,
      closeDetailSheet: state.closeDetailSheet,
      setSelectedSubmission: state.setSelectedSubmission,
      clearSelectedSubmission: state.clearSelectedSubmission,
    }))
  );