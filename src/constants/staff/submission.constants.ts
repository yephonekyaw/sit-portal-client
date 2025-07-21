import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

export const SUBMISSION_STATUS_CONFIGS = {
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    iconColor: "text-yellow-600",
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    iconColor: "text-red-600",
  },
  manual_review: {
    label: "Manual Review",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: AlertTriangle,
    iconColor: "text-orange-600",
  },
};

export const STAT_CARD_COLOR_PALETTES = {
  submissions: ["bg-blue-600/70", "bg-blue-200"],
  status: [
    "bg-green-600/70",
    "bg-amber-500/70",
    "bg-red-500/70",
    "bg-purple-500/70",
  ],
  verification: ["bg-indigo-600/70", "bg-cyan-600/70"],
  timing: ["bg-emerald-600/70", "bg-orange-500/70", "bg-red-400/70"],
} as const;
