import { Badge } from "@/components/ui/badge";
import type { CardInfoItemProps } from "@/types/staff/dashboard.types";

const CardInfoItem = ({
  icon: Icon,
  label,
  value,
  className = "",
}: CardInfoItemProps) => {
  return (
    <Badge
      className={`bg-gray-100 text-gray-700 border-gray-200 text-sm space-x-1 px-2 py-1 ${className}`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      <span>{value}</span>
    </Badge>
  );
};

export default CardInfoItem;
