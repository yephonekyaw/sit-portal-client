import { certificates } from "@/mock/certificates.mock";
import CertificateCard from "./certificate-card";

const CertificatesSection = () => {
  return (
    <div className="space-y-4">
      {certificates.map((certificate) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
};

export default CertificatesSection;
