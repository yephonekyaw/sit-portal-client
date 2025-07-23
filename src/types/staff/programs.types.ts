import type { programFormSchema } from "@/schemas/staff/programs.schemas";
import type z from "zod";

type ProgramFormSchemaType = z.infer<typeof programFormSchema>;

export type { ProgramFormSchemaType };
