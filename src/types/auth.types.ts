import { z } from "zod";
import { loginSchema } from "@/schemas/auth.schemas";

export type LoginFormData = z.infer<typeof loginSchema>;