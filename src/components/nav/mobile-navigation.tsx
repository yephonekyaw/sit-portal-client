import { useState } from "react";
import { ChevronLeft, FileText, Settings, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { navigationConfig, type NavigationItem } from "./navigation-config";
import { MobileNavigationItem } from "./mobile-navigation-item";
import { Link } from "react-router-dom";

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
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              disabled={isTransitioning}
              className="flex items-center gap-2 text-sm font-medium -ml-2 hover:bg-gray-100 transition-colors text-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="mt-3">
              <h3 className="font-semibold text-lg text-gray-900">
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
                <MobileNavigationItem
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
