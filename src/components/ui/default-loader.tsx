import { Loader2 } from "lucide-react";

const DefaultLoader = ({ label }: { label?: string }) => {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
        <p className="text-slate-600">{label || "Loading..."}</p>
      </div>
    </div>
  );
};

export default DefaultLoader;
