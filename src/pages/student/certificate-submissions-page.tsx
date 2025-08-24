import { useCallback, useEffect, useMemo } from "react";
import PageHeader from "@/components/student/requirements/page-header";
import CertificateCard from "@/components/student/submissions/certificate-card";
import SubmissionDetailSheet from "@/components/student/submissions/submission-detail-sheet";
import { FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetStudentRequirements,
  usePostCertificate,
} from "@/services/student/requirements/queries";
import {
  useSubmissionData,
  useSubmissionFilters,
  useSubmissionModal,
} from "@/stores/student/certificate-submissions.store";
import type { StudentRequirementWithSubmission } from "@/services/student/requirements/types";

export default function CertificateSubmissionsPage() {
  const {
    data: requirementsResponse,
    isLoading,
    error,
  } = useGetStudentRequirements();
  const { mutateAsync: postCertificate } = usePostCertificate();
  const { schedules } = useSubmissionData();
  const { filters } = useSubmissionFilters();
  const { openUploadModal, selectedSchedule } = useSubmissionModal();

  const requirements = useMemo(() => {
    const originalData = requirementsResponse?.data || [];
    if (originalData.length === 0) return [];

    // Replicate the same data 6 times with different IDs and slight variations
    const replicatedData = [];
    for (let i = 0; i < 6; i++) {
      originalData.forEach((req, index) => {
        replicatedData.push({
          ...req,
          scheduleId: `${req.scheduleId}-replica-${i}-${index}`,
          requirementId: `${req.requirementId}-replica-${i}-${index}`,
          // Add some variation to the data
          requirementName:
            i === 0
              ? req.requirementName
              : i === 1
              ? `${req.requirementName} (Year 2)`
              : i === 2
              ? `${req.requirementName} (Advanced)`
              : i === 3
              ? `${req.requirementName} (Refresher)`
              : i === 4
              ? `${req.requirementName} (Supplementary)`
              : `${req.requirementName} (Final)`,
          // Vary submission status
          submissionId:
            i % 3 === 0
              ? req.submissionId
              : i % 3 === 1
              ? `sub-${i}-${index}`
              : undefined,
          submissionStatus:
            i % 4 === 0
              ? req.submissionStatus
              : i % 4 === 1
              ? "approved"
              : i % 4 === 2
              ? "pending"
              : i % 4 === 3
              ? "rejected"
              : undefined,
          // Vary AI confidence scores
          agentConfidenceScore:
            i === 0
              ? req.agentConfidenceScore
              : i === 1
              ? 0.85
              : i === 2
              ? 0.42
              : i === 3
              ? 0.91
              : i === 4
              ? 0.23
              : 0.76,
          // Vary mandatory status
          isMandatory: i % 2 === 0 ? req.isMandatory : !req.isMandatory,
          // Vary deadlines slightly
          submissionDeadline:
            i === 0
              ? req.submissionDeadline
              : i === 1
              ? "2025-12-15T23:59:59Z"
              : i === 2
              ? "2025-10-30T23:59:59Z"
              : i === 3
              ? "2024-11-30T23:59:59Z" // Overdue
              : i === 4
              ? "2025-09-15T23:59:59Z"
              : "2026-01-31T23:59:59Z",
        });
      });
    }
    return replicatedData;
  }, [requirementsResponse?.data]);

  // Convert API data to store format when data is loaded
  useEffect(() => {
    if (requirements.length > 0) {
      // Convert StudentRequirementWithSubmission[] to store format
      // This is a temporary adapter until we refactor the store
      const mockSchedules = requirements.map((req) => ({
        id: req.scheduleId,
        program_requirement: {
          id: req.requirementId,
          name: req.requirementName,
          target_year: req.targetYear,
          is_mandatory: req.isMandatory,
          special_instruction: req.specialInstruction,
          program: {
            id: req.programId,
            program_code: req.programCode,
            program_name: req.programName,
          },
          certificate_type: {
            id: req.certTypeId,
            code: req.certCode,
            name: req.certName,
          },
        },
        academic_year: {
          year_code: 2023, // Default year
        },
        submission_deadline: req.submissionDeadline,
      }));
    }
  }, [requirements, selectedSchedule]);

  const handleViewDetails = useCallback(
    (requirement: StudentRequirementWithSubmission) => {
      // Find corresponding schedule from store
      const schedule = schedules.find((s) => s.id === requirement.scheduleId);
      if (schedule) {
        openUploadModal(schedule);
      }
    },
    [openUploadModal, schedules]
  );

  const handleFileUpload = async (
    file: File,
    scheduleId: string
  ): Promise<void> => {
    try {
      const requirement = requirements.find(
        (req) => req.scheduleId === scheduleId
      );
      if (!requirement) {
        throw new Error("Requirement not found");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("student_id", "current-student-id"); // This should come from auth context
      formData.append("cert_type_id", requirement.certTypeId);
      formData.append("requirement_schedule_id", requirement.scheduleId);

      await postCertificate(formData);

      toast.success("Certificate submitted successfully!", {
        description: "Your certificate is now under review.",
      });
    } catch (error) {
      toast.error("Failed to upload certificate", {
        description: "Please try again later.",
      });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-slate-600">Loading requirements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load requirements
        </h3>
        <p className="text-gray-600">
          There was an error loading your certificate requirements. Please
          refresh the page to try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <PageHeader
        filteredCount={requirements.length}
        totalCount={requirements.length}
      />

      {/* Requirements Grid - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {requirements.length > 0 ? (
          requirements.map((requirement) => (
            <CertificateCard
              key={requirement.scheduleId}
              requirement={requirement}
              onViewDetails={handleViewDetails}
            />
          ))
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
      <SubmissionDetailSheet onSubmit={handleFileUpload} />
    </div>
  );
}
