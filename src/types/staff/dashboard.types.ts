import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface CardBaseProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  createdAt: string;
  updatedAt: string;
}

interface CardHeaderSectionProps {
  title: string;
  codes: string[];
  isActive: boolean;
  onEdit?: () => void;
  onArchive?: () => void;
  onClickVerify?: () => void;
}

interface CardInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  className?: string;
}

interface CardInfoSectionProps {
  children: ReactNode;
}

interface ExpandableCardContentProps {
  title: string;
  subtitle: string;
  content: string;
  value: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  maxHeight?: string;
}

export type {
  CardBaseProps,
  CardFooterProps,
  CardHeaderSectionProps,
  CardInfoItemProps,
  CardInfoSectionProps,
  ExpandableCardContentProps,
};
