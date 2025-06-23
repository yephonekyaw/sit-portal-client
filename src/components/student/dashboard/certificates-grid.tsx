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
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-1">
            Your Certificates
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Track and manage your verified credentials
          </p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 px-3 py-1.5 rounded-lg font-medium border border-purple-200 dark:border-purple-800">
          {certificates.length} certificates
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="text-center py-16 px-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No certificates yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Upload your first certificate to get started with our verification
              process
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors duration-200">
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
