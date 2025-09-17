import type { StudentRequirementWithSubmission } from "@/services/student/requirements/types";
import type { LucideIcon } from "lucide-react";

interface RequirementStoreState {
  detailSheetState: boolean;
  selectedRequirement: StudentRequirementWithSubmission | null;

  // Actions
  setSelectedRequirement: (
    requirement: StudentRequirementWithSubmission
  ) => void;
  openDetailSheet: (requirement: StudentRequirementWithSubmission) => void;
  closeDetailSheet: () => void;
  clearRequirementStore: () => void;
}

interface RequirementCardProps {
  requirement: StudentRequirementWithSubmission;
}

interface SheetOverviewProps {
  requirement: StudentRequirementWithSubmission;
}

interface FileUploadSectionProps {
  requirement: StudentRequirementWithSubmission;
  isEditMode?: boolean;
  onBack?: () => void;
}

interface StatusBadge {
  label: string;
  icon: LucideIcon;
  className: string;
}

type TabState = "details" | "history";

interface StudentVerificationHistoryProps {
  submissionId: string;
}

export type {
  RequirementStoreState,
  RequirementCardProps,
  SheetOverviewProps,
  FileUploadSectionProps,
  StatusBadge,
  TabState,
  StudentVerificationHistoryProps,
};
