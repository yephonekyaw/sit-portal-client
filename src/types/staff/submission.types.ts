import { z } from "zod";
import type { ManualVerificationFormSchema } from "@/schemas/staff/submission.schemas";
import type {
  StudentSubmissionItem,
  SubmissionRelatedData,
} from "@/services/staff/submissions/types";

export type ManualVerificationFormSchemaType = z.infer<
  typeof ManualVerificationFormSchema
>;

export interface SubmissionStoreState {
  detailSheetState: boolean;
  submissionRelatedDetail: SubmissionRelatedData | null;
  selectedSubmission: StudentSubmissionItem | null;
  currentTab: "submitted" | "not_submitted" | "stats";

  // Actions
  openDetailSheet: (submission: StudentSubmissionItem) => void;
  closeDetailSheet: () => void;
  setSubmissionRelatedDetail: (data: SubmissionRelatedData | null) => void;
  setSelectedSubmission: (submission: StudentSubmissionItem | null) => void;
  setCurrentTab: (tab: "submitted" | "not_submitted" | "stats") => void;
}
