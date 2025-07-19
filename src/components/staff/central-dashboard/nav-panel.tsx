import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  FileBadge,
  ClipboardList,
  Calendar,
} from "lucide-react";
import { useCentralDashboardNavStore } from "@/stores/staff/central-dashboard.stores";
import type { NavState } from "@/types/staff/central-dashboard.types";

const NavPanel = () => {
  const { activeItem, setActiveItem } = useCentralDashboardNavStore();

  const navItems = [
    { id: "prog", label: "Programs", icon: GraduationCap },
    { id: "cert", label: "Certificates", icon: FileBadge },
    { id: "reqs", label: "Requirements", icon: ClipboardList },
    { id: "sche", label: "Schedules", icon: Calendar },
  ];

  return (
    <div className="sticky top-[4rem] z-50">
      <ScrollArea className="w-full bg-transparent rounded-full">
        <div className="flex items-center bg-[#F2F0F2] rounded-full">
          {navItems.map((item) => {
            return (
              <Button
                key={item.id}
                onClick={() => setActiveItem(item.id as NavState["activeItem"])}
                className={cn(
                  "group flex items-center justify-center flex-grow rounded-full whitespace-normal h-[3.5rem] gap-2 transition-all min-w-[12rem] shadow-none outline-none",
                  activeItem === item.id
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
