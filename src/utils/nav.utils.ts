import type { NavigationItem } from "@/types/nav.types";

// Helper function to check if an item or its children are active
export const isItemActive = (
  item: NavigationItem,
  pathname: string
): boolean => {
  // Check if current item is active
  if (item.href === pathname) {
    return true;
  }

  if (item.children && item.children.length > 0) {
    return item.children.some((child) => isItemActive(child, pathname));
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
