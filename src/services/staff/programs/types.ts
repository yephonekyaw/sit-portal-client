export type GetProgramsItem = {
  /** Program ID */
  id: string;

  /** Program code */
  programCode: string;

  /** Program name */
  programName: string;

  /** Program description */
  description: string;

  /** Program duration in years */
  durationYears: number;

  /** Program active status */
  isActive: boolean;

  /** Program creation timestamp */
  createdAt: string;

  /** Program last update timestamp */
  updatedAt: string;

  /** Count of active requirements */
  activeRequirementsCount: number;

  /** Count of archived requirements */
  archivedRequirementsCount: number;
};

export type ProgramResponse = Omit<
  GetProgramsItem,
  "activeRequirementsCount" | "archivedRequirementsCount"
>;
