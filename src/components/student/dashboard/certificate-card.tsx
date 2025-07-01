import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
import type { Certificate } from "./certificate";
import {
  getStatusColor,
  getCategoryIcon,
  formatProgress,
} from "./certificate-helpers";

interface CertificateCardProps {
  certificate: Certificate;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-4 w-4" />;
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "rejected":
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export default function CertificateCard({
  certificate: cert,
}: CertificateCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors duration-200 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              {getCategoryIcon(cert.category)}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                {cert.name}
              </h3>
              <p className="text-sm text-gray-600">
                {cert.issuer}
              </p>
            </div>
          </div>

          <div
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(
              cert.status
            )}`}
          >
            {getStatusIcon(cert.status)}
            <span className="ml-1.5 capitalize">{cert.status}</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100">
            {cert.category}
          </span>
        </div>
      </div>

      {/* Progress Bar for Pending */}
      {cert.status === "pending" && (
        <div className="px-6 pb-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Verification Progress
              </span>
              <span className="font-medium text-amber-600">
                {formatProgress(cert.verificationProgress)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${cert.verificationProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason */}
      {cert.status === "rejected" && cert.rejectionReason && (
        <div className="px-6 pb-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">
              <strong>Rejection Reason:</strong> {cert.rejectionReason}
            </p>
          </div>
        </div>
      )}

      {/* Card Details */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500 mb-1">
              Uploaded
            </div>
            <div className="font-medium text-gray-900 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(cert.uploadDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">Expires</div>
            <div className="font-medium text-gray-900 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(cert.expiryDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1">
            Credential ID
          </div>
          <div className="font-mono text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-lg">
            {cert.credentialId}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-6 pb-6">
        <div className="flex gap-2">
          <button className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center">
            <Eye className="h-4 w-4 mr-1.5" />
            View
          </button>
          <button className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center">
            <Download className="h-4 w-4 mr-1.5" />
            Download
          </button>
          {cert.status === "rejected" && (
            <button className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-medium flex items-center justify-center">
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Re-upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
