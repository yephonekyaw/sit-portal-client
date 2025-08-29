type SubmissionStatus = "pending" | "approved" | "rejected" | "manual_review";

type SubmissionTiming = "on_time" | "late" | "overdue";

type VerificationType = "manual" | "agent";

interface StudentRequirementWithSubmission {
  // Schedule data
  scheduleId: string;
  submissionDeadline: string;

  // Requirement data
  requirementId: string;
  requirementName: string;
  targetYear: number;
  isMandatory: boolean;
  specialInstruction?: string;

  // Program data
  programId: string;
  programCode: string;
  programName: string;

  // Certificate type data
  certTypeId: string;
  certCode: string;
  certName: string;
  certDescription: string;

  // Submission data (null if not submitted)
  submissionId?: string;
  fileObjectName?: string;
  filename?: string;
  fileSize?: number;
  mimeType?: string;
  submissionStatus?: string;
  agentConfidenceScore?: number;
  submissionTiming?: string;
  submittedAt?: string;
  expiredAt?: string;
}

interface RequirementSubmissionRequest {
  submissionData: {
    scheduleId: string;
    requirementId: string;
    certTypeId: string;
    programId: string;
    submissionId?: string;
  };
  file: File;
}

interface VerificationHistoryResponse {
  /** Verification history ID */
  id: string;
  /** Type of verification */
  verificationType: VerificationType;
  /** Previous submission status */
  oldStatus: SubmissionStatus;
  /** New submission status */
  newStatus: SubmissionStatus;
  /** Verification comments */
  comments?: string;
  /** Verification reasons */
  reasons?: string;
  /** Agent analysis result data */
  agentAnalysisResult?: Record<string, unknown>;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt?: string;
}

interface VerificationHistoryListResponse {
  /** List of verification history records */
  verificationHistory: VerificationHistoryResponse[];
  /** Total number of verification history records */
  totalCount: number;
  /** Certificate submission ID */
  submissionId: string;
}

export type {
  VerificationType,
  SubmissionStatus,
  SubmissionTiming,
  StudentRequirementWithSubmission,
  RequirementSubmissionRequest,
  VerificationHistoryResponse,
  VerificationHistoryListResponse,
};
