import { NavLink } from "react-router-dom";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "./navigation-config";

interface NavigationItemProps {
  item: NavigationItem;
  level?: number;
  className?: string;
}

export function NavigationItemComponent({
  item,
  level = 0,
  className,
}: NavigationItemProps) {
  const Icon = item.icon || FileText;

  return (
    <NavLink
      to={item.href}
      className={cn(
        "group flex items-center gap-3 w-full rounded-xl p-3 text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
        level > 0 && "text-sm",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-lg transition-colors bg-gray-100 dark:bg-gray-700 group-hover:bg-purple-100 dark:group-hover:bg-purple-800/50",
          "w-8 h-8"
        )}
      >
        <Icon
          className={cn(
            "transition-colors text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400",
            "h-4 w-4"
          )}
        />
      </div>
      <span className="font-medium transition-colors text-gray-900 dark:text-white">
        {item.title}
      </span>
    </NavLink>
  );
}
