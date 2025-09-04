export type GetAcademicYearsItem = {
  id: string; // UUID as string
  yearCode: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  isCurrent: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
};
