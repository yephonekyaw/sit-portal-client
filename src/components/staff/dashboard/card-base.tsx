import { Card } from "@/components/ui/card";
import type { CardBaseProps } from "@/types/staff/dashboard.types";

const CardBase = ({ children, className = "" }: CardBaseProps) => {
  return (
    <Card
      className={`group bg-white/90 border border-blue-100 outline-none shadow-none transition-all duration-300 overflow-hidden hover:bg-gradient-to-r hover:from-slate-50 hover:via-blue-50 hover:to-slate-100 ${className}`}
    >
      {children}
    </Card>
  );
};

export default CardBase;
