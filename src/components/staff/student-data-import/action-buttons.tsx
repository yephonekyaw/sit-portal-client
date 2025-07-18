import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useParsedStudentDataStore } from "@/stores/staff/parsed-student-data.stores";
import type { ActionButtonsProps } from "@/types/staff/student-data-import.types";
import { CloudUpload, PlusCircle, Trash2 } from "lucide-react";

const ActionButtons = <TData,>({ table }: ActionButtonsProps<TData>) => {
  const { handleMultipleDelete, handleSelectRecord, handleReorderRecords } =
    useParsedStudentDataStore();

  const handleDeleteMany = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    if (selectedRows.length === 0) return;

    // Get the IDs of the selected records
    const selectedIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    handleMultipleDelete(selectedIds);
    handleReorderRecords();

    // Clear selection after deletion
    table.setRowSelection({});
  };

  const handleSubmitData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Data submitted");
  };

  return (
    <div className="flex items-center p-1 gap-2">
      <Button
        disabled={table.getRowCount() === 0}
        onClick={handleSubmitData}
        className="group relative overflow-hidden rounded-l-2xl rounded-r-lg border-0 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-gray-800 font-semibold px-6 py-2 transition-all duration-300 ease-out transform hover:-translate-y-0.5"
      >
        <CloudUpload className="h-4 w-4 text-blue-600 transition-transform duration-300" />
        <span className="relative z-10">Submit Data</span>
      </Button>

      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSelectRecord(null, "add");
        }}
        className="group relative overflow-hidden rounded-lg border-0 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-gray-800 font-semibold px-6 py-2 transition-all duration-300 ease-out transform hover:-translate-y-0.5"
      >
        <PlusCircle className="h-4 w-4 text-green-600 transition-transform duration-300" />
        <span className="relative z-10">Add New</span>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            className="group relative overflow-hidden rounded-r-2xl rounded-l-lg border-0 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-gray-800 font-semibold px-6 py-2 transition-all duration-300 ease-out transform hover:-translate-y-0.5"
          >
            <Trash2 className="h-4 w-4 text-red-600 transition-transform duration-300" />
            <span className="relative z-10">Delete Selected</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected students' data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMany}
              className="bg-red-700 hover:bg-red-800"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButtons;
