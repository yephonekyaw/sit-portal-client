import { useCallback } from "react";
import PageHeader from "@/components/student/submissions/page-header";
import SubmittedCertificateCard from "@/components/student/submissions/submitted-certificate-card";
import UnsubmittedCertificateCard from "@/components/student/submissions/unsubmitted-certificate-card";
import SubmissionDetailSheet from "@/components/student/submissions/submission-detail-sheet";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import {
  useSubmissionData,
  useSubmissionFilters,
  useSubmissionModal,
} from "@/stores/student/certificate-submissions.store";
import type { ProgramRequirementSchedule } from "@/types/student/submission.types";

export default function CertificateSubmissionsPage() {
  const { 
    filteredSchedules, 
    schedules, 
    getSubmissionForSchedule
  } = useSubmissionData();
  const { filters } = useSubmissionFilters();
  const { openUploadModal } = useSubmissionModal();

  const handleViewDetails = useCallback((schedule: ProgramRequirementSchedule) => {
    openUploadModal(schedule);
  }, [openUploadModal]);


  const handleFileUpload = async (file: File, scheduleId: string): Promise<void> => {
    // Simulate API call
    console.log(`Uploading ${file.name} for schedule ${scheduleId}`);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 90% success rate
          toast.success("Certificate submitted successfully!", {
            description: "Your certificate is now under review.",
          });
          resolve(undefined);
        } else {
          reject(new Error("Failed to upload certificate. Please try again."));
        }
      }, 2000);
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <PageHeader
        filteredCount={filteredSchedules.length}
        totalCount={schedules.length}
      />

      {/* Schedules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => {
            const submission = getSubmissionForSchedule(schedule.id);
            
            return submission ? (
              <SubmittedCertificateCard
                key={schedule.id}
                schedule={schedule}
                submission={submission}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <UnsubmittedCertificateCard
                key={schedule.id}
                schedule={schedule}
                onViewDetails={handleViewDetails}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No requirements found
            </h3>
            <p className="text-gray-600">
              {filters.search || filters.status !== "all"
                ? "Try adjusting your search or filters"
                : "No certificate requirements assigned to you yet"}
            </p>
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <SubmissionDetailSheet
        onSubmit={handleFileUpload}
      />
    </div>
  );
}
