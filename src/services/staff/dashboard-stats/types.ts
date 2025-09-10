// Dashboard Stats Response Type
export type DashboardStatsResponse = {
  id: string;
  requirementScheduleId: string;
  programId: string;
  academicYearId: string;
  certTypeId: string;
  totalSubmissionsRequired: number;
  submittedCount: number;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  manualReviewCount: number;
  notSubmittedCount: number;
  onTimeSubmissions: number;
  lateSubmissions: number;
  overdueCount: number;
  manualVerificationCount: number;
  agentVerificationCount: number;
  lastCalculatedAt: string; // ISO datetime string
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
};