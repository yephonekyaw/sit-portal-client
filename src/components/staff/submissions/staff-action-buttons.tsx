import { View, Download, TicketCheck } from "lucide-react";
import { generateFilePresignedUrl } from "@/services/minio/apis";
import { toast } from "sonner";

interface StaffActionButtonsProps {
  fileObjectName: string;
  filename: string;
  canBeVerified: boolean | null;
  onVerify: () => void;
}

const StaffActionButtons = ({
  fileObjectName,
  filename,
  canBeVerified,
  onVerify,
}: StaffActionButtonsProps) => {
  const handleClickView = async (
    objectName: string,
    expiresInHours?: number
  ) => {
    try {
      const response = await generateFilePresignedUrl({
        objectName,
        expiresInHours,
      });
      if (response.data) {
        window.open(response.data.presignedUrl, "_blank");
      } else if (response.errors) {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("View failed:", error);
      toast.error("Failed to view file");
    }
  };

  const handleClickDownload = async (
    objectName: string,
    filename: string,
    expiresInHours?: number
  ) => {
    try {
      const response = await generateFilePresignedUrl({
        objectName,
        expiresInHours,
      });

      if (response.data) {
        const fileResponse = await fetch(response.data.presignedUrl);
        if (!fileResponse.ok) {
          toast.error("Failed to download file");
          return;
        }

        const blob = await fileResponse.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else if (response.errors) {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="flex gap-1 shrink-0">
      <div
        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors cursor-pointer"
        title="View"
        onClick={() => handleClickView(fileObjectName)}
      >
        <View className="h-4 w-4 text-blue-600" />
      </div>
      <div
        className="p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors cursor-pointer"
        title="Download"
        onClick={() => handleClickDownload(fileObjectName, filename, 1)}
      >
        <Download className="h-4 w-4 text-purple-600" />
      </div>
      <div
        className={`p-2 rounded-lg transition-colors ${
          canBeVerified
            ? "bg-amber-100 hover:bg-amber-200 cursor-pointer"
            : "bg-gray-100 cursor-not-allowed opacity-50"
        }`}
        title={canBeVerified ? "Verify" : "Cannot verify in current state"}
        onClick={canBeVerified ? onVerify : undefined}
      >
        <TicketCheck
          className={`h-4 w-4 ${
            canBeVerified ? "text-amber-600" : "text-gray-400"
          }`}
        />
      </div>
    </div>
  );
};

export default StaffActionButtons;
