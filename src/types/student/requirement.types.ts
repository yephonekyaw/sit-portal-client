import type { StudentRequirementWithSubmission } from "@/services/student/requirements/types";

interface RequirementStoreState {
  detailSheetState: boolean;
  selectedRequirement: StudentRequirementWithSubmission | null;

  // Actions
  openDetailSheet: (requirement: StudentRequirementWithSubmission) => void;
  closeDetailSheet: () => void;
}

export type { RequirementStoreState };
