import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import type { PaginationProps } from "@/types/staff/data-import.types";

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white border-gray-200">
      <div className="hidden md:flex flex-1">
        <p className="text-sm text-gray-600 font-medium">
          <span className="text-gray-900">
            {table.getFilteredSelectedRowModel().rows.length}
          </span>{" "}
          of{" "}
          <span className="text-gray-900">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          row(s) selected
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-700">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-9 w-[75px] border-gray-200 focus:border-blue-300 focus:ring-blue-200">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="border-gray-200">
              {[30, 50, 70, 100].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="hover:bg-blue-50 focus:bg-blue-50"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center text-sm font-medium text-gray-700 px-2">
          Page{" "}
          <span className="mx-1 text-gray-900">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of <span className="ml-1 text-gray-900">{table.getPageCount()}</span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            className="hidden h-9 w-9 p-0 lg:flex border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 bg-transparent"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 bg-transparent"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 bg-transparent"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-9 w-9 p-0 lg:flex border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 bg-transparent"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
