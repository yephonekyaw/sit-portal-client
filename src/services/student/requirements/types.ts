export interface StudentRequirementWithSubmission {
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

export interface CertificateSubmissionResponse {
  id: string;
  studentId: string;
  certTypeId: string;
  requirementScheduleId: string;
  fileObjectName: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  submissionStatus: string;
  agentConfidenceScore?: number;
  submissionTiming: string;
  submittedAt: string;
}

export type SubmissionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "manual_review";
export type SubmissionTiming = "on_time" | "late" | "overdue";
