import type { Column, ColumnDef, Row, Table } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  onDataChange?: (newData: TData[]) => void;
}

export interface FacetedFilterColumnProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  trigger?: React.ReactNode;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  }[];
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export interface ActionButtonsProps<TData> {
  table: Table<TData>;
}

export interface RowActionsProps<TData> {
  row: Row<TData>;
  onView?: (row: TData) => void;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
}

export interface SearchFilterColumnProps<TData, TValue> {
  column: Column<TData, TValue>;
  trigger: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export interface SortFilterColumnProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export interface PaginationProps<TData> {
  table: Table<TData>;
}
