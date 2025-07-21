export const verificationHistories = [
  {
    id: "23d14170-56ec-48c7-87b9-d62b5ec21eb2",
    submission_id: "781e4d96-5f74-4d0a-9265-dc917402fc78",
    verifier_id: "92baa219-ceee-4e90-9ed9-c66117bdab2e",
    verification_type: "manual",
    old_status: "pending",
    new_status: "manual_review",
    comments: "Admin approved upon re-evaluation",
    reasons: "Mismatch in program details",
    created_at: "2024-07-11T17:19:00",
  },
  {
    id: "d7a3ea62-f03f-4e3e-8da8-06ebe50ba8f5",
    submission_id: "e292356d-c400-49d6-85e1-79d8ca92be82",
    verifier_id: "348f13f6-f403-4a40-a1c8-36588d960cdd",
    verification_type: "agent",
    old_status: "approved",
    new_status: "rejected",
    comments: "Missing expiry date, flagged for manual review",
    reasons: "Mismatch in program details",
    created_at: "2024-07-12T00:14:00",
  },
  {
    id: "195d6a09-f90c-4e17-b06b-a011af4e5dbe",
    submission_id: "1ae5f926-d3e7-4017-b3bb-23035fbf1f1a",
    verifier_id: "d9869a6b-6ca3-4627-8966-049f8ab14827",
    verification_type: "agent",
    old_status: "rejected",
    new_status: "pending",
    comments: "Missing expiry date, flagged for manual review",
    reasons: "Mismatch in program details",
    created_at: "2024-07-18T04:06:00",
  },
];

export type VerificationHistory = (typeof verificationHistories)[number];
