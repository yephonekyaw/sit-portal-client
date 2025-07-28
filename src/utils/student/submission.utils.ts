import {
  URGENT_DEADLINE_DAYS,
  type DEADLINE_STATUS_CONFIGS,
} from "@/constants/student/submission.constants";

// Deadline calculation helpers
export const calculateDaysUntilDeadline = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getDeadlineStatus = (
  deadline: string,
  hasApprovedSubmission: boolean = false
): keyof typeof DEADLINE_STATUS_CONFIGS => {
  if (hasApprovedSubmission) {
    return "completed";
  }

  const daysUntil = calculateDaysUntilDeadline(deadline);

  if (daysUntil < 0) {
    return "overdue";
  }

  if (daysUntil <= URGENT_DEADLINE_DAYS) {
    return "urgent";
  }

  if (daysUntil > URGENT_DEADLINE_DAYS) {
    return "upcoming";
  }

  return "pending";
};
