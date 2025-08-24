import {
  FileText,
  Search,
  Filter,
  X,
  Settings2,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SUBMISSION_FILTER_OPTIONS } from "@/constants/student/submission.constants";
import { useSubmissionFilters } from "@/stores/student/certificate-submissions.store";

interface PageHeaderProps {
  filteredCount: number;
  totalCount: number;
}

const PageHeader = ({ filteredCount, totalCount }: PageHeaderProps) => {
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const { filters, setFilters, clearFilters } = useSubmissionFilters();

  const hasActiveFilters = filters.search || filters.status !== "all";

  return (
    <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-[1rem] space-y-6">
      {/* Title Section */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-blue-900">
            Certificate Submissions
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Submit and track your required certificates for program completion.
          </p>
        </div>
      </div>

      {/* Filtering Section */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="search"
            placeholder="Search by certificate name or code..."
            className="pl-10 bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-200 text-sm h-10"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>

            {/* Filter Popover */}
            <Popover
              open={isFilterPopoverOpen}
              onOpenChange={setIsFilterPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-blue-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 text-xs"
                >
                  <Settings2 className="h-4 w-4" />
                  Configure Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 bg-white border-blue-200"
                align="start"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-gray-900">
                      Filter Options
                    </h4>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700 h-auto p-1"
                        onClick={clearFilters}
                        title="Clear all filters"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700 h-auto p-1"
                        onClick={() => setIsFilterPopoverOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Select
                      value={filters.status}
                      onValueChange={(status) =>
                        setFilters({ status: status as typeof filters.status })
                      }
                    >
                      <SelectTrigger className="w-full bg-white border-gray-200 text-sm">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBMISSION_FILTER_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Results Summary */}
          <div className="text-xs text-gray-600">
            Showing {filteredCount} of {totalCount} requirements
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Status filter */}
            {filters.status !== "all" && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
              >
                Status:{" "}
                {
                  SUBMISSION_FILTER_OPTIONS.find(
                    (opt) => opt.value === filters.status
                  )?.label
                }
              </Badge>
            )}

            {/* Search filter */}
            {filters.search && (
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200"
              >
                Search: "{filters.search}"
                <X
                  className="ml-1 h-3 w-3 cursor-pointer hover:text-orange-600"
                  onClick={() => setFilters({ search: "" })}
                />
              </Badge>
            )}

            {/* Clear All Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-7 px-2"
              onClick={clearFilters}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
