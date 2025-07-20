import CertificateCard from "@/components/staff/certificates/certificate-card";
import { certificates } from "@/mock/certificates.mock";

const CertificatesPage = () => {
  return (
    <div className="space-y-4">
      {certificates.map((certificate) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
};

export default CertificatesPage;
