import { FilePieChart } from "lucide-react";

const PageHeader = () => {
  return (
    <header className="rounded-2xl mb-[1rem]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <FilePieChart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-blue-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create, manage, and review statistics, programs, certificates, and
            program requirements.
          </p>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
