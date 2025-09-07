export type SubmissionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "manual_review";

export type SubmissionTiming = "on_time" | "late" | "overdue";

export type VerificationType = "manual" | "agent";

export type EnrollmentStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "graduated";

// Student Submission Item Type
export type StudentSubmissionItem = {
  // Student data
  id: string;
  studentId: string;
  studentRollNumber: string;
  studentName: string;
  studentEmail: string;
  studentEnrollmentStatus: EnrollmentStatus;

  // Submission data (optional if not submitted)
  submissionId?: string | null;
  fileObjectName?: string | null;
  filename?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
  submissionStatus?: string | null;
  agentConfidenceScore?: number | null;
  submissionTiming?: string | null;
  submittedAt?: string | null; // ISO format
  expiredAt?: string | null; // ISO format
};

// Submission Related Data Type
export type SubmissionRelatedData = {
  // Schedule data
  scheduleId: string;
  submissionDeadline: string; // ISO format

  // Requirement data
  requirementId: string;
  requirementName: string;
  targetYear: number;
  isMandatory: boolean;
  specialInstruction?: string | null;

  // Program data
  programId: string;
  programCode: string;
  programName: string;

  // Certificate type data
  certTypeId: string;
  certCode: string;
  certName: string;
  certDescription: string;
};

// Get List of Submissions Type
export type GetListOfSubmissions = {
  submittedSubmissions: StudentSubmissionItem[];
  unsubmittedSubmissions: StudentSubmissionItem[];
  submissionRelatedData: SubmissionRelatedData;
};

// Verification History Response Type
export type VerificationHistoryResponse = {
  id: string;
  verificationType: VerificationType;
  oldStatus: SubmissionStatus;
  newStatus: SubmissionStatus;
  comments?: string | null;
  reasons?: string | null;
  agentAnalysisResult?: Record<string, unknown> | null;
  createdAt: string; // ISO datetime string
  updatedAt?: string | null; // ISO datetime string
};

// Verification History List Response Type
export type VerificationHistoryListResponse = {
  verificationHistory: VerificationHistoryResponse[];
  totalCount: number;
  submissionId: string;
};
