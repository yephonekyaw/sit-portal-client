import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  mainValue: number;
  icon: LucideIcon;
  breakdowns: Array<{
    label: string;
    value: number;
    percentage: number;
  }>;
  colorPalette: readonly string[];
}
