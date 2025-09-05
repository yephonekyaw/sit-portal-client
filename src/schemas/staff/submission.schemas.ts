import { z } from "zod";

// Verification History Form Schema
export const VerificationHistoryFormSchema = z.object({
  submissionId: z.string().uuid(),
  verificationType: z.enum(["manual", "agent"]),
  oldStatus: z.enum(["pending", "approved", "rejected", "manual_review"]),
  newStatus: z.enum(["pending", "approved", "rejected", "manual_review"]),
  comments: z.string().max(1000).optional().nullable(),
  reasons: z.string().max(1000).optional().nullable(),
  verifierId: z.string().optional().nullable(),
  agentAnalysisResult: z.record(z.any()).optional().nullable(),
});
