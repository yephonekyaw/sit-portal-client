import type { LucideIcon } from "lucide-react";

// Core entity types based on database schema
interface AcademicYear {
  id: string;
  year_code: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  created_at: string;
  updated_at?: string;
}

interface Program {
  id: string;
  program_code: string;
  program_name: string;
  description: string;
  duration_years: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

interface CertificateType {
  id: string;
  code: string;
  name: string;
  description: string;
  verification_template: string;
  has_expiration: boolean;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

interface ProgramRequirement {
  id: string;
  program_id: string;
  cert_type_id: string;
  name: string;
  target_year: number;
  deadline_month: number;
  deadline_day: number;
  is_mandatory: boolean;
  special_instruction?: string;
  is_active: boolean;
  recurrence_type: "ONCE" | "ANNUAL";
  last_recurred_at: string;
  created_at: string;
  updated_at?: string;
  program: Program;
  certificate_type: CertificateType;
}

interface ProgramRequirementSchedule {
  id: string;
  program_requirement_id: string;
  academic_year_id: string;
  submission_deadline: string;
  created_at: string;
  updated_at?: string;
  program_requirement: ProgramRequirement;
  academic_year: AcademicYear;
}

interface VerificationHistory {
  id: string;
  submission_id: string;
  verifier_id?: string;
  verification_type: "MANUAL" | "AGENT";
  old_status: "PENDING" | "APPROVED" | "REJECTED" | "MANUAL_REVIEW";
  new_status: "PENDING" | "APPROVED" | "REJECTED" | "MANUAL_REVIEW";
  comments?: string;
  reasons?: string;
  agent_analysis_result?: Record<string, unknown>;
  created_at: string;
  updated_at?: string;
}

interface CertificateSubmission {
  id: string;
  student_id: string;
  cert_type_id: string;
  requirement_schedule_id?: string;
  file_name: string;
  file_key: string;
  file_size: number;
  mime_type: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "MANUAL_REVIEW";
  agent_confidence_score?: number;
  submitted_at: string;
  updated_at?: string;
  expired_at?: string;
  verification_history?: VerificationHistory[];
}

// Component props types
interface StudentVerificationHistoryProps {
  verificationHistories: VerificationHistory[];
}

interface CertificateSubmissionCardProps {
  schedule: ProgramRequirementSchedule;
  submission?: CertificateSubmission;
  onSubmit: (scheduleId: string) => void;
}

interface CertificateUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule?: ProgramRequirementSchedule;
  onSubmit: (file: File, scheduleId: string) => Promise<void>;
}

// Status types
type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED" | "MANUAL_REVIEW";
type DeadlineStatus = "completed" | "overdue" | "upcoming" | "pending";

// Filter and pagination types
interface SubmissionFilters {
  search: string;
  status: "all" | "completed" | "pending" | "rejected" | "not-submitted" | "overdue";
  academic_year?: string;
  program?: string;
  certificate_type?: string;
}

interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Statistics types
interface SubmissionStats {
  total: number;
  completed: number;
  pending: number;
  rejected: number;
  not_submitted: number;
  overdue: number;
  on_time: number;
  late: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  description?: string;
}

// Store state types
interface StudentSubmissionStoreState {
  // Data
  schedules: ProgramRequirementSchedule[];
  submissions: CertificateSubmission[];
  filteredSchedules: ProgramRequirementSchedule[];
  
  // UI state
  filters: SubmissionFilters;
  pagination: PaginationState;
  isLoading: boolean;
  error: string | null;
  
  // Modal state
  uploadModalOpen: boolean;
  selectedSchedule: ProgramRequirementSchedule | null;
  
  // Actions
  setSchedules: (schedules: ProgramRequirementSchedule[]) => void;
  setSubmissions: (submissions: CertificateSubmission[]) => void;
  setFilters: (filters: Partial<SubmissionFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  openUploadModal: (schedule: ProgramRequirementSchedule) => void;
  closeUploadModal: () => void;
  clearFilters: () => void;
  
  // Helper methods
  getSubmissionForSchedule: (scheduleId: string) => CertificateSubmission | undefined;
  getStatistics: () => SubmissionStats;
  refreshData: () => Promise<void>;
}

// File upload types
interface FileUploadState {
  selectedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
}

interface SupportedFileType {
  extension: string;
  mimeType: string;
  description: string;
}

// API response types
interface SubmissionResponse {
  success: boolean;
  message: string;
  submission?: CertificateSubmission;
  errors?: string[];
}

interface SchedulesResponse {
  success: boolean;
  data: ProgramRequirementSchedule[];
  total: number;
  page: number;
  pageSize: number;
}

interface SubmissionsResponse {
  success: boolean;
  data: CertificateSubmission[];
  total: number;
  page: number;
  pageSize: number;
}

export type {
  // Core entities
  AcademicYear,
  Program,
  CertificateType,
  ProgramRequirement,
  ProgramRequirementSchedule,
  VerificationHistory,
  CertificateSubmission,
  
  // Component props
  StudentVerificationHistoryProps,
  CertificateSubmissionCardProps,
  CertificateUploadModalProps,
  
  // Status and utility types
  SubmissionStatus,
  DeadlineStatus,
  
  // Filter and pagination
  SubmissionFilters,
  PaginationState,
  
  // Statistics
  SubmissionStats,
  StatCardProps,
  
  // Store state
  StudentSubmissionStoreState,
  
  // File upload
  FileUploadState,
  SupportedFileType,
  
  // API responses
  SubmissionResponse,
  SchedulesResponse,
  SubmissionsResponse,
};