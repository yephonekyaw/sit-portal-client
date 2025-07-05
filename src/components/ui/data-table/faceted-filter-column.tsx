import * as React from "react";
import { ListFilter, Check, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Badge } from "../badge";
import type { FacetedFilterColumnProps } from "@/types/staff/student-data-import.types";

export function FacetedFilterColumn<TData, TValue>({
  column,
  title,
  trigger,
  options,
  showSearch = true,
  searchPlaceholder = "Search options...",
}: FacetedFilterColumnProps<TData, TValue>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const facets = column?.getFacetedUniqueValues();
  const filterValue = column?.getFilterValue() as string[] | undefined;
  const selectedValues = new Set(filterValue || []);
  const hasFilter = selectedValues.size > 0;

  // Custom trigger for header integration
  const customTrigger = trigger ? (
    <div className="relative group/header cursor-pointer select-none">
      <div
        className={cn(
          "bg-gray-50/80 rounded-lg p-2 flex items-center justify-between transition-all duration-200",
          "hover:bg-blue-50/80 hover:border-blue-200 border border-transparent",
          "group-hover/header:shadow-sm min-h-[2.5rem]",
          hasFilter && "bg-blue-50/90 border-blue-200 shadow-sm"
        )}
      >
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          {trigger}
        </div>

        {/* Filter indicator - positioned to avoid overlap */}
        <div
          className={cn(
            "flex items-center space-x-1.5 ml-2 opacity-0 group-hover/header:opacity-100 transition-all duration-200 flex-shrink-0",
            hasFilter && "opacity-100"
          )}
        >
          {hasFilter && (
            <Badge
              variant="secondary"
              className="h-4 px-1.5 text-xs bg-blue-500 text-white border-0"
            >
              {selectedValues.size}
            </Badge>
          )}
          <ListFilter className="h-3.5 w-3.5 text-blue-500 group-hover/header:scale-110 transition-transform duration-200" />
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
        Click to filter by values
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  ) : (
    // Default button trigger
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-9 border-dashed bg-gray-50 text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200",
        hasFilter && "bg-blue-50 border-blue-300 text-blue-700"
      )}
    >
      <ListFilter className="mr-2 h-4 w-4 text-blue-600" />
      {title}
      {hasFilter && (
        <>
          <div className="mx-2 h-4 w-px bg-gray-300" />
          <Badge
            variant="secondary"
            className="rounded-sm px-1.5 py-0.5 font-normal bg-blue-500 text-white border-0"
          >
            {selectedValues.size}
          </Badge>
        </>
      )}
    </Button>
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{customTrigger}</PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0 border-0 shadow-xl rounded-xl"
        align="start"
        sideOffset={4}
      >
        <Command className="rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-white">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter {title || "Options"}
              </span>
            </div>
            {hasFilter && (
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-600 border-blue-200 text-xs"
              >
                {selectedValues.size} selected
              </Badge>
            )}
          </div>

          {/* Search input */}
          {showSearch && <CommandInput placeholder={searchPlaceholder} />}

          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty className="p-6 text-center text-gray-500 text-sm">
              No options found.
            </CommandEmpty>

            <CommandGroup className="p-2 space-y-1">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                const count = facets?.get(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newSelectedValues = new Set(selectedValues);
                      if (isSelected) {
                        newSelectedValues.delete(option.value);
                      } else {
                        newSelectedValues.add(option.value);
                      }
                      const filterValues = Array.from(newSelectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className={cn(
                      "cursor-pointer rounded-lg px-2 py-2.5 transition-all duration-150 flex items-center",
                      "hover:bg-blue-50 hover:text-blue-800",
                      isSelected && "bg-blue-50 text-blue-800"
                    )}
                  >
                    {/* Checkbox */}
                    <div
                      className={cn(
                        "mr-3 flex h-4 w-4 items-center justify-center rounded border-2 transition-all duration-150 flex-shrink-0",
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-gray-300 hover:border-blue-400"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3 w-3 transition-all duration-150 text-white",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>

                    {/* Icon */}
                    {option.icon && (
                      <option.icon
                        className={cn(
                          "mr-2 h-4 w-4 flex-shrink-0",
                          isSelected ? "text-blue-600" : "text-gray-500",
                          option.className
                        )}
                      />
                    )}

                    {/* Label */}
                    <span
                      className={cn(
                        "text-sm flex-1 min-w-0 truncate",
                        isSelected
                          ? "font-medium text-blue-800"
                          : "text-gray-800"
                      )}
                    >
                      {option.label}
                    </span>

                    {/* Count badge */}
                    {count && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2 h-5 px-1.5 text-xs font-medium flex-shrink-0",
                          isSelected
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        )}
                      >
                        {count}
                      </Badge>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {/* Clear filters section */}
            {hasFilter && (
              <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                <Badge
                  variant="outline"
                  onClick={() => {
                    column?.setFilterValue(undefined);
                    setIsOpen(false);
                  }}
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 hover:border-red-300 transition-all duration-150 justify-center"
                >
                  <X className="mr-2 h-3.5 w-3.5" />
                  Clear all filters
                </Badge>
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
