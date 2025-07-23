import type { programRequirementFormSchema } from "@/schemas/staff/prog-reqs.schemas";
import type z from "zod";

type ProgramRequirementFormSchemaType = z.infer<
  typeof programRequirementFormSchema
>;

export type { ProgramRequirementFormSchemaType };
