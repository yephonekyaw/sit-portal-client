import { memo } from "react";
import { useParams } from "react-router-dom";
import CertificateForm from "@/components/staff/certificates/certificate-form";

const CertificateFormPage = () => {
  const { certificateId } = useParams();
  const isEdit = !!certificateId;

  return <CertificateForm isEdit={isEdit} certificateId={certificateId} />;
};

export default memo(CertificateFormPage);