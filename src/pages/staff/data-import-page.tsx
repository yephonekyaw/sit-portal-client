import { useState, useEffect } from "react";
import { FileUpload } from "@/components/staff/data-import/file-upload";
import DataTable from "@/components/ui/data-table/data-table";
import { columns } from "@/components/staff/data-import/columns";
import StudentDetailSheet from "@/components/staff/data-import/student-detail-sheet";
import { useParsedStudentDataStore } from "@/stores/staff/parsed-student-data.stores";
import PageHeader from "@/components/staff/data-import/page-header";

const StudentDataImportPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const {
    parseFiles,
    parsedData,
    filesWithErrors,
    fileParseResults,
    isLoading,
    handleSelectRecord,
  } = useParsedStudentDataStore();

  useEffect(() => {
    parseFiles(files);
  }, [files, parseFiles]);

  return (
    <div className="w-full">
      {/* Header */}
      <PageHeader />

      {/* Main content */}
      <main className="grid grid-cols-1 gap-4">
        <div className="lg:col-span-2">
          <FileUpload
            onFilesSelected={setFiles}
            filesWithErrors={filesWithErrors}
            fileParseResults={fileParseResults}
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
                handleSelectRecord,
              })}
              data={parsedData}
            />
          )}
        </div>
      </main>

      <StudentDetailSheet />
    </div>
  );
};

export default StudentDataImportPage;
