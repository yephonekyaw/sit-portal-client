import type { CertificateStoreState } from "@/types/staff/certificate.types";
import { create } from "zustand";

export const useCertificateStore = create<CertificateStoreState>((set) => ({
  selectedCertificate: null,
  archiveConfirmModalState: false,
  archiveCertificateId: null,

  setSelectedCertificate: (certificate) =>
    set({ selectedCertificate: certificate }),
  clearSelectedCertificate: () => set({ selectedCertificate: null }),
  setArchiveConfirmModalState: (state) =>
    set({ archiveConfirmModalState: state }),
  setArchiveCertificateId: (id) => set({ archiveCertificateId: id }),
  clearCertificateStore: () =>
    set({
      selectedCertificate: null,
      archiveConfirmModalState: false,
      archiveCertificateId: null,
    }),
}));
