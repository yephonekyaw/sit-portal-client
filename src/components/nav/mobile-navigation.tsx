import { useState, lazy, Suspense } from "react";
import { ChevronLeft, FileText, Settings, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { navigationConfig, type NavigationItem } from "./navigation-config";

// Lazy load the mobile navigation item component
const MobileNavigationItem = lazy(() =>
  import("./mobile-navigation-item").then((module) => ({
    default: module.MobileNavigationItem,
  }))
);

interface MobileNavigationProps {
  onClose: () => void;
}

interface NavigationLevel {
  items: NavigationItem[];
  title?: string;
}

const rootNavigation: NavigationItem[] = [
  {
    title: "Student Portal",
    href: "/student",
    icon: FileText,
    children: navigationConfig.student,
  },
  {
    title: "Staff Portal",
    href: "/staff",
    icon: Settings,
    children: navigationConfig.staff,
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircle,
    children: navigationConfig.help,
  },
];

export function MobileNavigation({ onClose }: MobileNavigationProps) {
  const [navigationStack, setNavigationStack] = useState<NavigationLevel[]>([
    { items: rootNavigation },
  ]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "backward"
  >("forward");

  const currentLevel = navigationStack[navigationStack.length - 1];
  const isRootLevel = navigationStack.length === 1;

  const handleItemClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      setIsTransitioning(true);
      setTransitionDirection("forward");

      setTimeout(() => {
        setNavigationStack((prev) => [
          ...prev,
          {
            items: item.children!,
            title: item.title,
          },
        ]);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 150);
    } else {
      console.log(`Navigate to: ${item.href}`);
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
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
      <div className="h-16 flex-shrink-0 border-b border-gray-200 dark:border-gray-700" />

      <div
        className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
          !isRootLevel
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {!isRootLevel && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              disabled={isTransitioning}
              className="flex items-center gap-2 text-sm font-medium -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="mt-3">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
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
              <Suspense
                fallback={
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-14 bg-gray-100 rounded-xl animate-pulse"
                      />
                    ))}
                  </div>
                }
              >
                {currentLevel.items.map((item, index) => (
                  <MobileNavigationItem
                    key={`${item.href}-${index}`}
                    item={item}
                    index={index}
                    onItemClick={handleItemClick}
                    isTransitioning={isTransitioning}
                  />
                ))}
              </Suspense>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
