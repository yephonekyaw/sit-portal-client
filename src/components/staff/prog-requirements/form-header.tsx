import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, FileText, Info } from "lucide-react";
import type { FormHeaderProps } from "@/types/staff/prog-req.types";

export const FormHeader = ({ isEdit, onGoBack }: FormHeaderProps) => {
  return (
    <header className="rounded-2xl space-y-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 bg-blue-600">
            <AvatarFallback className="bg-transparent text-white">
              <FileText className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-blue-900">
              {isEdit
                ? "Edit Program Requirement"
                : "Create New Program Requirement"}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {isEdit
                ? "Update program requirement information and settings."
                : "Add a new program requirement to the system."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={`text-xs px-2 py-1 ${
              isEdit
                ? "bg-orange-100 text-orange-700 border-orange-200"
                : "bg-green-100 text-green-700 border-green-200"
            }`}
          >
            <Info className="h-3 w-3 mr-1" />
            {isEdit ? "Edit Mode" : "Create Mode"}
          </Badge>
          <div
            className="p-2 bg-white hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors cursor-pointer"
            title="Back to Requirements"
            onClick={onGoBack}
          >
            <ArrowLeft className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  );
};
