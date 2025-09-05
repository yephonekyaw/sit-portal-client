import { z } from "zod";

export const certificateFormSchema = z.object({
  certCode: z
    .string()
    .min(2, { message: "Certificate code must be at least 2 characters long" })
    .max(100, {
      message: "Certificate code must be at most 100 characters long",
    }),
  certName: z
    .string()
    .min(2, { message: "Certificate name must be at least 2 characters long" })
    .max(100, {
      message: "Certificate name must be at most 100 characters long",
    }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),
  verificationTemplate: z
    .string()
    .min(100, {
      message: "Verification template must be at least 100 characters long",
    })
    .max(100000, {
      message: "Verification template must be at most 100000 characters long",
    }),
  hasExpiration: z.boolean({
    required_error: "Please specify if the certificate has expiration",
  }),
});
