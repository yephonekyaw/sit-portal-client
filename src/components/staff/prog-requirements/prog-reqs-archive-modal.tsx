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
import { useProgramRequirementStore } from "@/stores/staff/prog-reqs.stores";
import { useArchiveProgramRequirement } from "@/services/staff/prog-reqs/mutations";
import { toast } from "sonner";

const ProgramRequirementArchiveModal = () => {
  const {
    archiveConfirmModalState,
    setArchiveConfirmModalState,
    archiveRequirementId,
  } = useProgramRequirementStore();

  const { mutateAsync: archiveRequirement, isPending: isArchiving } =
    useArchiveProgramRequirement();

  const handleCancelArchive = () => {
    setArchiveConfirmModalState(false);
  };

  const handleConfirmArchive = async () => {
    if (archiveRequirementId) {
      await archiveRequirement(archiveRequirementId);
    } else {
      toast.error("No program requirement selected to archive");
    }
  };

  return (
    <Dialog
      open={archiveConfirmModalState}
      onOpenChange={setArchiveConfirmModalState}
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
                Are you sure you want to archive this program requirement? This
                action cannot be undone.
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mt-3">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-indigo-700">
                    <p className="font-medium mb-1">Important Notice:</p>
                    <p>
                      Archiving this requirement will automatically update the
                      effective_until_year based on the latest academic year
                      with created schedules. Future schedules will not be
                      generated for this requirement.
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
            disabled={isArchiving}
          >
            <Archive className="w-4 h-4" />
            {isArchiving ? "Archiving..." : "Archive Requirement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramRequirementArchiveModal;
