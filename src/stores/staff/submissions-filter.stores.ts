import { useEffect, useMemo, useRef } from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import { useParams } from "react-router-dom";
import { submissions } from "@/mock/submissions.mock";
import { unsubmittedStudents } from "@/mock/unsubmitted-students.mock";
import {
  applySubmissionFilters,
  applyUnsubmittedFilters,
} from "@/utils/staff/submission-filters.utils";
import {
  applyPagination,
  calculatePaginationMeta,
} from "@/utils/staff/pagination.utils";
import { isEqual } from "@/utils/common.utils";
import type {
  Submission,
  UnsubmittedStudent,
  SubmissionFilters,
  SubmissionsFilterStoreState,
  SubmissionStatus,
  ViewMode,
} from "@/types/staff/submission.types";

// Constants
const getCurrentYear = () => new Date().getFullYear().toString();
const DEFAULT_PAGE_SIZE = 24;

// Helper function to create initial filters
const createInitialFilters = (): SubmissionFilters => ({
  academicYear: getCurrentYear(),
  requirementScheduleId: undefined,
  status: undefined,
  search: undefined,
  viewMode: "submitted",
});

// Helper function to compute filtered and paginated data
const computeDerivedData = (
  allSubmissions: Submission[],
  allUnsubmittedStudents: UnsubmittedStudent[],
  filters: SubmissionFilters,
  currentPage: number,
  pageSize: number
) => {
  // Apply filters
  const filteredSubmissions = applySubmissionFilters(allSubmissions, filters);
  const filteredUnsubmitted = applyUnsubmittedFilters(
    allUnsubmittedStudents,
    filters
  );

  // Determine current dataset based on view mode
  const currentData =
    filters.viewMode === "submitted"
      ? filteredSubmissions
      : filteredUnsubmitted;

  // Calculate pagination metadata
  const paginationMeta = calculatePaginationMeta(
    currentData.length,
    currentPage,
    pageSize
  );

  // Apply pagination
  const paginatedSubmissions = applyPagination(
    filteredSubmissions,
    paginationMeta.page,
    pageSize
  );
  const paginatedUnsubmitted = applyPagination(
    filteredUnsubmitted,
    paginationMeta.page,
    pageSize
  );

  return {
    filteredSubmissions,
    filteredUnsubmittedStudents: filteredUnsubmitted,
    paginatedSubmissions,
    paginatedUnsubmittedStudents: paginatedUnsubmitted,
    pagination: paginationMeta,
  };
};

// Initialize derived state with default values
const getInitialDerivedState = () => {
  const initialFilters = createInitialFilters();
  return computeDerivedData(
    submissions,
    unsubmittedStudents,
    initialFilters,
    1,
    DEFAULT_PAGE_SIZE
  );
};

// Store creation
export const useSubmissionsFiltersStore = create<SubmissionsFilterStoreState>()(
  subscribeWithSelector((set, get) => {
    const initialDerived = getInitialDerivedState();
    const initialFilters = createInitialFilters();

    return {
      // Data state
      allSubmissions: submissions,
      allUnsubmittedStudents: unsubmittedStudents,
      ...initialDerived,

      // Filter state
      filters: initialFilters,

      // UI state
      isLoading: false,
      error: null,

      // Internal helper to recompute derived state
      _updateDerivedState: () => {
        try {
          const state = get();
          const derivedData = computeDerivedData(
            state.allSubmissions,
            state.allUnsubmittedStudents,
            state.filters,
            state.pagination.page,
            state.pagination.pageSize
          );

          set({
            ...derivedData,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
          });
        }
      },

      // Filter actions - all reset to page 1
      setViewMode: (mode: ViewMode) => {
        set((state) => ({
          filters: { ...state.filters, viewMode: mode },
          pagination: { ...state.pagination, page: 1 },
        }));
      },

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

      // Pagination actions
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

      // Utility actions
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
          pagination: { ...state.pagination, page: 1 },
        }));
      },
    };
  })
);

// Auto-update derived state when filters or pagination change
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

// =============================================================================
// HOOKS & SELECTORS
// =============================================================================

/**
 * Hook for accessing paginated submissions data and loading states
 */
export const useSubmissionsData = () =>
  useSubmissionsFiltersStore(
    useShallow((state) => ({
      paginatedSubmissions: state.paginatedSubmissions,
      paginatedUnsubmittedStudents: state.paginatedUnsubmittedStudents,
      isLoading: state.isLoading,
      error: state.error,
      totalItems: state.pagination.totalItems,
      viewMode: state.filters.viewMode,
    }))
  );

/**
 * Hook for managing filters with optimized selectors
 */
export const useSubmissionsFilters = () =>
  useSubmissionsFiltersStore(
    useShallow((state) => ({
      filters: state.filters,
      setViewMode: state.setViewMode,
      setAcademicYear: state.setAcademicYear,
      setRequirementScheduleId: state.setRequirementScheduleId,
      setStatus: state.setStatus,
      setSearch: state.setSearch,
      clearAllFilters: state.clearAllFilters,
    }))
  );

/**
 * Hook for pagination controls
 */
export const useSubmissionsPagination = () =>
  useSubmissionsFiltersStore(
    useShallow((state) => ({
      pagination: state.pagination,
      setPage: state.setPage,
      setPageSize: state.setPageSize,
    }))
  );

/**
 * Debounced search hook to prevent excessive API calls
 */
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

/**
 * Hook to initialize filters from URL parameters
 */
export const useInitializeSubmissionsFromParams = () => {
  const params = useParams();
  const initializeFromParams = useSubmissionsFiltersStore(
    (state) => state.initializeFromParams
  );

  useEffect(() => {
    initializeFromParams(params.academicYear, params.requirementSchedule);
  }, [params.academicYear, params.requirementSchedule, initializeFromParams]);
};
