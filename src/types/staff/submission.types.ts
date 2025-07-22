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

type ViewMode = "submitted" | "unsubmitted";

// Unsubmitted student type
type UnsubmittedStudent = {
  id: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  roll_number: string;
  program: {
    program_code: string;
    name: string;
  };
  requirement_schedule: {
    id: string;
    name: string;
    submission_deadline: string;
    academic_year: {
      year_code: string;
    };
  };
  certificate_type: {
    code: string;
    name: string;
  };
};

interface SubmissionFilters {
  academicYear: string;
  requirementScheduleId?: string;
  status?: SubmissionStatus;
  search?: string;
  viewMode: ViewMode;
}

interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface SubmissionsFilterStoreState {
  allSubmissions: Submission[];
  allUnsubmittedStudents: UnsubmittedStudent[];
  filteredSubmissions: Submission[];
  filteredUnsubmittedStudents: UnsubmittedStudent[];
  paginatedSubmissions: Submission[];
  paginatedUnsubmittedStudents: UnsubmittedStudent[];

  filters: SubmissionFilters;

  pagination: PaginationState;

  isLoading: boolean;
  error: string | null;

  // Actions
  setViewMode: (mode: ViewMode) => void;
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

// Submission detail sheet store
interface SubmissionDetailStoreState {
  selectedSubmission: Submission | null;
  isDetailSheetOpen: boolean;

  // Actions
  setSelectedSubmission: (submission: Submission | null) => void;
  openDetailSheet: (submission: Submission) => void;
  closeDetailSheet: () => void;
  clearSelectedSubmission: () => void;
}

// Dashboard stats types
interface DashboardStats {
  total_submissions_required: number;
  submitted_count: number;
  not_submitted_count: number;
  approved_count: number;
  pending_count: number;
  rejected_count: number;
  manual_review_count: number;
  manual_verification_count: number;
  agent_verification_count: number;
  on_time_submissions: number;
  late_submissions: number;
  overdue_count: number;
}

interface DashboardStatsStoreState {
  // Current filters for stats (only academic year and requirement schedule)
  academicYear: string;
  requirementScheduleId?: string;
  
  // Computed stats
  stats: DashboardStats;
  
  isLoading: boolean;
  error: string | null;

  // Actions
  setAcademicYear: (year: string) => void;
  setRequirementScheduleId: (id: string | undefined) => void;
  updateFilters: (academicYear: string, requirementScheduleId?: string) => void;
  
  // Internal helper
  _recomputeStats: () => void;
}

export type {
  StatCardProps,
  Submission,
  UnsubmittedStudent,
  SubmissionStatus,
  ViewMode,
  SubmissionFilters,
  PaginationState,
  SubmissionsFilterStoreState,
  SubmissionDetailStoreState,
  DashboardStats,
  DashboardStatsStoreState,
};
