import type { z } from "zod";
import type { certificateFormSchema } from "@/schemas/staff/certificate.schemas";
import type { GetCertificatesItem } from "@/services/staff/certificates/types";

type CertificateFormSchemaType = z.infer<typeof certificateFormSchema>;

type UpdateCertificateFormSchemaType = CertificateFormSchemaType & {
  id: string;
};

interface CertificateStoreState {
  selectedCertificate: GetCertificatesItem | null;
  setSelectedCertificate: (certificate: GetCertificatesItem | null) => void;
  clearSelectedCertificate: () => void;

  archiveConfirmModalState: boolean;
  setArchiveConfirmModalState: (state: boolean) => void;

  archiveCertificateId: string | null;
  setArchiveCertificateId: (id: string | null) => void;
}

interface CertificateFormProps {
  isEdit: boolean;
  certificateId?: string;
}

export type {
  CertificateFormSchemaType,
  CertificateStoreState,
  CertificateFormProps,
  UpdateCertificateFormSchemaType,
};
