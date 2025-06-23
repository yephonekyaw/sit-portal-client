export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  uploadDate: string;
  status: "verified" | "pending" | "rejected";
  verificationProgress: number;
  expiryDate: string;
  credentialId: string;
  category: string;
  fileSize: string;
  fileType: string;
  rejectionReason?: string;
}
