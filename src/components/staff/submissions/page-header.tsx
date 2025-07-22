import {
  CheckCircle,
  Search,
  Filter,
  BarChart3,
  X,
  Settings2,
} from "lucide-react";
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

const PageHeader = ({
  setStatsDrawerOpen,
}: {
  setStatsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
            placeholder="Search by student name, email, roll number, or file name..."
            className="pl-10 bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-200 text-sm h-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          {/* Filter Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white border-blue-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 text-sm"
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700 h-auto p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Academic Year Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Academic Year
                  </label>
                  <Select>
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
                    Program
                  </label>
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-sm">
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS-BSc">Computer Science</SelectItem>
                      <SelectItem value="SE-BSc">
                        Software Engineering
                      </SelectItem>
                      <SelectItem value="DS-BSc">Data Science</SelectItem>
                      <SelectItem value="IT-BSc">
                        Information Technology
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
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

                {/* Certificate Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Certificate Type
                  </label>
                  <Select>
                    <SelectTrigger className="w-full bg-white border-gray-200 text-sm">
                      <SelectValue placeholder="Select certificate type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CITI_RCR_CERT">
                        RCR Certificate
                      </SelectItem>
                      <SelectItem value="ETHICS_CERT">
                        Ethics Certificate
                      </SelectItem>
                      <SelectItem value="SAFETY_CERT">
                        Safety Certificate
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Clear All
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active Filters Display */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
          >
            Academic Year: 2024
            <X className="ml-1 h-3 w-3 cursor-pointer hover:text-blue-600" />
          </Badge>
          <Badge
            variant="secondary"
            className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
          >
            Program: Computer Science
            <X className="ml-1 h-3 w-3 cursor-pointer hover:text-purple-600" />
          </Badge>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
          >
            Status: Approved
            <X className="ml-1 h-3 w-3 cursor-pointer hover:text-green-600" />
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
