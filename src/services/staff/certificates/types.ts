export interface GetCertificatesItem {
  id: string; // UUID as string
  certCode: string;
  certName: string;
  description: string;
  verificationTemplate: string;
  hasExpiration: boolean;
  isActive: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp

  activeRequirementsCount: number;
  archivedRequirementsCount: number;
  totalSubmissionsCount: number;
}

export type CertificateResponse = Omit<
  GetCertificatesItem,
  | "activeRequirementsCount"
  | "archivedRequirementsCount"
  | "totalSubmissionsCount"
>;
