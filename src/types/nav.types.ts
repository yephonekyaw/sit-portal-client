import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  children?: NavigationItem[];
}

export interface DesktopNavProps {
  className?: string;
}

export interface DesktopNavItemProps {
  item: NavigationItem;
  level: number;
  hasChildren: boolean | undefined;
  className?: string;
}

export interface DesktopNavRecursiveRenderProps {
  items: NavigationItem[];
  level?: number;
}

// mobile nav types

export interface MobileNavItemProps {
  item: NavigationItem;
  index: number;
  onItemClick: (item: NavigationItem) => void;
  isTransitioning: boolean;
}

export interface MobileNavProps {
  onClose: () => void;
}

export interface MobileNavStackLevel {
  items: NavigationItem[];
  title?: string;
}

export type NavRole = "student" | "staff";

export interface NavState {
  currentRole: NavRole;
  setNavRole: (role: NavRole) => void;
}
