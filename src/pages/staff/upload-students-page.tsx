import { useState, useEffect } from "react";
import FileUpload from "./file-upload";
import { FileUp } from "lucide-react";
import { useFileParser } from "./use-file-parser";

export function UploadStudentsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const { parsedData, filesWithErrors, parseFiles } = useFileParser();

  useEffect(() => {
    parseFiles(files);
  }, [files, parseFiles]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <main className="grid grid-cols-1 gap-8">
        <div className="lg:col-span-2">
          <FileUpload
            onFilesSelected={setFiles}
            filesWithErrors={filesWithErrors}
          />
        </div>
        {parsedData.length > 0 && (
          <div className="lg:col-span-2">
            <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
