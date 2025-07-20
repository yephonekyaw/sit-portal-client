import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { NAV_ITEMS } from "@/constants/staff/dashboard.constants";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const NavPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paths = location.pathname.split("/");

  return (
    <div className="sticky top-[4rem] z-50">
      <ScrollArea className="w-full bg-transparent rounded-full">
        <div className="flex items-center bg-[#F2F0F2] rounded-full">
          {NAV_ITEMS.map((item) => {
            return (
              <Button
                key={item.id}
                onClick={() => {
                  void navigate(item.href);
                }}
                className={cn(
                  "group flex items-center justify-center flex-grow rounded-full whitespace-normal h-[3.5rem] gap-2 transition-all min-w-[12rem] shadow-none outline-none",
                  paths.pop() === item.label.toLocaleLowerCase()
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200/60"
                    : "bg-transparent text-gray-800 hover:bg-[#EBE3E9]"
                )}
              >
                <item.icon className="size-5 z-10" />
                <span className="z-10">{item.label}</span>
              </Button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default NavPanel;
