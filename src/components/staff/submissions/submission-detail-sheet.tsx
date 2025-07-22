import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubmissionDetailSheet } from "@/stores/staff/submission-detail.stores";
import { useState } from "react";
import VerificationHistoryComp from "./verification-history";
import SubmissionOverview from "./submission-overview";
import FileDetails from "./file-detail";

const SubmissionDetailSheet = () => {
  const { selectedSubmission, isDetailSheetOpen, closeDetailSheet } = useSubmissionDetailSheet();
  const [activeTab, setActiveTab] = useState("details");

  if (!selectedSubmission) {
    return null;
  }

  return (
    <Sheet open={isDetailSheetOpen} onOpenChange={closeDetailSheet}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto px-6 pb-4">
        <SheetHeader className="px-0">
          <SheetTitle className="text-xl">
            Submission Details - {selectedSubmission.student.user.first_name} {selectedSubmission.student.user.last_name}
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
              <TabsTrigger value="history" className="shadow-none outline-none">
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <SubmissionOverview submission={selectedSubmission} />
              <FileDetails submission={selectedSubmission} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <VerificationHistoryComp />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SubmissionDetailSheet;
