import { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Download,
  Eye,
  RefreshCw,
  Calendar,
  Award,
} from "lucide-react";

const certificates = [
  {
    id: 1,
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    uploadDate: "2024-01-15",
    status: "verified",
    verificationProgress: 100,
    expiryDate: "2027-01-15",
    credentialId: "AWS-CP-2024-001",
    category: "Cloud Computing",
    fileSize: "2.4 MB",
    fileType: "PDF",
  },
  {
    id: 2,
    name: "Google Analytics Certified",
    issuer: "Google",
    uploadDate: "2024-01-10",
    status: "pending",
    verificationProgress: 75,
    expiryDate: "2025-01-10",
    credentialId: "GA-2024-002",
    category: "Digital Marketing",
    fileSize: "1.8 MB",
    fileType: "PDF",
  },
  {
    id: 3,
    name: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    uploadDate: "2024-01-08",
    status: "rejected",
    verificationProgress: 0,
    expiryDate: "2026-01-08",
    credentialId: "AZ-900-2024-003",
    rejectionReason:
      "Certificate image quality too low. Please upload a higher resolution image.",
    category: "Cloud Computing",
    fileSize: "3.2 MB",
    fileType: "JPG",
  },
];

const StudentDashboard = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const studentName = "Alex Chen";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cloud Computing":
        return "☁️";
      case "Digital Marketing":
        return "📊";
      default:
        return "🏆";
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const formatProgress = (progress: number) => {
    if (progress === 100) return "Completed";
    if (progress >= 75) return "Almost done";
    if (progress >= 50) return "In progress";
    if (progress >= 25) return "Just started";
    return "Initializing";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Greeting Banner */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">👋</span>
                <h1 className="text-3xl font-bold">
                  Welcome back, {studentName}!
                </h1>
              </div>
              <p className="text-purple-100 text-lg mb-4 max-w-2xl">
                Ready to showcase your achievements? Upload and verify your
                certificates with our AI-powered verification system.
              </p>
              <div className="flex items-center space-x-6 text-purple-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">Fast verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="text-sm">Secure storage</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="w-28 h-28 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <FileText className="h-14 w-14 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Upload Section */}
      <div className="mb-8">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border-2 border-dashed border-purple-200 dark:border-purple-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 shadow-lg">
          <div className="p-8">
            <div
              className={`text-center rounded-2xl p-8 transition-all duration-300 ${
                dragActive
                  ? "bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 scale-[1.02]"
                  : "hover:bg-purple-25 dark:hover:bg-purple-900/10"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-purple-800/50 dark:to-fuchsia-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Upload Your Certificate
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Drag and drop your certificate files here, or click to browse.
                Our AI will verify them instantly.
              </p>

              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                <Plus className="mr-2 h-5 w-5" />
                Choose Files
              </label>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Supported formats: PDF, JPG, PNG • Max size: 10MB per file
              </p>

              {selectedFiles.length > 0 && (
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                    {selectedFiles.length} file(s) selected for upload
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Certificates Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your Certificates
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Track and manage your verified credentials
            </p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-800/50 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-2xl font-semibold shadow-sm">
            {certificates.length} certificates
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-center py-16 px-8">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No certificates yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                Upload your first certificate to get started with our
                verification process
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Upload className="mr-2 h-5 w-5" />
                Upload Certificate
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-purple-800/50 dark:to-fuchsia-800/50 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                        {getCategoryIcon(cert.category)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold border ${getStatusColor(
                        cert.status
                      )}`}
                    >
                      {getStatusIcon(cert.status)}
                      <span className="ml-1.5 capitalize">{cert.status}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-lg">
                      {cert.category}
                    </span>
                  </div>
                </div>

                {/* Progress Bar for Pending */}
                {cert.status === "pending" && (
                  <div className="px-6 pb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Verification Progress
                        </span>
                        <span className="font-semibold text-amber-600 dark:text-amber-400">
                          {formatProgress(cert.verificationProgress)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${cert.verificationProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rejection Reason */}
                {cert.status === "rejected" && cert.rejectionReason && (
                  <div className="px-6 pb-4">
                    <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-4">
                      <p className="text-sm text-rose-800 dark:text-rose-200">
                        <strong>Rejection Reason:</strong>{" "}
                        {cert.rejectionReason}
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Details */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1">
                        Uploaded
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(cert.uploadDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1">
                        Expires
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(cert.expiryDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Credential ID
                    </div>
                    <div className="font-mono text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
                      {cert.credentialId}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6">
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 px-4 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium flex items-center justify-center">
                      <Eye className="h-4 w-4 mr-1.5" />
                      View
                    </button>
                    <button className="flex-1 py-2.5 px-4 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium flex items-center justify-center">
                      <Download className="h-4 w-4 mr-1.5" />
                      Download
                    </button>
                    {cert.status === "rejected" && (
                      <button className="py-2.5 px-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white rounded-xl transition-all text-sm font-medium flex items-center justify-center">
                        <RefreshCw className="h-4 w-4 mr-1.5" />
                        Re-upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
