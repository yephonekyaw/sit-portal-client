import { create } from "zustand";
import type { SubmissionStoreState } from "@/types/staff/submission.types";

export const useSubmissionStore = create<SubmissionStoreState>((set, get) => ({
  detailSheetState: false,
  selectedSubmission: null,
  submissionRelatedDetail: null,
  currentTab: "submitted",

  openDetailSheet: (submission) =>
    set({
      detailSheetState: true,
      selectedSubmission: submission,
    }),
  closeDetailSheet: () => {
    set({ detailSheetState: false });
    // Delay clearing selectedRequirement to allow animation to complete
    setTimeout(() => {
      if (!get().detailSheetState) {
        set({ selectedSubmission: null });
      }
    }, 300); // 300ms matches typical sheet animation duration
  },
  setSubmissionRelatedDetail: (data) => set({ submissionRelatedDetail: data }),
  setSelectedSubmission: (submission) =>
    set({
      selectedSubmission: submission,
    }),
  setCurrentTab: (tab) =>
    set({
      currentTab: tab,
    }),
}));
