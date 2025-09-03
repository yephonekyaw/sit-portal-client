import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CertificateForm from "@/components/staff/certificates/certificate-form";
import { useGetCertificates } from "@/services/staff/certificates/queries";
import { useCertificateStore } from "@/stores/staff/certificate.stores";
import { toast } from "sonner";
import DefaultLoader from "@/components/ui/default-loader";

const CertificateFormPage = () => {
  const { certificateId } = useParams();
  const isEdit = !!certificateId;
  const {
    data: certificates,
    isLoading,
    isError,
    isSuccess,
  } = useGetCertificates();
  const { setSelectedCertificate } = useCertificateStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load certificate data");
      navigate("/staff/student-management/dashboard/certificates");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (!isEdit || !isSuccess) {
      navigate("/staff/student-management/dashboard/certificates");
      return;
    }
    const certificate = certificates?.data?.find((c) => c.id === certificateId);

    if (!certificate) {
      toast.error("Certificate ID not found to edit");
      navigate("/staff/student-management/dashboard/certificates");
      return;
    }

    setSelectedCertificate(certificate);
  }, [
    isEdit,
    isSuccess,
    certificateId,
    certificates,
    navigate,
    setSelectedCertificate,
  ]);

  if (isLoading) {
    return <DefaultLoader label="Loading certificate data..." />;
  }
  return <CertificateForm isEdit={isEdit} certificateId={certificateId} />;
};

export default CertificateFormPage;
