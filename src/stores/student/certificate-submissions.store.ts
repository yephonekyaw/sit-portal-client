import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import { 
  studentSchedules, 
  getSubmissionByScheduleId 
} from "@/mock/student-submissions.mock";
import type {
  ProgramRequirementSchedule,
  CertificateSubmission,
  SubmissionFilters,
  SubmissionStats,
  StudentSubmissionStoreState,
  PaginationState,
  FileUploadState,
} from "@/types/student/submission.types";

// Constants
const DEFAULT_PAGE_SIZE = 10;

// Helper function to create initial filters
const createInitialFilters = (): SubmissionFilters => ({
  search: "",
  status: "all",
  academic_year: undefined,
  program: undefined,
  certificate_type: undefined,
});


// Helper function to filter schedules based on filters
const filterSchedules = (
  schedules: ProgramRequirementSchedule[],
  filters: SubmissionFilters,
  getSubmission: (scheduleId: string) => CertificateSubmission | undefined
): ProgramRequirementSchedule[] => {
  return schedules.filter((schedule) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        schedule.program_requirement.name.toLowerCase().includes(searchLower) ||
        schedule.program_requirement.certificate_type.code.toLowerCase().includes(searchLower) ||
        schedule.program_requirement.certificate_type.name.toLowerCase().includes(searchLower) ||
        schedule.program_requirement.program.program_name.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status !== "all") {
      const submission = getSubmission(schedule.id);
      const isOverdue = new Date(schedule.submission_deadline) < new Date();

      switch (filters.status) {
        case "completed":
          return submission && submission.status === "APPROVED";
        case "pending":
          return submission && ["PENDING", "MANUAL_REVIEW"].includes(submission.status);
        case "rejected":
          return submission && submission.status === "REJECTED";
        case "not-submitted":
          return !submission && !isOverdue;
        case "overdue":
          return !submission && isOverdue;
        default:
          return true;
      }
    }

    // Academic year filter
    if (filters.academic_year) {
      if (schedule.academic_year.year_code !== filters.academic_year) return false;
    }

    // Program filter
    if (filters.program) {
      if (schedule.program_requirement.program.program_code !== filters.program) return false;
    }

    // Certificate type filter
    if (filters.certificate_type) {
      if (schedule.program_requirement.certificate_type.code !== filters.certificate_type) return false;
    }

    return true;
  });
};

// Helper function to calculate statistics
const calculateStatistics = (
  schedules: ProgramRequirementSchedule[],
  getSubmission: (scheduleId: string) => CertificateSubmission | undefined
): SubmissionStats => {
  const stats: SubmissionStats = {
    total: schedules.length,
    completed: 0,
    pending: 0,
    rejected: 0,
    not_submitted: 0,
    overdue: 0,
    on_time: 0,
    late: 0,
  };

  schedules.forEach((schedule) => {
    const submission = getSubmission(schedule.id);
    const isOverdue = new Date(schedule.submission_deadline) < new Date();

    if (submission) {
      switch (submission.status) {
        case "APPROVED":
          stats.completed++;
          // Check if submitted before deadline
          if (new Date(submission.submitted_at) <= new Date(schedule.submission_deadline)) {
            stats.on_time++;
          } else {
            stats.late++;
          }
          break;
        case "PENDING":
        case "MANUAL_REVIEW":
          stats.pending++;
          break;
        case "REJECTED":
          stats.rejected++;
          break;
      }
    } else {
      if (isOverdue) {
        stats.overdue++;
      } else {
        stats.not_submitted++;
      }
    }
  });

  return stats;
};

// Helper function to apply pagination
const applyPagination = (
  items: ProgramRequirementSchedule[],
  page: number,
  pageSize: number
): { paginatedItems: ProgramRequirementSchedule[]; pagination: PaginationState } => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    paginatedItems: items.slice(startIndex, endIndex),
    pagination: {
      page: Math.min(page, Math.max(1, totalPages)),
      pageSize,
      totalItems,
      totalPages,
    },
  };
};

