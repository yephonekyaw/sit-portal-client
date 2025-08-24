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
  scheduleId: string;
  requirementId: string;
  certTypeId: string;
  programId: string;
  submissionId?: string;
  file: File;
}

interface RequirementSubmissionResponse {
  submissionId: string;
}

type SubmissionStatus = "pending" | "approved" | "rejected" | "manual_review";

type SubmissionTiming = "on_time" | "late" | "overdue";

export type {
  StudentRequirementWithSubmission,
  RequirementSubmissionRequest,
  RequirementSubmissionResponse,
  SubmissionStatus,
  SubmissionTiming,
};
