import type { submissions } from "@/mock/submissions.mock";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  mainValue: number;
  icon: LucideIcon;
  breakdowns: Array<{
    label: string;
    value: number;
    percentage: number;
  }>;
  colorPalette: readonly string[];
}

type Submission = (typeof submissions)[number];

type SubmissionStatus = "pending" | "approved" | "rejected" | "manual_review";

interface SubmissionFilters {
  academicYear: string;
  requirementScheduleId?: string;
  status?: SubmissionStatus;
  search?: string;
}

interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface SubmissionsFilterStoreState {
  allSubmissions: Submission[];
  filteredSubmissions: Submission[];
  paginatedSubmissions: Submission[];

  filters: SubmissionFilters;

  pagination: PaginationState;

  isLoading: boolean;
  error: string | null;

  // Actions
  setAcademicYear: (year: string) => void;
  setRequirementScheduleId: (id: string | undefined) => void;
  setStatus: (status: SubmissionStatus | undefined) => void;
  setSearch: (search: string | undefined) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  clearAllFilters: () => void;
  initializeFromParams: (
    academicYear?: string,
    requirementSchedule?: string
  ) => void;

  // Internal helper
  _updateDerivedState: () => void;
}

export type {
  StatCardProps,
  Submission,
  SubmissionStatus,
  SubmissionFilters,
  PaginationState,
  SubmissionsFilterStoreState,
};
