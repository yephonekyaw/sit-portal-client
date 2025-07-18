import { cn } from "@/lib/utils";
import { NAVIGATION_CONFIG } from "@/constants/nav.constants";
import { useNavConfigStore } from "@/stores/nav.stores";
import DesktopNavRecursiveRender from "./desktop-nav-recursive-render";
import type { DesktopNavProps } from "@/types/nav.types";

export default function DesktopNav({ className }: DesktopNavProps) {
  const currentRole = useNavConfigStore((s) => s.currentRole);
  return (
    <nav className={cn("flex items-center", className)}>
      <DesktopNavRecursiveRender items={NAVIGATION_CONFIG[currentRole]} />
    </nav>
  );
}
