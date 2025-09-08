import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequirementStore } from "@/stores/student/requirement.stores";
import { useState } from "react";
import type { TabState } from "@/types/student/requirement.types";
import SheetOverview from "./sheet-overview";
import FileUploadSection from "./file-upload-section";
import { isRequirementSubmitted } from "@/utils/student/requirement.utils";
import StudentVerificationHistory from "./verification-history";
import { Info, MessageSquare } from "lucide-react";

const DetailSheet = () => {
  const [activeTab, setActiveTab] = useState<TabState>("details");
  const { selectedRequirement, detailSheetState, closeDetailSheet } =
    useRequirementStore();

  if (!selectedRequirement) return null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDetailSheet();
    }
  };

  return (
    <Sheet open={detailSheetState} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto px-6">
        <SheetHeader className="px-0">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-600" />
            <SheetTitle className="text-xl text-blue-900">
              Details of {selectedRequirement.requirementName}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabState)}
            className="w-full"
          >
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
                disabled={!isRequirementSubmitted(selectedRequirement)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <SheetOverview requirement={selectedRequirement} />

              {!isRequirementSubmitted(selectedRequirement) && (
                <FileUploadSection requirement={selectedRequirement} />
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {selectedRequirement?.submissionId ? (
                <StudentVerificationHistory
                  submissionId={selectedRequirement.submissionId}
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

export default DetailSheet;
