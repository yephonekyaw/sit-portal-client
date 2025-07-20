import { formatDate } from "@/utils/staff/dashboard.utils";

interface CardFooterProps {
  createdAt: string;
  updatedAt: string;
}

const CardFooter = ({ createdAt, updatedAt }: CardFooterProps) => {
  return (
    <div className="flex justify-between items-center gap-2 pt-3 border-t border-blue-100 text-xs sm:text-sm">
      <div className="flex items-center gap-4">
        <span className="text-slate-500">Created:</span>
        <span className="text-slate-700 font-medium">
          {formatDate(createdAt)}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-500">Updated:</span>
        <span className="text-slate-700 font-medium">
          {formatDate(updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default CardFooter;
