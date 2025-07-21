import { cn } from "@/lib/utils";
import type { CardInfoItemProps } from "@/types/staff/dashboard.types";

const CardInfoItem = ({ icon: Icon, label, value }: CardInfoItemProps) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 text-xs sm:text-sm">
      <div className={cn("p-1.5 sm:p-2 rounded-lg bg-blue-100")}>
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
      </div>
      <div>
        <p className="text-slate-500">{label}</p>
        <p className="font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default CardInfoItem;
