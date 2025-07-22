import type {
  Submission,
  UnsubmittedStudent,
  SubmissionFilters,
} from "@/types/staff/submission.types";

/**
 * Applies search filter to student data (works for both submissions and unsubmitted students)
 */
export const matchesSearchFilter = (
  searchQuery: string,
  firstName: string,
  lastName: string,
  email: string,
  rollNumber: string
): boolean => {
  const searchLower = searchQuery.toLowerCase().trim();
  if (!searchLower) return true;

  const fullName = `${firstName} ${lastName}`.toLowerCase();
  
  return (
    firstName.toLowerCase().includes(searchLower) ||
    lastName.toLowerCase().includes(searchLower) ||
    fullName.includes(searchLower) ||
    email.toLowerCase().includes(searchLower) ||
    rollNumber.toLowerCase().includes(searchLower)
  );
};

/**
 * Applies all filters to submissions data
 */
export const applySubmissionFilters = (
  submissions: Submission[],
  filters: SubmissionFilters
): Submission[] => {
  return submissions.filter((submission) => {
    const { academicYear, requirementScheduleId, status, search } = filters;

    // Academic year filter (always required)
    if (submission.requirement_schedule.academic_year.year_code !== academicYear) {
      return false;
    }

    // Requirement schedule filter
    if (requirementScheduleId && submission.requirement_schedule.id !== requirementScheduleId) {
      return false;
    }

    // Status filter
    if (status && submission.status !== status) {
      return false;
    }

    // Search filter
    if (search) {
      return matchesSearchFilter(
        search,
        submission.student.user.first_name,
        submission.student.user.last_name,
        submission.student.user.email,
        submission.student.roll_number
      );
    }

    return true;
  });
};

/**
 * Applies all filters to unsubmitted students data
 */
export const applyUnsubmittedFilters = (
  students: UnsubmittedStudent[],
  filters: SubmissionFilters
): UnsubmittedStudent[] => {
  return students.filter((student) => {
    const { academicYear, requirementScheduleId, search } = filters;

    // Academic year filter (always required)
    if (student.requirement_schedule.academic_year.year_code !== academicYear) {
      return false;
    }

    // Requirement schedule filter
    if (requirementScheduleId && student.requirement_schedule.id !== requirementScheduleId) {
      return false;
    }

    // Search filter (status filter ignored for unsubmitted students)
    if (search) {
      return matchesSearchFilter(
        search,
        student.user.first_name,
        student.user.last_name,
        student.user.email,
        student.roll_number
      );
    }

    return true;
  });
};