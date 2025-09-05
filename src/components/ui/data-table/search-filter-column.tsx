import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import { Search, Filter, X } from "lucide-react";
import type { SearchFilterColumnProps } from "@/types/data-table.types";

export function SearchFilterColumn<TData, TValue>({
  column,
  trigger,
  placeholder,
  className,
}: SearchFilterColumnProps<TData, TValue>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const filterValue = column.getFilterValue() as string | undefined;
  const hasFilter = Boolean(filterValue && filterValue.length > 0);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative group/header cursor-pointer select-none">
          {/* Main trigger content */}
          <div
            className={cn(
              "bg-gray-50/80 rounded-lg p-2 flex items-center space-x-2 transition-all duration-200",
              "hover:bg-blue-50/80 hover:border-blue-200 border border-transparent",
              "group-hover/header:shadow-sm",
              hasFilter && "bg-blue-50/90 border-blue-200 shadow-sm"
            )}
          >
            {trigger}

            {/* Search indicator */}
            <div
              className={cn(
                "flex items-center space-x-1 ml-auto opacity-0 group-hover/header:opacity-100 transition-all duration-200",
                hasFilter && "opacity-100"
              )}
            >
              {hasFilter && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
              <Search className="h-3.5 w-3.5 text-blue-500 group-hover/header:scale-110 transition-transform duration-200" />
            </div>
          </div>

          {/* Hover tooltip */}
          <div
            className={cn(
              "absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-normal px-2 py-1 rounded z-50",
              "opacity-0 group-hover/header:opacity-100 transition-all duration-200 delay-500",
              "pointer-events-none whitespace-nowrap"
            )}
          >
            Click to search this column
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "w-80 p-3 bg-white shadow-xl border-0 rounded-xl",
          className
        )}
      >
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Filter className="h-4 w-4 text-blue-500" />
            <span>Search & Filter</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={filterValue ?? ""}
              onChange={(e) => column.setFilterValue(e.target.value)}
              placeholder={placeholder ?? "Type to search..."}
              className="h-10 pl-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg"
              autoFocus
            />
          </div>

          {hasFilter && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">"{filterValue}"</span>
              <button
                onClick={() => column.setFilterValue("")}
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
                  "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900",
                  "transition-colors duration-200"
                )}
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
