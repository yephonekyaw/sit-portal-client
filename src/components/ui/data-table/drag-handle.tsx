import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "../button";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

// Memoized drag handle for better performance
const DragHandle = React.memo(({ id }: { id: string }) => {
  const { attributes, listeners, isDragging } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 w-8 p-0 text-gray-400 will-change-transform", // Add will-change
        "hover:text-gray-600 hover:bg-gray-50",
        "transition-colors duration-150", // Faster transition
        "cursor-grab active:cursor-grabbing",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", // Better focus states
        isDragging && "opacity-50"
      )}
    >
      <GripVertical className="h-4 w-4" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
});

DragHandle.displayName = "DragHandle";

export default DragHandle;
