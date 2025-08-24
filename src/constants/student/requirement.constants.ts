export const SUPPORTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const SUPPORTED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.webp";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const SUBMISSION_FILTER_OPTIONS = [
  { value: "all", label: "All Requirements" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Bot Reviewing" },
  { value: "rejected", label: "Rejected" },
  { value: "manual_review", label: "Staff Reviewing" },
  { value: "overdue", label: "Overdue" },
  { value: "late", label: "Late" },
  { value: "on_time", label: "On Time" },
  { value: "not_submitted", label: "Not Submitted" },
] as const;

export const UPLOAD_GUIDELINES = [
  "Ensure the certificate is clearly visible and readable",
  "File should be in PDF format or high-quality image (JPG, PNG, WebP)",
  "Maximum file size is 10MB",
  "Make sure all text and details are legible",
  "Certificate should show your full name as registered in university",
  "Include completion date and issuing organization details",
] as const;

// Status badge configurations for requirements
export const REQUIREMENT_STATUS_BADGES = {
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 border-red-200",
  },
  manual_review: {
    label: "Under Review",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  overdue: {
    label: "Overdue",
    className: "bg-red-100 text-red-700 border-red-200",
  },
  not_submitted: {
    label: "Not Submitted",
    className: "bg-orange-100 text-orange-800 border-orange-300",
  },
  late_submission: {
    label: "Late Submission",
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },
} as const;

// Text truncation default length
export const DEFAULT_TEXT_TRUNCATE_LENGTH = 200;

export default {
  SUPPORTED_FILE_TYPES,
  SUPPORTED_FILE_EXTENSIONS,
  MAX_FILE_SIZE,
  SUBMISSION_FILTER_OPTIONS,
  UPLOAD_GUIDELINES,
  REQUIREMENT_STATUS_BADGES,
  DEFAULT_TEXT_TRUNCATE_LENGTH,
};
