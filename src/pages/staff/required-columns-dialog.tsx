import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

const requiredColumns = [
  { key: "sit_email", label: "SIT Email" },
  { key: "roll_number", label: "Roll No" },
  { key: "program_code", label: "Program Code" },
  { key: "academic_year", label: "Academic Year" },
];

interface RequiredColumnsDialogProps {
  children: React.ReactNode;
}

export function RequiredColumnsDialog({
  children,
}: RequiredColumnsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-blue-50 border-blue-100">
        <DialogDescription className="sr-only">
          To ensure a smooth upload process, please make sure your file includes
          the required columns listed below. If any of these columns are
          missing, the upload may fail or result in incomplete data.
        </DialogDescription>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Info className="w-5 h-5 text-blue-600" />
            Required Data Columns
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-5">
            For a successful upload, please ensure your file contains the
            following columns with the exact names:
          </p>
          <div className="space-y-2">
            {requiredColumns.map((col) => (
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
}
