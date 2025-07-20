import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";

interface CardInfoSectionProps {
  children: ReactNode;
}

const CardInfoSection = ({ children }: CardInfoSectionProps) => {
  return (
    <ScrollArea className="w-full">
      <div className="text-xs sm:text-sm flex items-center justify-start gap-[5rem]">
        {children}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
};

export default CardInfoSection;
