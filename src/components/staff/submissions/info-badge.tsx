import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface InfoBadgeProps {
  icon: LucideIcon;
  name: string;
  value: string;
}

const InfoBadge = ({ icon: Icon, name, value }: InfoBadgeProps) => {
  return (
    <Badge className="bg-white border border-blue-200 text-black">
      <Icon className="h-4 w-4" />
      &bull;
      <span>{name}</span>
      &bull;
      <span>{value}</span>
    </Badge>
  );
};

export default InfoBadge;
