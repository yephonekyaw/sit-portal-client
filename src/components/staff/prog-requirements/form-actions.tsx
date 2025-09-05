import type { FormActionsProps } from "@/types/staff/prog-req.types";
import { Save } from "lucide-react";

export const FormActions = ({
  isEdit,
  isSubmitting,
  isCreating,
  isUpdating,
  onGoBack,
}: FormActionsProps) => {
  const isLoading = isSubmitting || isCreating || isUpdating;

  return (
    <div className="flex items-center justify-end gap-3 pt-4">
      <button
        type="button"
        onClick={onGoBack}
        disabled={isLoading}
        className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
      >
        <Save className="h-4 w-4" />
        {isLoading
          ? "Saving..."
          : isEdit
          ? "Update Requirement"
          : "Create Requirement"}
      </button>
    </div>
  );
};
