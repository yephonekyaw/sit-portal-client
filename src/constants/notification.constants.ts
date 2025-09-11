import {
  Upload,
  Edit3,
  ShieldCheck,
  ShieldX,
  HelpCircle,
  Clock,
  AlertTriangle,
  Calendar,
  FileText,
} from "lucide-react";

// Notification type codes from the backend
export const NOTIFICATION_TYPE_CODES = {
  CERTIFICATE_SUBMISSION_SUBMIT: "certificate_submission_submit",
  CERTIFICATE_SUBMISSION_UPDATE: "certificate_submission_update", 
  CERTIFICATE_SUBMISSION_DELETE: "certificate_submission_delete",
  CERTIFICATE_SUBMISSION_VERIFY: "certificate_submission_verify",
  CERTIFICATE_SUBMISSION_REJECT: "certificate_submission_reject",
  CERTIFICATE_SUBMISSION_REQUEST: "certificate_submission_request",
  PROGRAM_REQUIREMENT_SCHEDULE_REMIND: "program_requirement_schedule_remind",
  PROGRAM_REQUIREMENT_SCHEDULE_WARN: "program_requirement_schedule_warn",
  PROGRAM_REQUIREMENT_SCHEDULE_LATE: "program_requirement_schedule_late",
  PROGRAM_REQUIREMENT_SCHEDULE_OVERDUE: "program_requirement_schedule_overdue",
} as const;

// Notification priority levels
export const NOTIFICATION_PRIORITIES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM", 
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const;

// Priority colors mapping
export const PRIORITY_COLORS = {
  [NOTIFICATION_PRIORITIES.URGENT]: "bg-red-100 border-red-300 text-red-900",
  [NOTIFICATION_PRIORITIES.HIGH]: "bg-orange-100 border-orange-300 text-orange-900",
  [NOTIFICATION_PRIORITIES.MEDIUM]: "bg-yellow-100 border-yellow-300 text-yellow-900",
  [NOTIFICATION_PRIORITIES.LOW]: "bg-blue-100 border-blue-300 text-blue-900",
} as const;

// Type icons mapping
export const TYPE_ICONS = {
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_SUBMIT]: Upload,
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_UPDATE]: Edit3,
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_DELETE]: ShieldX,
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_VERIFY]: ShieldCheck,
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_REJECT]: ShieldX,
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_REQUEST]: HelpCircle,
  [NOTIFICATION_TYPE_CODES.PROGRAM_REQUIREMENT_SCHEDULE_REMIND]: Clock,
  [NOTIFICATION_TYPE_CODES.PROGRAM_REQUIREMENT_SCHEDULE_WARN]: AlertTriangle,
  [NOTIFICATION_TYPE_CODES.PROGRAM_REQUIREMENT_SCHEDULE_LATE]: AlertTriangle,
  [NOTIFICATION_TYPE_CODES.PROGRAM_REQUIREMENT_SCHEDULE_OVERDUE]: Calendar,
} as const;

// Type colors mapping
export const TYPE_COLORS = {
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_SUBMIT]: "text-blue-700 bg-blue-100",
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_UPDATE]: "text-blue-700 bg-blue-100", 
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_DELETE]: "text-red-700 bg-red-100",
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_VERIFY]: "text-green-700 bg-green-100",
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_REJECT]: "text-red-700 bg-red-100",
  [NOTIFICATION_TYPE_CODES.CERTIFICATE_SUBMISSION_REQUEST]: "text-purple-700 bg-purple-100",
  [NOTIFICATION_TYPE_CODES.PROGRAM_REQUIREMENT_SCHEDULE_REMIND]: "text-blue-700 bg-blue-100",
  [NOTIFICATION_TYPE_CODES.PROGRAM_REQUIREMENT_SCHEDULE_WARN]: "text-orange-700 bg-orange-100",
  [NOTIFICATION_TYPE_CODES.PROGRAM_REQUIREMENT_SCHEDULE_LATE]: "text-red-700 bg-red-100",
  [NOTIFICATION_TYPE_CODES.PROGRAM_REQUIREMENT_SCHEDULE_OVERDUE]: "text-red-700 bg-red-100",
} as const;

// Default fallbacks
export const DEFAULT_ICON = FileText;
export const DEFAULT_COLOR = "text-gray-700 bg-gray-100";
export const DEFAULT_PRIORITY_COLOR = "bg-gray-100 border-gray-300 text-gray-900";