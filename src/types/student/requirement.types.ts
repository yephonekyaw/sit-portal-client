import type { StudentRequirementWithSubmission } from "@/services/student/requirements/types";
import type { LucideIcon } from "lucide-react";

interface RequirementStoreState {
  detailSheetState: boolean;
  selectedRequirement: StudentRequirementWithSubmission | null;

  // Actions
  openDetailSheet: (requirement: StudentRequirementWithSubmission) => void;
  closeDetailSheet: () => void;
}

interface RequirementCardProps {
  requirement: StudentRequirementWithSubmission;
}

interface SheetOverviewProps {
  requirement: StudentRequirementWithSubmission;
}

interface FileUploadSectionProps {
  requirement: StudentRequirementWithSubmission;
}

interface StatusBadge {
  label: string;
  icon: LucideIcon;
  className: string;
}

type TabState = "details" | "history";

export type {
  RequirementStoreState,
  RequirementCardProps,
  SheetOverviewProps,
  FileUploadSectionProps,
  StatusBadge,
  TabState,
};
