import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmissionsPagination } from "@/stores/staff/submissions-filter.stores";

export function SubmissionsPagination() {
  const { pagination, setPage, setPageSize } = useSubmissionsPagination();

  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;
  const pageSize = pagination.pageSize;
  const totalItems = pagination.totalItems;

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleFirstPage = () => setPage(1);
  const handlePreviousPage = () => setPage(Math.max(1, currentPage - 1));
  const handleNextPage = () => setPage(Math.min(totalPages, currentPage + 1));
  const handleLastPage = () => setPage(totalPages);
  const handlePageSizeChange = (newSize: string) =>
    setPageSize(parseInt(newSize, 10));

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-t border-gray-200 rounded-b-2xl">
      <div className="hidden md:flex flex-1">
        <p className="text-sm text-gray-600 font-medium">
          Showing{" "}
          <span className="text-gray-900">
            {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
          </span>
          -
          <span className="text-gray-900">
            {Math.min(currentPage * pageSize, totalItems)}
          </span>{" "}
          of <span className="text-gray-900">{totalItems}</span> submission(s)
        </p>
      </div>

      <div className="flex items-center space-x-6">
        {/* Rows per page selector */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-700">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-9 w-[75px] border-gray-200 focus:border-blue-300 focus:ring-blue-200">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="border-gray-200">
              {[24, 36, 48, 60].map((size) => (
                <SelectItem
                  key={size}
                  value={`${size}`}
                  className="hover:bg-blue-50 focus:bg-blue-50"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="flex items-center justify-center text-sm font-medium text-gray-700 px-2">
          Page <span className="mx-1 text-gray-900">{currentPage}</span> of{" "}
          <span className="ml-1 text-gray-900">{totalPages}</span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            className="hidden h-9 w-9 p-0 lg:flex border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 bg-transparent"
            disabled={!canGoPrevious}
            onClick={handleFirstPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 bg-transparent"
            disabled={!canGoPrevious}
            onClick={handlePreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 bg-transparent"
            disabled={!canGoNext}
            onClick={handleNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-9 w-9 p-0 lg:flex border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 bg-transparent"
            disabled={!canGoNext}
            onClick={handleLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
