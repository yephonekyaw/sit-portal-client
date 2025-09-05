import { MoreHorizontal, Trash2, Pencil, Eye } from "lucide-react";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import type { RowActionsProps } from "@/types/data-table.types";

export function RowActions<TData>({
  row,
  onView,
  onEdit,
  onDelete,
}: RowActionsProps<TData>) {
  const hasActions = onView || onEdit || onDelete;

  if (!hasActions) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-gray-100 text-gray-500 hover:text-gray-900"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] bg-white">
          {onView && (
            <DropdownMenuItem
              onClick={() => onView(row.original)}
              className="group cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4 text-gray-500 group-hover:text-blue-600" />
              <span className="text-sm text-gray-800 group-hover:text-blue-600">
                View Details
              </span>
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem
              onClick={() => onEdit(row.original)}
              className="group cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4 text-gray-500 group-hover:text-green-600" />
              <span className="text-sm text-gray-800 group-hover:text-green-600">
                Edit Record
              </span>
            </DropdownMenuItem>
          )}
          {(onView || onEdit) && onDelete && <DropdownMenuSeparator />}
          {onDelete && (
            <DropdownMenuItem
              onClick={() => onDelete(row.original)}
              className="group cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4 text-gray-500 group-hover:text-red-600" />
              <span className="text-sm text-gray-800 group-hover:text-red-600">
                Delete
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
