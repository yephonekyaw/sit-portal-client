import {
  CheckCircle,
  Search,
  Filter,
  BarChart3,
  X,
  Settings2,
  RotateCcw,
  FileCheck,
  FileX,
  View,
} from "lucide-react";
import {
  useSubmissionsFilters,
  useDebouncedSearch,
} from "@/stores/staff/submissions-filter.stores";
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
import type { SubmissionStatus } from "@/types/staff/submission.types";

const PageHeader = ({
  setStatsDrawerOpen,
}: {
  setStatsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    filters,
    setViewMode,
    setAcademicYear,
    setRequirementScheduleId,
    setStatus,
    clearAllFilters,
  } = useSubmissionsFilters();

  const debouncedSetSearch = useDebouncedSearch();
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  return (
    <header className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-[1rem] space-y-6">
      {/* Title Section */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <CheckCircle className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-blue-900">Submissions</h1>
          <p className="mt-1 text-sm text-gray-600">
            View and manage all student submissions for the program
            requirements.
          </p>
        </div>
        <Button
          variant="outline"
          size="default"
          className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
          onClick={() => setStatsDrawerOpen(true)}
        >
          <BarChart3 className="h-4 w-4" />
          Statistics
        </Button>
      </div>

      {/* Filtering Section */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by student name, email, or roll number..."
            className="pl-10 bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-200 text-sm h-10"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              debouncedSetSearch(e.target.value || undefined);
            }}
          />
        </div>

        {/* Filter Controls */}
        <div className="grid gird-cols-1 sm:grid-cols-2 gap-1">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>
            </div>

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
                        onClick={() => {
                          clearAllFilters();
                          setSearchInput("");
                        }}
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

                  {/* Academic Year Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Academic Year
                    </label>
                    <Select
                      value={filters.academicYear}
                      onValueChange={setAcademicYear}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-200 text-sm">
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Program Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Requirement Schedule
                    </label>
                    <Select
                      value={filters.requirementScheduleId || "all"}
                      onValueChange={(value) =>
                        setRequirementScheduleId(
                          value === "all" ? undefined : value
                        )
                      }
                    >
                      <SelectTrigger className="w-full bg-white border-gray-200 text-sm">
                        <SelectValue placeholder="Select requirement schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Schedules</SelectItem>
                        <SelectItem value="req_schedule_1">
                          Fall 2024 - CS Program
                        </SelectItem>
                        <SelectItem value="req_schedule_2">
                          Spring 2024 - CS Program
                        </SelectItem>
                        <SelectItem value="req_schedule_3">
                          Fall 2024 - IT Program
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-medium ${
                        filters.viewMode === "unsubmitted"
                          ? "text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      Status
                    </label>
                    <Select
                      value={
                        filters.viewMode === "unsubmitted"
                          ? "all"
                          : filters.status || "all"
                      }
                      onValueChange={(value) =>
                        setStatus(
                          filters.viewMode === "unsubmitted" || value === "all"
                            ? undefined
                            : (value as SubmissionStatus)
                        )
                      }
                      disabled={filters.viewMode === "unsubmitted"}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-200 text-sm">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="approved">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Approved
                          </div>
                        </SelectItem>
                        <SelectItem value="pending">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            Pending
                          </div>
                        </SelectItem>
                        <SelectItem value="rejected">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            Rejected
                          </div>
                        </SelectItem>
                        <SelectItem value="manual_review">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            Manual Review
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="flex items-center gap-2">
              <View className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">View:</span>
            </div>
            <div className="inline-flex rounded-lg border border-blue-200 bg-white p-1 gap-1">
              <button
                onClick={() => setViewMode("submitted")}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  filters.viewMode === "submitted"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <FileCheck className="h-3.5 w-3.5" />
                Submitted
              </button>
              <button
                onClick={() => setViewMode("unsubmitted")}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  filters.viewMode === "unsubmitted"
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <FileX className="h-3.5 w-3.5" />
                Unsubmitted
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Academic Year is always shown */}
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
          >
            Academic Year: {filters.academicYear}
          </Badge>

          {/* Requirement Schedule filter */}
          {filters.requirementScheduleId && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
            >
              Schedule: {filters.requirementScheduleId}
              <X
                className="ml-1 h-3 w-3 cursor-pointer hover:text-purple-600"
                onClick={() => setRequirementScheduleId(undefined)}
              />
            </Badge>
          )}

          {/* Status filter */}
          {filters.status && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
            >
              Status:{" "}
              {filters.status.charAt(0).toUpperCase() +
                filters.status.slice(1).replace("_", " ")}
              <X
                className="ml-1 h-3 w-3 cursor-pointer hover:text-green-600"
                onClick={() => setStatus(undefined)}
              />
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
                onClick={() => {
                  debouncedSetSearch(undefined);
                  setSearchInput("");
                }}
              />
            </Badge>
          )}

          {/* Clear All Button - only show if there are active filters */}
          {(filters.requirementScheduleId ||
            filters.status ||
            filters.search) && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-7 px-2"
              onClick={() => {
                clearAllFilters();
                setSearchInput("");
              }}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
