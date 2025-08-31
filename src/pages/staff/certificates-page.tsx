import CertificateCard from "@/components/staff/certificates/certificate-card";
import { useGetCertificates } from "@/services/staff/certificates/queries";
import { ShieldCheck } from "lucide-react";
import DefaultLoader from "@/components/ui/default-loader";
import CertificateArchiveModal from "@/components/staff/certificates/certificate-archive-modal";

const CertificatesPage = () => {
  const { data: certificates, isLoading, error } = useGetCertificates();

  if (isLoading) {
    return <DefaultLoader label="Loading certificates..." />;
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load certificates
        </h3>
        <p className="text-gray-600">
          There was an error loading the certificate types. Please refresh the
          page to try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {certificates?.data?.length ? (
          certificates.data.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-gray-600">No certificates found.</p>
          </div>
        )}
      </div>
      <CertificateArchiveModal />
    </>
  );
};

export default CertificatesPage;
