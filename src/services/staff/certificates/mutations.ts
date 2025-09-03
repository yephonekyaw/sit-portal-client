import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCertificate, archiveCertificate } from "./apis";
import { useNavigate } from "react-router-dom";
import type { CertificateResponse } from "./types";
import type { UpdateCertificateFormSchemaType } from "@/types/staff/certificates.types";
import { toast } from "sonner";
import type { ApiError, ApiResponse } from "@/services/api/types";
import { useCertificateStore } from "@/stores/staff/certificate.stores";

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<CertificateResponse>,
    ApiError,
    UpdateCertificateFormSchemaType
  >({
    mutationFn: updateCertificate,
    onSuccess: () => {
      toast.success("Certificate updated successfully");
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      navigate("/staff/student-management/dashboard/certificates");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update certificate"
      );
    },
  });
};

export const useArchiveCertificate = () => {
  const queryClient = useQueryClient();
  const { setArchiveConfirmModalState, setArchiveCertificateId } =
    useCertificateStore();

  return useMutation<ApiResponse<CertificateResponse>, ApiError, string>({
    mutationFn: archiveCertificate,
    onSuccess: () => {
      toast.success("Certificate archived successfully");
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      setArchiveConfirmModalState(false);
      setArchiveCertificateId(null);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to archive certificate"
      );
    },
  });
};
