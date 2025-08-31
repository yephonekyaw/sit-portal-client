import { Card } from "@/components/ui/card";
import type { CardBaseProps } from "@/types/staff/dashboard.types";

const CardBase = ({ children, className = "" }: CardBaseProps) => {
  return (
    <Card
      className={`group bg-white border border-slate-200 outline-none shadow-sm hover:shadow-lg hover:ring-2 hover:ring-blue-500/20 transition-all duration-200 overflow-hidden rounded-xl ${className}`}
    >
      {children}
    </Card>
  );
};

export default CardBase;
