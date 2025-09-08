import { useSubmissionStore } from "@/stores/staff/submission.stores";
import type { StudentSubmissionItem } from "@/services/staff/submissions/types";

interface FilenameCellProps {
  submission: StudentSubmissionItem;
}

const FilenameCell = ({ submission }: FilenameCellProps) => {
  const { openDetailSheet } = useSubmissionStore();

  if (!submission.filename) {
    return (
      <div className="text-sm text-gray-400 italic">No file submitted</div>
    );
  }

  const handleClick = () => {
    openDetailSheet(submission);
  };

  return (
    <div
      className="flex items-center space-x-2 group/underline cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <span className="text-gray-800 font-medium text-sm">
          {submission.filename}
        </span>
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 ease-out group-hover/underline:w-full" />
      </div>
    </div>
  );
};

export default FilenameCell;
