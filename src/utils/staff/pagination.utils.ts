/**
 * Generic pagination utility that works with any array type
 */
export const applyPagination = <T>(
  items: T[],
  page: number,
  pageSize: number
): T[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
};

/**
 * Calculate pagination metadata
 */
export const calculatePaginationMeta = (
  totalItems: number,
  currentPage: number,
  pageSize: number
) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  return {
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
};