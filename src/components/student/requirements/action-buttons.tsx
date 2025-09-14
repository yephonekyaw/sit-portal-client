import { View, Download, Edit } from "lucide-react";
import { generateFilePresignedUrl } from "@/services/minio/apis";
import { toast } from "sonner";

interface ActionButtonsProps {
  fileObjectName: string;
  filename: string;
  onEdit: () => void;
}

const ActionButtons = ({ fileObjectName, filename, onEdit }: ActionButtonsProps) => {
  const handleClickView = async (objectName: string, expiresInHours?: number) => {
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
      console.error('View failed:', error);
      toast.error('Failed to view file');
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
      console.error('Download failed:', error);
      toast.error('Failed to download file');
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
        className="p-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors cursor-pointer"
        title="Edit"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4 text-orange-600" />
      </div>
    </div>
  );
};

export default ActionButtons;