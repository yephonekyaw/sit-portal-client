import { FileText, Upload } from "lucide-react";
import type { Certificate } from "./certificate";
import CertificateCard from "./certificate-card";

interface CertificatesGridProps {
  certificates: Certificate[];
}

export default function CertificatesGrid({
  certificates,
}: CertificatesGridProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-1">
            Your Certificates
          </h2>
          <p className="text-gray-600">
            Track and manage your verified credentials
          </p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg font-medium border border-blue-200">
          {certificates.length} certificates
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="text-center py-16 px-8">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No certificates yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Upload your first certificate to get started with our verification
              process
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200">
              <Upload className="mr-2 h-4 w-4" />
              Upload Certificate
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      )}
    </div>
  );
}
