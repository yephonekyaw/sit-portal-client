import { useEffect, useMemo, useRef } from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import { useParams } from "react-router-dom";
import { submissions } from "@/mock/submissions.mock";
import type {
  Submission,
  SubmissionFilters,
  SubmissionsFilterStoreState,
  SubmissionStatus,
} from "@/types/staff/submission.types";

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
      const searchLower = filters.search.toLowerCase().trim();
      if (searchLower) {
        const fullName =
          `${submission.student.user.first_name} ${submission.student.user.last_name}`.toLowerCase();
        const studentMatch =
          submission.student.user.first_name
            .toLowerCase()
            .includes(searchLower) ||
          submission.student.user.last_name
            .toLowerCase()
            .includes(searchLower) ||
          fullName.includes(searchLower) ||
          submission.student.user.email.toLowerCase().includes(searchLower) ||
          submission.student.roll_number.toLowerCase().includes(searchLower);

        if (!studentMatch) {
          return false;
        }
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

const getInitialDerivedState = () => {
  const currentYear = getCurrentYear();
  const initialFilters: SubmissionFilters = {
    academicYear: currentYear,
    requirementScheduleId: undefined,
    status: undefined,
    search: undefined,
  };

  const filtered = applyFilters(submissions, initialFilters);
  const totalPages = Math.max(1, Math.ceil(filtered.length / 24));
  const paginated = applyPagination(filtered, 1, 24);

  return {
    filteredSubmissions: filtered,
    paginatedSubmissions: paginated,
    pagination: {
      page: 1,
      pageSize: 24,
      totalItems: filtered.length,
      totalPages,
    },
  };
};

export const useSubmissionsFiltersStore = create<SubmissionsFilterStoreState>()(
  subscribeWithSelector((set, get) => {
    const initialDerived = getInitialDerivedState();

    return {
      // Initial state
      allSubmissions: submissions,
      ...initialDerived,

      filters: {
        academicYear: getCurrentYear(),
        requirementScheduleId: undefined,
        status: undefined,
        search: undefined,
      },

      isLoading: false,
      error: null,

      // Internal helper to update derived state
      _updateDerivedState: () => {
        try {
          const state = get();
          const filtered = applyFilters(state.allSubmissions, state.filters);
          const totalPages = Math.max(
            1,
            Math.ceil(filtered.length / state.pagination.pageSize)
          );

          // Ensure page is within bounds
          const safePage = Math.min(state.pagination.page, totalPages);

          const paginated = applyPagination(
            filtered,
            safePage,
            state.pagination.pageSize
          );

          set({
            filteredSubmissions: filtered,
            paginatedSubmissions: paginated,
            pagination: {
              ...state.pagination,
              page: safePage,
              totalItems: filtered.length,
              totalPages,
            },
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
          });
        }
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

      clearAllFilters: () => {
        set((state) => ({
          filters: {
            ...state.filters,
            requirementScheduleId: undefined,
            status: undefined,
            search: undefined,
          },
          pagination: { ...state.pagination, page: 1 },
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
    };
  })
);

// Subscribe to filter and pagination changes to update derived state
// Use deep comparison for filters and pagination to avoid infinite loops
const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== "object" || typeof b !== "object") return a === b;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (
      !keysB.includes(key) ||
      !isEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    ) {
      return false;
    }
  }

  return true;
};

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
    equalityFn: (a, b) => {
      return (
        isEqual(a.filters, b.filters) &&
        a.allSubmissions === b.allSubmissions &&
        a.page === b.page &&
        a.pageSize === b.pageSize
      );
    },
  }
);

// Debounced search hook
export const useDebouncedSearch = () => {
  const setSearch = useSubmissionsFiltersStore((state) => state.setSearch);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSetSearch = useMemo(() => {
    return (searchValue: string | undefined) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setSearch(searchValue);
      }, 300);
    };
  }, [setSearch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedSetSearch;
};

export const useInitializeSubmissionsFromParams = () => {
  const params = useParams();
  const initializeFromParams = useSubmissionsFiltersStore(
    (state) => state.initializeFromParams
  );

  useEffect(() => {
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

// Additional selector hooks for better performance
export const useSubmissionsData = () =>
  useSubmissionsFiltersStore(
    useShallow((state) => ({
      paginatedSubmissions: state.paginatedSubmissions,
      isLoading: state.isLoading,
      error: state.error,
      totalItems: state.pagination.totalItems,
    }))
  );

export const useSubmissionsFilters = () =>
  useSubmissionsFiltersStore(
    useShallow((state) => ({
      filters: state.filters,
      setAcademicYear: state.setAcademicYear,
      setRequirementScheduleId: state.setRequirementScheduleId,
      setStatus: state.setStatus,
      setSearch: state.setSearch,
      clearAllFilters: state.clearAllFilters,
    }))
  );

// Type exports
export type { SubmissionStatus };
