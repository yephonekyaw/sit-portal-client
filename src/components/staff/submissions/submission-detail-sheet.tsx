import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubmissionStore } from "@/stores/staff/submission.stores";
import { MessageSquare, Info } from "lucide-react";
import StaffSubmissionOverview from "./staff-submission-overview";
import StaffSubmissionVerificationHistory from "./verification-history";

const SubmissionDetailSheet = () => {
  const { detailSheetState, selectedSubmission, closeDetailSheet } =
    useSubmissionStore();

  if (!selectedSubmission) return null;

  return (
    <Sheet open={detailSheetState} onOpenChange={closeDetailSheet}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto px-6">
        <SheetHeader className="px-0">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-600" />
            <SheetTitle className="text-xl text-blue-900">
              Details of a student's submission
            </SheetTitle>
          </div>
        </SheetHeader>

        <div>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="details"
                className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white shadow-none outline-none"
              >
                <Info className="h-4 w-4" />
                <span>Details</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white shadow-none outline-none"
              >
                <MessageSquare className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-0">
              <StaffSubmissionOverview submission={selectedSubmission} />
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              {selectedSubmission.submissionId ? (
                <StaffSubmissionVerificationHistory
                  submissionId={selectedSubmission.submissionId}
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
