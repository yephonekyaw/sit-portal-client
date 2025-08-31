import type { CardInfoSectionProps } from "@/types/staff/dashboard.types";

const CardInfoSection = ({ children }: CardInfoSectionProps) => {
  return (
    <div className="flex flex-wrap gap-2.5">
      {children}
    </div>
  );
};

export default CardInfoSection;
