import type { NavigationItem } from "@/types/nav.types";

// Helper function to check if an item or its children are active
export const isItemActive = (
  item: NavigationItem,
  pathname: string
): boolean => {
  // Check exact match first
  if (item.href === pathname) {
    return true;
  }

  // For items with children, only check children (don't do prefix matching on parent)
  if (item.children && item.children.length > 0) {
    return item.children.some((child) => isItemActive(child, pathname));
  }

  // For items without children, check if the current path starts with the item's href
  // This handles sub-routes like /staff/staff-management/new under /staff/staff-management
  if (!item.children || item.children.length === 0) {
    return pathname.startsWith(item.href + "/") || pathname === item.href;
  }

  return false;
};

// Helper function to find the active path in navigation
export const findActivePath = (
  items: NavigationItem[],
  pathname: string
): NavigationItem[] => {
  for (const item of items) {
    if (item.href === pathname) {
      return [item];
    }

    if (item.children && item.children.length > 0) {
      const childPath = findActivePath(item.children, pathname);
      if (childPath.length > 0) {
        return [item, ...childPath];
      }
    }
  }

  return [];
};
