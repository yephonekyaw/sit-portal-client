import type { DesktopNavRecursiveRenderProps } from "@/types/nav.types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { cn } from "@/lib/utils";
import DesktopNavItem from "./desktop-nav-item";

const DesktopNavRecursiveRender = ({
  items,
  level = 0,
}: DesktopNavRecursiveRenderProps) => {
  const horizontal = level === 0;

  return (
    <div
      className={cn(
        "flex",
        horizontal ? "flex-row items-center space-x-2" : "flex-col space-y-2"
      )}
    >
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;

        if (!hasChildren)
          return (
            <DesktopNavItem
              key={item.href}
              item={item}
              hasChildren={hasChildren}
              level={level}
            />
          );

        return (
          <HoverCard key={item.href} openDelay={100} closeDelay={150}>
            <HoverCardTrigger asChild>
              <div>
                <DesktopNavItem
                  item={item}
                  level={level}
                  hasChildren={hasChildren}
                />
              </div>
            </HoverCardTrigger>

            <HoverCardContent
              side={horizontal ? "bottom" : "right"}
              align="start"
              className={cn(
                "w-full rounded-xl border border-gray-200/80 bg-white/95 backdrop-blur-sm p-3 shadow-xl",
                "animate-in fade-in-0 zoom-in-95 duration-200",
                "ring-1 ring-gray-900/5"
              )}
            >
              <DesktopNavRecursiveRender
                items={item.children!}
                level={level + 1}
              />
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
};

export default DesktopNavRecursiveRender;
