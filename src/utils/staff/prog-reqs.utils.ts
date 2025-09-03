/**
 * Utility functions for program requirements
 */

import type { GetProgramsItem } from "@/services/staff/programs/types";

/**
 * Get the number of days in a specific month and year
 */
export const getDaysInMonth = (
  month: number,
  year: number = new Date().getFullYear()
): number[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

/**
 * Generate year options for effective years (current year - 5 to current year + 20)
 */
export const getYearOptions = (
  currentYear: number = new Date().getFullYear()
): number[] => {
  const years: number[] = [];
  for (let year = currentYear - 5; year <= currentYear + 20; year++) {
    years.push(year);
  }
  return years;
};

/**
 * Get the maximum target year based on selected program duration
 */
export const getMaxTargetYear = (
  programs: GetProgramsItem[],
  programId: string
): number => {
  const selectedProgram = programs?.find((p) => p.id === programId);
  return selectedProgram?.durationYears || 10;
};

/**
 * Month options for deadline configuration
 */
export const MONTH_OPTIONS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
