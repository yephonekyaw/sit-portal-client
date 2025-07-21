import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Submission } from "@/mock/submissions.mock";
import { Eye } from "lucide-react";
import { useState } from "react";
import VerificationHistoryComp from "./verification-history";
import SubmissionOverview from "./submission-overview";
import FileDetails from "./file-detail";

const SubmissionDetailSheet = ({ submission }: { submission: Submission }) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto px-6 pb-4">
        <SheetHeader className="px-0">
          <SheetTitle className="text-xl">Submission Details</SheetTitle>
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
              <SubmissionOverview submission={submission} />
              <FileDetails submission={submission} />
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
