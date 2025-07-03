import { useState, useEffect } from "react";
import { FileUp } from "lucide-react";
import { FileUpload } from "@/components/staff/student-data-import/file-upload";
import DataTable from "@/components/ui/data-table/data-table";
import { columns } from "@/components/staff/student-data-import/columns";
import { useFileParser } from "@/hooks/use-file-parser";
import { useParsedRecordManager } from "@/hooks/use-parsed-record-manager";
import StudentDetailSheet from "@/components/staff/student-data-import/student-detail-sheet";

export const StudentDataImportPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { parsedData, setParsedData, filesWithErrors, parseFiles, isLoading } =
    useFileParser();

  // Use the complete hook instance, not just one method
  const recordManager = useParsedRecordManager({
    parsedData,
    setParsedData,
  });

  useEffect(() => {
    parseFiles(files);
  }, [files, parseFiles]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <FileUp className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">
              Student Data Import
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Streamline the enrollment process by uploading a single data file.
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="grid grid-cols-1 gap-8">
        <div className="lg:col-span-2">
          <FileUpload
            onFilesSelected={setFiles}
            filesWithErrors={filesWithErrors}
          />
        </div>

        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-blue-600 font-medium">
                Processing files...
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns({
                onSelectRecord: recordManager.handleSelectRecord,
              })}
              data={parsedData}
            />
          )}
        </div>
      </main>

      {/* Pass the record manager instance to the sheet */}
      <StudentDetailSheet recordManager={recordManager} mode="edit" />
    </div>
  );
};
