import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import type { SortFilterColumnProps } from "@/types/staff/data-import.types";

export function SortFilterColumn<TData, TValue>({
  column,
  title,
  className,
  ...props
}: SortFilterColumnProps<TData, TValue>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const sortDirection = column.getIsSorted();
  const canSort = column.getCanSort();
  // const canHide = column.getCanHide();

  // If column can't be sorted, render simple header
  if (!canSort) {
    return (
      <div className={cn("font-medium text-gray-700", className)} {...props}>
        {title}
      </div>
    );
  }

  const getSortIcon = () => {
    if (sortDirection === "desc") {
      return <ArrowDown className="h-3.5 w-3.5 text-blue-500" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="h-3.5 w-3.5 text-blue-500" />;
    }
    return (
      <ChevronsUpDown className="h-3.5 w-3.5 text-gray-400 group-hover/header:text-blue-500 transition-colors duration-200" />
    );
  };

  const getSortLabel = () => {
    if (sortDirection === "desc") return "Sorted descending";
    if (sortDirection === "asc") return "Sorted ascending";
    return "Click to sort";
  };

  return (
    <div className="relative group/header">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "bg-gray-50/80 rounded-lg p-2 flex items-center justify-between cursor-pointer select-none transition-all duration-200",
              "hover:bg-blue-50/80 hover:border-blue-200 border border-transparent",
              "group-hover/header:shadow-sm",
              sortDirection && "bg-blue-50/90 border-blue-200 shadow-sm",
              className
            )}
            {...props}
          >
            {/* Title and sort indicator */}
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">{title}</span>
              {sortDirection && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Sort icon */}
            <div className="flex items-center">{getSortIcon()}</div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-48 bg-white shadow-xl border-0 rounded-xl p-1"
        >
          <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100 mb-1">
            Sort Options
          </div>

          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="cursor-pointer hover:bg-blue-50 rounded-lg mx-1 px-3 py-2"
          >
            <div className="flex items-center space-x-3">
              <ArrowUp className="h-4 w-4 text-blue-500" />
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">
                  Sort Ascending
                </span>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="cursor-pointer hover:bg-blue-50 rounded-lg mx-1 px-3 py-2"
          >
            <div className="flex items-center space-x-3">
              <ArrowDown className="h-4 w-4 text-blue-500" />
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">
                  Sort Descending
                </span>
              </div>
            </div>
          </DropdownMenuItem>

          {sortDirection && (
            <>
              <DropdownMenuSeparator className="my-1 bg-gray-100" />
              <DropdownMenuItem
                onClick={() => column.clearSorting()}
                className="cursor-pointer hover:bg-gray-50 rounded-lg mx-1 px-3 py-2"
              >
                <div className="flex items-center space-x-3">
                  <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-600">Clear Sort</span>
                </div>
              </DropdownMenuItem>
            </>
          )}

          {/* {canHide && (
            <>
              <DropdownMenuSeparator className="my-1 bg-gray-100" />
              <DropdownMenuItem
                onClick={() => column.toggleVisibility(false)}
                className="cursor-pointer hover:bg-red-50 rounded-lg mx-1 px-3 py-2"
              >
                <div className="flex items-center space-x-3">
                  <EyeOff className="h-4 w-4 text-red-500" />
                  <span className="font-medium text-red-600">Hide Column</span>
                </div>
              </DropdownMenuItem>
            </>
          )} */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hover tooltip */}
      <div
        className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-normal px-2 py-1 rounded z-50",
          "opacity-0 group-hover/header:opacity-100 transition-all duration-200 delay-500",
          "pointer-events-none whitespace-nowrap"
        )}
      >
        {getSortLabel()}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  );
}
