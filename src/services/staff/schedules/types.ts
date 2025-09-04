export type GetSchedulesItem = {
  // Schedule core fields
  id: string; // UUID as string
  programRequirementId: string; // UUID as string
  submissionDeadline: string; // ISO timestamp
  gracePeriodDeadline: string; // ISO timestamp
  startNotifyAt: string; // ISO timestamp
  lastNotifiedAt: string | null; // ISO timestamp or null
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp

  // Program information
  programId: string; // UUID as string
  programCode: string;
  programName: string;

  // Certificate type information
  certId: string; // UUID as string
  certCode: string;
  certName: string;

  // Academic year information
  academicYearId: string; // UUID as string
  academicYear: number;

  // Program requirement information
  requirementName: string;
  targetYear: number;
  isMandatory: boolean;

  // Dashboard statistics (optional)
  totalSubmissionsRequired: number | null;
  submittedCount: number | null;
  approvedCount: number | null;
  rejectedCount: number | null;
  pendingCount: number | null;
  manualReviewCount: number | null;
  notSubmittedCount: number | null;
  onTimeSubmissions: number | null;
  lateSubmissions: number | null;
  overdueCount: number | null;
};

export type ScheduleResponse = {
  id: string; // UUID as string
  programRequirementId: string; // UUID as string
  academicYearId: string; // UUID as string
  submissionDeadline: string; // ISO timestamp
  gracePeriodDeadline: string; // ISO timestamp
  startNotifyAt: string; // ISO timestamp
  lastNotifiedAt: string | null; // ISO timestamp or null
  createdAt: string; // ISO timestamp
  updatedAt: string | null; // ISO timestamp or null
};
