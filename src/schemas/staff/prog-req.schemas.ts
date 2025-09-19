import { z } from "zod";

export const ProgReqRecurrenceType = {
  ONCE: "once",
  ANNUAL: "annual",
} as const;

export type ProgReqRecurrenceType =
  (typeof ProgReqRecurrenceType)[keyof typeof ProgReqRecurrenceType];

const MONTH_MAX_DAYS: Record<number, number> = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

export const programRequirementFormSchema = z
  .object({
    programId: z.string().uuid({ message: "Program ID must be a valid UUID" }),
    certTypeId: z
      .string()
      .uuid({ message: "Certificate type ID must be a valid UUID" }),
    name: z
      .string()
      .min(1, { message: "Name must not be empty" })
      .max(200, { message: "Name must be at most 200 characters" }),
    targetYear: z
      .number()
      .int()
      .min(1, { message: "Target year must be at least 1" })
      .max(10, { message: "Target year must be at most 10" }),
    deadlineDay: z
      .number()
      .int()
      .min(1, { message: "Deadline day must be at least 1" })
      .max(31, { message: "Deadline day must be at most 31" }),
    deadlineMonth: z
      .number()
      .int()
      .min(1, { message: "Deadline month must be at least 1" })
      .max(12, { message: "Deadline month must be at most 12" }),
    gracePeriodDays: z.coerce
      .number()
      .int()
      .min(0, { message: "Grace period must be at least 0" })
      .max(365, { message: "Grace period must be at most 365" })
      .default(7)
      .optional(),
    notificationDaysBeforeDeadline: z.coerce
      .number()
      .int()
      .min(0, { message: "Notification days must be at least 0" })
      .max(365, { message: "Notification days must be at most 365" })
      .default(90)
      .optional(),
    isMandatory: z.boolean(),
    isActive: z.boolean(),
    specialInstruction: z.string().nullable().optional(),
    recurrenceType: z.nativeEnum(ProgReqRecurrenceType),
    effectiveFromYear: z.number().int().min(1900).max(2100),
    effectiveUntilYear: z.number().int().min(1900).max(2100),
    monthsBeforeDeadline: z
      .number()
      .int()
      .min(1, { message: "Months before deadline must be at least 1" })
      .max(6, { message: "Months before deadline must be at most 6" }),
  })
  .refine(
    (data) => {
      const maxDay = MONTH_MAX_DAYS[data.deadlineMonth];
      return data.deadlineDay <= maxDay;
    },
    {
      message: "Invalid deadline date: Day is not valid for selected month",
      path: ["deadlineDay"],
    }
  )
  .refine(
    (data) => {
      return data.effectiveFromYear <= data.effectiveUntilYear;
    },
    {
      message: "Start year cannot be later than end year",
      path: ["effectiveUntilYear"],
    }
  );
