import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Archive, AlertTriangle } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { useCertificateStore } from "@/stores/staff/certificate.stores";
import { useArchiveCertificate } from "@/services/staff/certificates/mutations";

const CertificateArchiveModal = () => {
  const {
    deleteConfirmModalState,
    setDeleteConfirmModalState,
    archiveCertificateId,
  } = useCertificateStore();

  const { mutateAsync: archiveCertificate, isPending: isArchiving } =
    useArchiveCertificate();

  const handleCancelArchive = () => {
    setDeleteConfirmModalState(false);
  };

  const handleConfirmArchive = async () => {
    if (archiveCertificateId) {
      await archiveCertificate(archiveCertificateId);
    } else {
      toast.error("No certificate selected to archive");
    }
  };

  return (
    <Dialog
      open={deleteConfirmModalState}
      onOpenChange={setDeleteConfirmModalState}
    >
      <DialogContent
        className="max-w-md border-slate-200 rounded-lg"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex text-slate-700 items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-slate-500" />
            Confirm Archive
          </DialogTitle>
          <DialogDescription asChild>
            <div className="text-gray-600 space-y-3">
              <p className="font-medium">
                Are you sure you want to archive this certificate? This action
                cannot be undone.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Important Notice:</p>
                    <p>
                      Certificates with active requirements cannot be archived.
                      Before proceeding, please ensure that all associated
                      requirements are archived.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCancelArchive}
            className="border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmArchive}
            className="bg-slate-600 hover:bg-slate-700 text-white"
          >
            <Archive className="w-4 h-4" />
            {isArchiving ? "Archiving..." : "Archive Certificate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CertificateArchiveModal);
