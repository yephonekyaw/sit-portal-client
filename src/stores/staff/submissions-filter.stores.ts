import React from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import { useParams } from "react-router-dom";
import { submissions, type Submission } from "@/mock/submissions.mock";

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

  // Actions
  setAcademicYear: (year: string) => void;
  setRequirementScheduleId: (id: string | undefined) => void;
  setStatus: (status: SubmissionStatus | undefined) => void;
  setSearch: (search: string | undefined) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  initializeFromParams: (
    academicYear?: string,
    requirementSchedule?: string
  ) => void;

  // Internal helper
  _updateDerivedState: () => void;
}

const getCurrentYear = () => new Date().getFullYear().toString();

const applyFilters = (
  submissions: Submission[],
  filters: SubmissionFilters
): Submission[] => {
  return submissions.filter((submission) => {
    // Academic year filter (always required)
    if (
      submission.requirement_schedule.academic_year.year_code !==
      filters.academicYear
    ) {
      return false;
    }

    // Requirement schedule ID filter
    if (
      filters.requirementScheduleId &&
      submission.requirement_schedule.id !== filters.requirementScheduleId
    ) {
      return false;
    }

    // Status filter
    if (filters.status && submission.status !== filters.status) {
      return false;
    }

    // Search filter (search in student name, email, roll number)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const studentMatch =
        submission.student.user.first_name
          .toLowerCase()
          .includes(searchLower) ||
        submission.student.user.last_name.toLowerCase().includes(searchLower) ||
        submission.student.user.email.toLowerCase().includes(searchLower) ||
        submission.student.roll_number.toLowerCase().includes(searchLower) ||
        submission.certificate_type.name.toLowerCase().includes(searchLower);

      if (!studentMatch) {
        return false;
      }
    }

    return true;
  });
};

const applyPagination = (
  submissions: Submission[],
  page: number,
  pageSize: number
): Submission[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return submissions.slice(startIndex, endIndex);
};

export const useSubmissionsFiltersStore = create<SubmissionsFilterStoreState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    allSubmissions: submissions,
    filteredSubmissions: [],
    paginatedSubmissions: [],

    filters: {
      academicYear: getCurrentYear(),
      requirementScheduleId: undefined,
      status: undefined,
      search: undefined,
    },

    pagination: {
      page: 1,
      pageSize: 20,
      totalItems: submissions.length,
      totalPages: Math.ceil(submissions.length / 20),
    },

    isLoading: false,

    // Internal helper to update derived state
    _updateDerivedState: () => {
      const state = get();
      const filtered = applyFilters(state.allSubmissions, state.filters);
      const totalPages = Math.ceil(filtered.length / state.pagination.pageSize);
      const paginated = applyPagination(
        filtered,
        state.pagination.page,
        state.pagination.pageSize
      );

      set({
        filteredSubmissions: filtered,
        paginatedSubmissions: paginated,
        pagination: {
          ...state.pagination,
          totalItems: filtered.length,
          totalPages: Math.max(1, totalPages),
        },
      });
    },

    // Actions
    setAcademicYear: (year: string) => {
      set((state) => ({
        filters: { ...state.filters, academicYear: year },
        pagination: { ...state.pagination, page: 1 },
      }));
    },

    setRequirementScheduleId: (id: string | undefined) => {
      set((state) => ({
        filters: { ...state.filters, requirementScheduleId: id },
        pagination: { ...state.pagination, page: 1 },
      }));
    },

    setStatus: (status: SubmissionStatus | undefined) => {
      set((state) => ({
        filters: { ...state.filters, status },
        pagination: { ...state.pagination, page: 1 },
      }));
    },

    setSearch: (search: string | undefined) => {
      set((state) => ({
        filters: { ...state.filters, search },
        pagination: { ...state.pagination, page: 1 },
      }));
    },

    setPage: (page: number) => {
      set((state) => ({
        pagination: { ...state.pagination, page },
      }));
    },

    setPageSize: (pageSize: number) => {
      set((state) => ({
        pagination: { ...state.pagination, pageSize, page: 1 },
      }));
    },

    initializeFromParams: (
      academicYear?: string,
      requirementSchedule?: string
    ) => {
      set((state) => ({
        filters: {
          ...state.filters,
          academicYear: academicYear || state.filters.academicYear,
          requirementScheduleId:
            requirementSchedule || state.filters.requirementScheduleId,
        },
        pagination: {
          ...state.pagination,
          page: 1,
        },
      }));
    },
  }))
);

// Subscribe to filter and pagination changes to update derived state
// Only subscribe to filters and allSubmissions, NOT the derived state
useSubmissionsFiltersStore.subscribe(
  (state) => ({
    filters: state.filters,
    allSubmissions: state.allSubmissions,
    page: state.pagination.page,
    pageSize: state.pagination.pageSize,
  }),
  () => {
    // Call the helper to update derived state
    useSubmissionsFiltersStore.getState()._updateDerivedState();
  },
  {
    equalityFn: (a, b) =>
      a.filters === b.filters && a.allSubmissions === b.allSubmissions,
  }
);

export const useInitializeSubmissionsFromParams = () => {
  const params = useParams();
  const initializeFromParams = useSubmissionsFiltersStore(
    (state) => state.initializeFromParams
  );

  React.useEffect(() => {
    initializeFromParams(params.academicYear, params.requirementSchedule);
  }, [params.academicYear, params.requirementSchedule, initializeFromParams]);
};

export const useSubmissionsPagination = () =>
  useSubmissionsFiltersStore(
    useShallow((state) => ({
      pagination: state.pagination,
      setPage: state.setPage,
      setPageSize: state.setPageSize,
    }))
  );
