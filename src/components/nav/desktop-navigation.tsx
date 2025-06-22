import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { navigationConfig } from "./navigation-config";
import { getSectionTitle, getSectionDescription } from "./navigation-utils";

// Lazy load the navigation section component
const NavigationSection = lazy(() =>
  import("./navigation-section").then((module) => ({
    default: module.NavigationSection,
  }))
);

interface DesktopNavigationProps {
  className?: string;
}

export function DesktopNavigation({ className }: DesktopNavigationProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <Suspense
        fallback={
          <div className="flex space-x-1">
            {Object.keys(navigationConfig).map((key) => (
              <div
                key={key}
                className="px-4 py-2 rounded-xl bg-gray-100 animate-pulse w-24 h-10"
              />
            ))}
          </div>
        }
      >
        {Object.entries(navigationConfig).map(([key, items]) => (
          <NavigationSection
            key={key}
            title={getSectionTitle(key)}
            description={getSectionDescription(key)}
            items={items}
          />
        ))}
      </Suspense>
    </div>
  );
}
