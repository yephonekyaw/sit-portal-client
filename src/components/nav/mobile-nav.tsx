import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import type {
  MobileNavProps,
  MobileNavStackLevel,
  NavigationItem,
} from "@/types/nav.types";
import { NAVIGATION_CONFIG } from "@/constants/nav.constants";
import { useNavConfigStore } from "@/stores/nav.stores";
import MobileNavItem from "./mobile-nav-item";
import { findActivePath } from "@/utils/nav.utils";

export function MobileNav({ onClose }: MobileNavProps) {
  const currentRole = useNavConfigStore((s) => s.currentRole);
  const location = useLocation();

  const [navigationStack, setNavigationStack] = useState<MobileNavStackLevel[]>(
    [{ items: NAVIGATION_CONFIG[currentRole] }]
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "backward"
  >("forward");

  const currentLevel = navigationStack[navigationStack.length - 1];
  const isRootLevel = navigationStack.length === 1;

  // Find active path and determine if back button should be highlighted
  const activePath = findActivePath(
    NAVIGATION_CONFIG[currentRole],
    location.pathname
  );
  const isBackButtonActive = activePath.length > navigationStack.length;

  const handleItemClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      setIsTransitioning(true);
      setTransitionDirection("forward");

      setTimeout(() => {
        setNavigationStack((prev) => [
          ...prev,
          {
            items: item.children!,
            title: item.label,
          },
        ]);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 150);
    } else {
      onClose();
    }
  };

  const handleBackClick = () => {
    if (navigationStack.length > 1) {
      setIsTransitioning(true);
      setTransitionDirection("backward");

      setTimeout(() => {
        setNavigationStack((prev) => prev.slice(0, -1));

        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 150);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <div className="h-16 flex-shrink-0 border-b border-gray-200 flex items-center justify-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-1 bg-blue-100 rounded-lg">
            <img src="/logos/temp_logo.svg" className="w-8 h-8" />
          </div>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            SIT PORTAL
          </span>
        </Link>
      </div>

      <div
        className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
          !isRootLevel
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {!isRootLevel && (
          <div
            className={cn(
              "px-6 py-4 border-b border-gray-200",
              isBackButtonActive ? "bg-blue-50/50" : "bg-gray-50"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              disabled={isTransitioning}
              className={cn(
                "flex items-center gap-2 text-sm font-medium -ml-2 transition-colors disabled:opacity-50",
                isBackButtonActive
                  ? "text-blue-700 hover:bg-blue-100"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="mt-3">
              <h3
                className={cn(
                  "font-semibold text-lg",
                  isBackButtonActive ? "text-blue-900" : "text-gray-900"
                )}
              >
                {currentLevel.title}
              </h3>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            isTransitioning
              ? transitionDirection === "forward"
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <ScrollArea className="h-full">
            <div className="space-y-2 p-4">
              {currentLevel.items.map((item, index) => (
                <MobileNavItem
                  key={`${item.href}-${index}`}
                  item={item}
                  index={index}
                  onItemClick={handleItemClick}
                  isTransitioning={isTransitioning}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
