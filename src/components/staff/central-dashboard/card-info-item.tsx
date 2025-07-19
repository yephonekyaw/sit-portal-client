import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const CardInfoItem = ({
  icon,
  iconBgColor,
  label,
  value,
}: {
  icon: ReactNode;
  iconBgColor: string;
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 text-xs sm:text-sm">
      <div className={cn("p-1.5 sm:p-2 rounded-lg", iconBgColor)}>{icon}</div>
      <div>
        <p className="text-slate-500">{label}</p>
        <p className="font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default CardInfoItem;
