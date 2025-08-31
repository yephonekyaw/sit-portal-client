import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { CertificateResponse, GetCertificatesItem } from "./types";
import type { UpdateCertificateFormSchemaType } from "@/types/staff/certificates.types";

export const getCertificates = async () =>
  axiosClient
    .get<ApiResponse<GetCertificatesItem[]>>("/staff/certificates")
    .then((res) => res.data);

export const updateCertificate = async (
  data: UpdateCertificateFormSchemaType
) =>
  axiosClient
    .put<ApiResponse<CertificateResponse>>(
      `/staff/certificates/${data.id}`,
      data
    )
    .then((res) => res.data);

export const archiveCertificate = async (id: string) =>
  axiosClient
    .patch<ApiResponse<CertificateResponse>>(
      `/staff/certificates/${id}/archive`
    )
    .then((res) => res.data);
