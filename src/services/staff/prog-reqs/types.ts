import type { ProgReqRecurrenceType } from "@/schemas/staff/prog-req.schemas";

export type GetProgramRequirementsItem = {
  // Program requirement fields
  id: string; // UUID
  name: string;
  targetYear: number;
  deadlineDate: string; // ISO date string
  gracePeriodDays: number;
  notificationDaysBeforeDeadline: number;
  isMandatory: boolean;
  isActive: boolean;
  specialInstruction?: string | null;
  recurrenceType: ProgReqRecurrenceType;
  lastRecurrenceAt: string; // ISO datetime string
  effectiveFromYear: number;
  effectiveUntilYear: number;
  monthsBeforeDeadline: number;
  createdAt: string; // ISO datetime string
  updatedAt: string;

  // Program information
  programId: string; // UUID
  programCode: string;
  programName: string;

  // Certificate type information
  certTypeId: string; // UUID
  certCode: string;
  certName: string;

  // Schedule statistics
  schedulesCount: number;
  latestScheduleDeadline?: string | null; // ISO datetime string
};

export type ProgramRequirementResponse = {
  id: string; // UUID
  programId: string; // UUID
  certTypeId: string; // UUID
  name: string;
  targetYear: number;
  deadlineDate: string; // ISO date string
  gracePeriodDays: number;
  notificationDaysBeforeDeadline: number;
  isMandatory: boolean;
  isActive: boolean;
  specialInstruction?: string | null;
  recurrenceType: ProgReqRecurrenceType;
  effectiveFromYear: number;
  effectiveUntilYear: number;
  monthsBeforeDeadline: number;
  createdAt: string; // ISO datetime string
  updatedAt?: string | null;
};
