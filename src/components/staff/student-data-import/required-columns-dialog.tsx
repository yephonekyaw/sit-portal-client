import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { REQUIRED_COLUMN_MAPPINGS } from "@/constants/staff/student-data-import/index.constants";

interface RequiredColumnsDialogProps {
  children: React.ReactNode;
}

export const RequiredColumnsDialog: React.FC<RequiredColumnsDialogProps> = ({
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-blue-50 border-blue-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Info className="w-5 h-5 text-blue-600" />
            Required Data Columns
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            For a successful upload, please ensure your file contains the
            following columns with the exact names:
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            {REQUIRED_COLUMN_MAPPINGS.map((col) => (
              <Badge
                key={col.key}
                variant="outline"
                className="w-full flex justify-start py-2 px-3 text-sm font-mono bg-white border-gray-200 text-gray-700"
              >
                {col.label}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
