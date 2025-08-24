import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequirementStore } from "@/stores/student/requirement.store";
import { useState } from "react";
import type { TabState } from "@/types/student/requirement.types";
import SheetOverview from "./sheet-overview";
import FileUploadSection from "./file-upload-section";
import { isRequirementSubmitted } from "@/utils/student/requirement.utils";

const DetailSheet = () => {
  const [activeTab, setActiveTab] = useState<TabState>("details");
  const { selectedRequirement, detailSheetState, closeDetailSheet } =
    useRequirementStore();

  if (!selectedRequirement) return null;

  return (
    <Sheet open={detailSheetState} onOpenChange={closeDetailSheet}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto px-6 pb-4">
        <SheetHeader className="px-0">
          <SheetTitle className="text-xl">
            Details of {selectedRequirement.requirementName}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabState)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="details" className="shadow-none outline-none">
                Details
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="shadow-none outline-none"
                disabled={!isRequirementSubmitted(selectedRequirement)}
              >
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <SheetOverview requirement={selectedRequirement} />

              {!isRequirementSubmitted(selectedRequirement) && (
                <FileUploadSection requirement={selectedRequirement} />
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {/* {submission?.verification_history ? (
                <StudentVerificationHistory
                  verificationHistories={submission.verification_history}
                />
              ) : ( */}
              <div className="text-center py-8 text-gray-500">
                No verification history available.
              </div>
              {/* )} */}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailSheet;
