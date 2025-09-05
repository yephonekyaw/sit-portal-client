import { CheckCircle } from "lucide-react";

const PageHeader = () => {
  return (
    <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-[1rem] space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <CheckCircle className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-blue-900">Submissions</h1>
          <p className="mt-1 text-sm text-gray-600">
            View and manage all student submissions for the program
            requirements.
          </p>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
