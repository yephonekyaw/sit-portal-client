import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import StudentVerificationHistory from "./verification-history";
import SubmissionOverview from "./submission-overview";
import FileUploadSection from "./file-upload-section";
import {
  useSubmissionModal,
  useSubmissionData,
} from "@/stores/student/certificate-submissions.store";

interface SubmissionDetailSheetProps {
  onSubmit?: (file: File, scheduleId: string) => Promise<void>;
}

const SubmissionDetailSheet = ({ onSubmit }: SubmissionDetailSheetProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const { uploadModalOpen, selectedSchedule, closeUploadModal } =
    useSubmissionModal();
  const { getSubmissionForSchedule } = useSubmissionData();

  if (!selectedSchedule) {
    return null;
  }

  const submission = getSubmissionForSchedule(selectedSchedule.id);

  return (
    <Sheet open={uploadModalOpen} onOpenChange={closeUploadModal}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto px-6 pb-4">
        <SheetHeader className="px-0">
          <SheetTitle className="text-xl">
            {selectedSchedule.program_requirement.name}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="details" className="shadow-none outline-none">
                Details
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="shadow-none outline-none"
                disabled={!submission}
              >
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <SubmissionOverview
                schedule={selectedSchedule}
                submission={submission}
              />

              {!submission && (
                // Show upload section if not submitted
                <FileUploadSection
                  schedule={selectedSchedule}
                  onSubmit={onSubmit}
                  onClose={closeUploadModal}
                />
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {submission?.verification_history ? (
                <StudentVerificationHistory
                  verificationHistories={submission.verification_history}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No verification history available.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SubmissionDetailSheet;
