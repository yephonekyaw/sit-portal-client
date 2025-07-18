import { ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import type { MobileNavItemProps } from "@/types/nav.types";
import { isItemActive } from "@/utils/nav.utils";

export default function MobileNavItem({
  item,
  index,
  onItemClick,
  isTransitioning,
}: MobileNavItemProps) {
  const location = useLocation();
  const Icon = item.icon || FileText;
  const hasChildren = item.children && item.children.length > 0;
  const isActive = isItemActive(item, location.pathname);
  const isDirectlyActive = item.href === location.pathname;

  return (
    <div
      className={cn(
        "group transition-all duration-200",
        isTransitioning && "pointer-events-none"
      )}
      style={{
        transitionDelay: `${index * 30}ms`,
      }}
    >
      <Button
        variant="ghost"
        onClick={() => onItemClick(item)}
        disabled={isTransitioning}
        className={cn(
          "w-full justify-between h-14 px-4 text-left transition-all duration-200 rounded-xl disabled:opacity-50",
          isActive
            ? "bg-gradient-to-r from-blue-50 to-blue-50/80 hover:from-blue-100 hover:to-blue-100/80 border border-blue-200/50"
            : "hover:bg-gray-100 border border-transparent"
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl transition-colors",
              isActive ? "bg-blue-100" : "bg-gray-100 group-hover:bg-blue-100"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-colors",
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 group-hover:text-blue-600"
              )}
            />
          </div>
          <span
            className={cn(
              "font-medium transition-colors",
              isActive
                ? isDirectlyActive
                  ? "text-blue-700"
                  : "text-blue-600"
                : "text-gray-900"
            )}
          >
            {item.label}
          </span>
        </div>
        <ChevronRight
          className={cn(
            "h-5 w-5 transition-all duration-200",
            isActive
              ? "text-blue-500"
              : "text-gray-400 group-hover:text-blue-600",
            !hasChildren && "invisible",
            !isTransitioning && "group-hover:translate-x-1"
          )}
        />
      </Button>
    </div>
  );
}
