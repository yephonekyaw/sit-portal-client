export type GetProgramsItem = {
  id: string; // UUID as string
  programCode: string;
  programName: string;
  description: string;
  durationYears: number;
  isActive: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  activeRequirementsCount: number;
  archivedRequirementsCount: number;
};

export type ProgramResponse = Omit<
  GetProgramsItem,
  "activeRequirementsCount" | "archivedRequirementsCount"
>;
