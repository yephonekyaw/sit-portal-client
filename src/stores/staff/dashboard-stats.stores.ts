import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { subscribeWithSelector } from "zustand/middleware";
import { submissions } from "@/mock/submissions.mock";
import type { DashboardStatsStoreState, DashboardStats, Submission } from "@/types/staff/submission.types";

// Helper function to compute stats from submissions
const computeStats = (
  submissions: Submission[],
  academicYear: string,
  requirementScheduleId?: string
): DashboardStats => {
  // Filter submissions based on academic year and requirement schedule only
  const filteredSubmissions = submissions.filter((submission) => {
    // Academic year filter (always required)
    if (submission.requirement_schedule.academic_year.year_code !== academicYear) {
      return false;
    }

    // Requirement schedule ID filter (if specified)
    if (requirementScheduleId && submission.requirement_schedule.id !== requirementScheduleId) {
      return false;
    }

    return true;
  });

  // Count by status
  const approvedCount = filteredSubmissions.filter(s => s.status === 'approved').length;
  const pendingCount = filteredSubmissions.filter(s => s.status === 'pending').length;
  const rejectedCount = filteredSubmissions.filter(s => s.status === 'rejected').length;
  const manualReviewCount = filteredSubmissions.filter(s => s.status === 'manual_review').length;

  const submittedCount = filteredSubmissions.length;
  
  // For total required, we could derive this from unique students in the academic year/schedule
  // For now, using a reasonable estimate based on submitted count
  const estimatedTotalRequired = Math.max(submittedCount + 20, 100);
  const notSubmittedCount = Math.max(0, estimatedTotalRequired - submittedCount);

  // For verification method, we'd ideally have this data in the submission model
  // Using reasonable distribution for now
  const manualVerificationCount = Math.floor(approvedCount * 0.4);
  const agentVerificationCount = approvedCount - manualVerificationCount;

  // For timing analysis, we'd need to compare submission date with deadline
  // Using reasonable distribution for now
  const onTimeSubmissions = Math.floor(submittedCount * 0.75);
  const lateSubmissions = Math.floor(submittedCount * 0.20);
  const overdueCount = submittedCount - onTimeSubmissions - lateSubmissions;

  return {
    total_submissions_required: estimatedTotalRequired,
    submitted_count: submittedCount,
    not_submitted_count: notSubmittedCount,
    approved_count: approvedCount,
    pending_count: pendingCount,
    rejected_count: rejectedCount,
    manual_review_count: manualReviewCount,
    manual_verification_count: manualVerificationCount,
    agent_verification_count: agentVerificationCount,
    on_time_submissions: onTimeSubmissions,
    late_submissions: lateSubmissions,
    overdue_count: overdueCount,
  };
};

const getCurrentYear = () => new Date().getFullYear().toString();

export const useDashboardStatsStore = create<DashboardStatsStoreState>()(
  subscribeWithSelector((set, get) => ({
    // Current filters for stats computation
    academicYear: getCurrentYear(),
    requirementScheduleId: undefined,

    // Computed stats
    stats: computeStats(submissions, getCurrentYear(), undefined),
    
    isLoading: false,
    error: null,

    // Actions
    setAcademicYear: (year: string) => {
      set({ academicYear: year });
    },

    setRequirementScheduleId: (id: string | undefined) => {
      set({ requirementScheduleId: id });
    },

    updateFilters: (academicYear: string, requirementScheduleId?: string) => {
      set({ academicYear, requirementScheduleId });
    },

    // Internal helper to recompute stats
    _recomputeStats: () => {
      const state = get();
      try {
        const newStats = computeStats(
          submissions,
          state.academicYear,
          state.requirementScheduleId
        );
        set({ stats: newStats, error: null });
      } catch (error) {
        set({ error: error instanceof Error ? error.message : "Failed to compute stats" });
      }
    },
  }))
);

// Subscribe to filter changes to recompute stats
useDashboardStatsStore.subscribe(
  (state) => ({
    academicYear: state.academicYear,
    requirementScheduleId: state.requirementScheduleId,
  }),
  () => {
    useDashboardStatsStore.getState()._recomputeStats();
  },
  {
    equalityFn: (a, b) => 
      a.academicYear === b.academicYear && 
      a.requirementScheduleId === b.requirementScheduleId,
  }
);

// Selector hooks for components
export const useDashboardStats = () =>
  useDashboardStatsStore(
    useShallow((state) => ({
      stats: state.stats,
      isLoading: state.isLoading,
      error: state.error,
    }))
  );

export const useDashboardStatsFilters = () =>
  useDashboardStatsStore(
    useShallow((state) => ({
      academicYear: state.academicYear,
      requirementScheduleId: state.requirementScheduleId,
      setAcademicYear: state.setAcademicYear,
      setRequirementScheduleId: state.setRequirementScheduleId,
      updateFilters: state.updateFilters,
    }))
  );