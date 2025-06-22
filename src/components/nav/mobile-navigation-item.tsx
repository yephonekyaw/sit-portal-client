import { ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "./navigation-config";

interface MobileNavigationItemProps {
  item: NavigationItem;
  index: number;
  onItemClick: (item: NavigationItem) => void;
  isTransitioning: boolean;
}

export function MobileNavigationItem({
  item,
  index,
  onItemClick,
  isTransitioning,
}: MobileNavigationItemProps) {
  const Icon = item.icon || FileText;
  const hasChildren = item.children && item.children.length > 0;

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
        className="w-full justify-between h-14 px-4 text-left transition-all duration-200 rounded-xl disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors bg-gray-100 dark:bg-gray-700 group-hover:bg-purple-100 dark:group-hover:bg-purple-800/50">
            <Icon className="h-5 w-5 transition-colors text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
          </div>
          <span className="font-medium transition-colors text-gray-900 dark:text-white">
            {item.title}
          </span>
        </div>
        <ChevronRight
          className={cn(
            "h-5 w-5 transition-all duration-200 text-gray-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400",
            !hasChildren && "invisible",
            !isTransitioning && "group-hover:translate-x-1"
          )}
        />
      </Button>
    </div>
  );
}
