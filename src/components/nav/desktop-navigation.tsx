import { cn } from "@/lib/utils";
import { navigationConfig } from "./navigation-config";
import { getSectionTitle, getSectionDescription } from "./navigation-utils";
import { NavigationSection } from "./navigation-section";

interface DesktopNavigationProps {
  className?: string;
}

export function DesktopNavigation({ className }: DesktopNavigationProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {Object.entries(navigationConfig).map(([key, items]) => (
        <NavigationSection
          key={key}
          title={getSectionTitle(key)}
          description={getSectionDescription(key)}
          items={items}
        />
      ))}
    </div>
  );
}
