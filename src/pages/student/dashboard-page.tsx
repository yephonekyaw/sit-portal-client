import { lazy, Suspense } from "react";
import { certificates } from "@/components/student/dashboard/mock-certificates";

// Lazy load components with React.lazy
const WelcomeBanner = lazy(
  () => import("@/components/student/dashboard/welcome-banner")
);
const FileUpload = lazy(
  () => import("@/components/student/dashboard/file-upload")
);
const CertificatesGrid = lazy(
  () => import("@/components/student/dashboard/certificates-grid")
);

// Loading components
const WelcomeBannerSkeleton = () => (
  <div className="h-32 bg-gray-100 rounded-2xl animate-pulse mb-8" />
);

const FileUploadSkeleton = () => (
  <div className="h-64 bg-gray-100 rounded-2xl animate-pulse mb-8" />
);

const CertificatesGridSkeleton = () => (
  <div className="space-y-4">
    <div className="h-8 bg-gray-100 rounded animate-pulse mb-6" />
    <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
    <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
    <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
  </div>
);

export default function StudentDashboard() {
  const studentName = "Alex Chen";

  const handleFilesSelected = (files: File[]) => {
    console.log("Files selected:", files);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<WelcomeBannerSkeleton />}>
          <WelcomeBanner studentName={studentName} />
        </Suspense>

        <Suspense fallback={<FileUploadSkeleton />}>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </Suspense>

        <Suspense fallback={<CertificatesGridSkeleton />}>
          <CertificatesGrid certificates={certificates} />
        </Suspense>
      </div>
    </div>
  );
}