// Store creation
export const useCertificateSubmissionsStore = create<StudentSubmissionStoreState>()(
  subscribeWithSelector((set, get) => {
    const initialFilters = createInitialFilters();
    const initialSchedules = studentSchedules;
    const initialSubmissions = studentSchedules
      .map(schedule => getSubmissionByScheduleId(schedule.id))
      .filter(Boolean) as CertificateSubmission[];

    // Calculate initial filtered data
    const getSubmissionForSchedule = (scheduleId: string) => 
      initialSubmissions.find(sub => sub.requirement_schedule_id === scheduleId);

    const initialFilteredSchedules = filterSchedules(
      initialSchedules, 
      initialFilters, 
      getSubmissionForSchedule
    );

    const { paginatedItems, pagination } = applyPagination(
      initialFilteredSchedules,
      1,
      DEFAULT_PAGE_SIZE
    );

    return {
      // Data
      schedules: initialSchedules,
      submissions: initialSubmissions,
      filteredSchedules: paginatedItems,

      // UI state
      filters: initialFilters,
      pagination,
      isLoading: false,
      error: null,

      // Modal state
      uploadModalOpen: false,
      selectedSchedule: null,

      // Actions
      setSchedules: (schedules: ProgramRequirementSchedule[]) => {
        set((state) => {
          const filteredSchedules = filterSchedules(
            schedules,
            state.filters,
            state.getSubmissionForSchedule
          );
          const { paginatedItems, pagination: newPagination } = applyPagination(
            filteredSchedules,
            state.pagination.page,
            state.pagination.pageSize
          );

          return {
            schedules,
            filteredSchedules: paginatedItems,
            pagination: newPagination,
          };
        });
      },

      setSubmissions: (submissions: CertificateSubmission[]) => {
        set((state) => {
          const filteredSchedules = filterSchedules(
            state.schedules,
            state.filters,
            (scheduleId: string) => submissions.find(sub => sub.requirement_schedule_id === scheduleId)
          );
          const { paginatedItems, pagination: newPagination } = applyPagination(
            filteredSchedules,
            state.pagination.page,
            state.pagination.pageSize
          );

          return {
            submissions,
            filteredSchedules: paginatedItems,
            pagination: newPagination,
          };
        });
      },

      setFilters: (newFilters: Partial<SubmissionFilters>) => {
        set((state) => {
          const updatedFilters = { ...state.filters, ...newFilters };
          const filteredSchedules = filterSchedules(
            state.schedules,
            updatedFilters,
            state.getSubmissionForSchedule
          );
          const { paginatedItems, pagination: newPagination } = applyPagination(
            filteredSchedules,
            1, // Reset to first page when filtering
            state.pagination.pageSize
          );

          return {
            filters: updatedFilters,
            filteredSchedules: paginatedItems,
            pagination: newPagination,
          };
        });
      },

      setPage: (page: number) => {
        set((state) => {
          const filteredSchedules = filterSchedules(
            state.schedules,
            state.filters,
            state.getSubmissionForSchedule
          );
          const { paginatedItems, pagination: newPagination } = applyPagination(
            filteredSchedules,
            page,
            state.pagination.pageSize
          );

          return {
            filteredSchedules: paginatedItems,
            pagination: newPagination,
          };
        });
      },

      setPageSize: (pageSize: number) => {
        set((state) => {
          const filteredSchedules = filterSchedules(
            state.schedules,
            state.filters,
            state.getSubmissionForSchedule
          );
          const { paginatedItems, pagination: newPagination } = applyPagination(
            filteredSchedules,
            1, // Reset to first page when changing page size
            pageSize
          );

          return {
            filteredSchedules: paginatedItems,
            pagination: newPagination,
          };
        });
      },

      openUploadModal: (schedule: ProgramRequirementSchedule) => {
        set({
          uploadModalOpen: true,
          selectedSchedule: schedule,
        });
      },

      closeUploadModal: () => {
        set({
          uploadModalOpen: false,
          selectedSchedule: null,
        });
      },

      clearFilters: () => {
        set((state) => {
          const initialFilters = createInitialFilters();
          const filteredSchedules = filterSchedules(
            state.schedules,
            initialFilters,
            state.getSubmissionForSchedule
          );
          const { paginatedItems, pagination: newPagination } = applyPagination(
            filteredSchedules,
            1,
            state.pagination.pageSize
          );

          return {
            filters: initialFilters,
            filteredSchedules: paginatedItems,
            pagination: newPagination,
          };
        });
      },

      // Helper methods
      getSubmissionForSchedule: (scheduleId: string) => {
        const state = get();
        return state.submissions.find(sub => sub.requirement_schedule_id === scheduleId);
      },

      getStatistics: (): SubmissionStats => {
        const state = get();
        return calculateStatistics(state.schedules, state.getSubmissionForSchedule);
      },

      refreshData: async () => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would fetch from API
          // For now, we'll just reset to mock data
          const schedules = studentSchedules;
          const submissions = studentSchedules
            .map(schedule => getSubmissionByScheduleId(schedule.id))
            .filter(Boolean) as CertificateSubmission[];

          const state = get();
          const filteredSchedules = filterSchedules(
            schedules,
            state.filters,
            (scheduleId: string) => submissions.find(sub => sub.requirement_schedule_id === scheduleId)
          );
          const { paginatedItems, pagination } = applyPagination(
            filteredSchedules,
            state.pagination.page,
            state.pagination.pageSize
          );

          set({
            schedules,
            submissions,
            filteredSchedules: paginatedItems,
            pagination,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to refresh data",
            isLoading: false,
          });
        }
      },
    };
  })
);

