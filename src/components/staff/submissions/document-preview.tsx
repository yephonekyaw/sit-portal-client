import { Button } from "@/components/ui/button";
import type { Submission } from "@/types/staff/submission.types";
import { Eye } from "lucide-react";
import { memo } from "react";

interface DocumentPreviewProps {
  submission: Submission;
  trigger?: React.ReactNode;
}

const DocumentPreview = ({ submission, trigger }: DocumentPreviewProps) => {
  const handleViewDocument = () => {
    // Use sample files based on mime type
    let sampleFile = "/sample/mock_file_1.pdf";

    if (submission.mime_type.startsWith("image/")) {
      sampleFile = "/sample/mock_pic_1.png";
    } else if (submission.mime_type === "application/pdf") {
      sampleFile = "/sample/mock_file_1.pdf";
    }

    window.open(sampleFile, "_blank");
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" onClick={handleViewDocument}>
      <Eye className="h-4 w-4 mr-2" />
      View
    </Button>
  );

  return trigger ? (
    <div onClick={handleViewDocument} className="cursor-pointer">
      {trigger}
    </div>
  ) : (
    defaultTrigger
  );
};

export default memo(DocumentPreview);
