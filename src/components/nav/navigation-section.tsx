import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { NavigationItemComponent } from "./navigation-item";
import type { NavigationItem } from "./navigation-config";

interface NavigationSectionProps {
  title: string;
  description: string;
  items: NavigationItem[];
  className?: string;
}

export function NavigationSection({
  title,
  description,
  items,
  className,
}: NavigationSectionProps) {
  const renderNavigationItems = (items: NavigationItem[], level = 0) => {
    return (
      <div className={cn("space-y-1 text-sm", level > 0 && "ml-4")}>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          if (hasChildren) {
            return (
              <HoverCard key={item.href} openDelay={150} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="group flex items-center justify-between w-full rounded-xl p-3 text-left transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                    <NavigationItemComponent
                      item={item}
                      level={level}
                      className="p-0 hover:bg-transparent"
                    />
                    <ChevronRight className="h-4 w-4 transition-all duration-200 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent
                  side="right"
                  align="start"
                  className="w-72 p-3 bg-white border border-gray-200 shadow-xl rounded-2xl"
                >
                  {renderNavigationItems(item.children!, 0)}
                </HoverCardContent>
              </HoverCard>
            );
          }

          return (
            <NavigationItemComponent
              key={item.href}
              item={item}
              level={level}
            />
          );
        })}
      </div>
    );
  };

  return (
    <HoverCard openDelay={150} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          className={cn(
            "px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-100 text-gray-700 hover:text-blue-600 text-sm",
            className
          )}
        >
          {title}
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        align="start"
        className="w-fit p-3 bg-white border border-gray-200 shadow-xl rounded-2xl text-sm"
      >
        <div className="mb-3 pb-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        {renderNavigationItems(items)}
      </HoverCardContent>
    </HoverCard>
  );
}