// =============================================================================
// HOOKS & SELECTORS
// =============================================================================

/**
 * Hook for accessing submission data and loading states
 */
export const useSubmissionData = () =>
  useCertificateSubmissionsStore(
    useShallow((state) => ({
      schedules: state.schedules,
      submissions: state.submissions,
      filteredSchedules: state.filteredSchedules,
      isLoading: state.isLoading,
      error: state.error,
      pagination: state.pagination,
      getSubmissionForSchedule: state.getSubmissionForSchedule,
      refreshData: state.refreshData,
    }))
  );

/**
 * Hook for managing filters
 */
export const useSubmissionFilters = () =>
  useCertificateSubmissionsStore(
    useShallow((state) => ({
      filters: state.filters,
      setFilters: state.setFilters,
      clearFilters: state.clearFilters,
    }))
  );

/**
 * Hook for pagination controls
 */
export const useSubmissionPagination = () =>
  useCertificateSubmissionsStore(
    useShallow((state) => ({
      pagination: state.pagination,
      setPage: state.setPage,
      setPageSize: state.setPageSize,
    }))
  );

/**
 * Hook for modal state management
 */
export const useSubmissionModal = () =>
  useCertificateSubmissionsStore(
    useShallow((state) => ({
      uploadModalOpen: state.uploadModalOpen,
      selectedSchedule: state.selectedSchedule,
      openUploadModal: state.openUploadModal,
      closeUploadModal: state.closeUploadModal,
    }))
  );

/**
 * Hook for statistics
 */
export const useSubmissionStatistics = () =>
  useCertificateSubmissionsStore(
    useShallow((state) => ({
      getStatistics: state.getStatistics,
    }))
  );

/**
 * Hook for file upload state management
 */
export const useFileUploadState = create<FileUploadState>()(() => ({
  selectedFile: null,
  isUploading: false,
  uploadProgress: 0,
  error: null,
}));

/**
 * Hook for managing file upload operations
 */
export const useFileUpload = () =>
  useFileUploadState(
    useShallow((state) => ({
      selectedFile: state.selectedFile,
      isUploading: state.isUploading,
      uploadProgress: state.uploadProgress,
      error: state.error,
    }))
  );