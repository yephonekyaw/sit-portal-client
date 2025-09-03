import type { CertificateStoreState } from "@/types/staff/certificates.types";
import { create } from "zustand";

export const useCertificateStore = create<CertificateStoreState>((set) => ({
  selectedCertificate: null,
  setSelectedCertificate: (certificate) =>
    set({ selectedCertificate: certificate }),
  clearSelectedCertificate: () => set({ selectedCertificate: null }),

  archiveConfirmModalState: false,
  setArchiveConfirmModalState: (state) =>
    set({ archiveConfirmModalState: state }),

  archiveCertificateId: null,
  setArchiveCertificateId: (id) => set({ archiveCertificateId: id }),
}));
