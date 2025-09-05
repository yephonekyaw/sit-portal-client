import { z } from "zod";
import type { VerificationHistoryFormSchema } from "@/schemas/staff/submission.schemas";

export type VerificationHistoryFormSchemaType = z.infer<
  typeof VerificationHistoryFormSchema
>;
