import React from "react";
import { flexRender, type Row } from "@tanstack/react-table";
import { TableCell, TableRow } from "./table";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";

const DraggableRow = <TData extends { id: string }>({
  row,
}: {
  row: Row<TData>;
}) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  // Fixed transform style calculation
  const style = React.useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition: transition,
    }),
    [transform, transition]
  );

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className={cn(
        "group relative will-change-transform", // Add will-change for GPU acceleration
        "hover:bg-gray-50/50 transition-colors duration-150", // Faster transition
        "data-[state=selected]:bg-blue-50/50",
        isDragging && [
          "bg-white shadow-lg shadow-gray-200/30",
          "border border-gray-200 rounded-md z-50",
        ]
      )}
      style={style}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className="py-3 px-4 text-sm text-gray-900 border-b border-gray-100"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

DraggableRow.displayName = "DraggableRow";

export default DraggableRow;
