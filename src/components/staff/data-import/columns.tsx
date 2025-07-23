import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  IdCard,
  GraduationCap,
  Calendar,
  FileText,
  User,
  Ellipsis,
} from "lucide-react";
import DragHandle from "@/components/ui/data-table/drag-handle";
import { cn } from "@/lib/utils";
import { SearchFilterColumn } from "@/components/ui/data-table/search-filter-column";
import { FacetedFilterColumn } from "@/components/ui/data-table/faceted-filter-column";
import type {
  FileParsedTableRowStudentRecord as Record,
  StudentDataImportColumnsProps,
} from "@/types/staff/data-import.types";
import { getProgramColor } from "@/utils/staff/data-import.utils";
import { PROGRAM_OPTIONS } from "@/constants/staff/data-import.constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActionButtons from "./action-buttons";
import { getInitialsTwoInputs } from "@/utils/shared/shared.utils";

let ACADEMIC_YEARS: { value: string; label: string }[] = [];

export const columns = ({
  handleSelectRecord,
}: StudentDataImportColumnsProps): ColumnDef<Record>[] => [
  {
    id: "drag",
    header: ({ table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full flex items-center">
          <div className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 cursor-pointer border border-blue-100">
            <Ellipsis className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-fit rounded-3xl outline-none shadow-none"
          align="start"
          sideOffset={0}
        >
          <ActionButtons table={table} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => (
      <div className="bg-gray-50/80 rounded-lg p-2 flex items-center space-x-2">
        <span className="font-medium text-gray-700">No.</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-medium border border-blue-200">
          {row.getValue("id")}
        </div>
      </div>
    ),
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <SearchFilterColumn
        column={column}
        placeholder="Search by name..."
        trigger={
          <>
            <User className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Full Name
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => {
      const firstName = row.original.firstName as string;
      const lastName = row.original.lastName as string;
      const initials = getInitialsTwoInputs(firstName, lastName);
      const programCode = row.original.programCode;

      return (
        <div
          className="flex items-center space-x-2 group/underline cursor-pointer"
          onClick={() => handleSelectRecord(row.original, "edit")}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border",
              getProgramColor(programCode)
            )}
          >
            {initials}
          </div>
          <div className="relative">
            <span className="text-gray-800 font-medium transition-colors">
              {`${firstName} ${lastName}`}
            </span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 ease-out group-hover/underline:w-full" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SearchFilterColumn
        column={column}
        placeholder="Search by email..."
        trigger={
          <>
            <Mail className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Email
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg border border-blue-200 text-sm font-medium">
            {email}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => (
      <SearchFilterColumn
        column={column}
        placeholder="Search by ID..."
        trigger={
          <>
            <IdCard className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Student ID
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="text-sm font-mono bg-gray-50 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200">
          {row.getValue("studentId")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "programCode",
    header: ({ column }) => (
      <FacetedFilterColumn
        column={column}
        searchPlaceholder="Search programs..."
        options={PROGRAM_OPTIONS}
        trigger={
          <>
            <GraduationCap className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Program Code
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => {
      const programCode = row.getValue("programCode") as string;
      return (
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", getProgramColor(programCode))}
          >
            {programCode}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return Array.isArray(value) && value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "academicYear",
    header: ({ column }) => {
      const facetedValues = Array.from(
        column?.getFacetedUniqueValues().keys() || []
      ).map((value) => {
        return value as string;
      });

      ACADEMIC_YEARS = facetedValues.map((value) => ({
        value,
        label: value,
      }));

      return (
        <FacetedFilterColumn
          column={column}
          options={ACADEMIC_YEARS}
          searchPlaceholder="Search academic years..."
          trigger={
            <>
              <Calendar className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
              <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
                Academic Year
              </span>
            </>
          }
        />
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 w-full">
        <div className="text-sm font-medium text-gray-800 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
          {row.getValue("academicYear")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "sourceFile",
    header: () => (
      <div className="bg-gray-50/80 rounded-lg p-2 flex items-center space-x-2">
        <FileText className="h-4 w-4 text-gray-600" />
        <span className="font-medium text-gray-700">Source File</span>
      </div>
    ),
    cell: ({ row }) => {
      const sourceFile = row.getValue("sourceFile") as string;
      return (
        <div className="flex items-center space-x-2">
          <div
            className="text-sm text-gray-800 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200 truncate max-w-[200px] font-medium"
            title={sourceFile}
          >
            {sourceFile}
          </div>
        </div>
      );
    },
  },
];
