import type { NavigationItem } from "@/types/nav.types";
import {
  BarChart3,
  // Upload,
  CheckCircle,
  // UserLock,
  // SquareDashedKanban,
} from "lucide-react";

export const NAVIGATION_CONFIG: {
  student: NavigationItem[];
  staff: NavigationItem[];
} = {
  student: [
    {
      label: "Requirements",
      href: "/student/requirements",
      icon: CheckCircle,
    },
  ],
  staff: [
    {
      label: "Dashboard",
      href: "/staff/dashboard",
      icon: BarChart3,
    },
    {
      label: "Submissions",
      href: "/staff/submissions",
      icon: CheckCircle,
    },
    // {
    //   label: "Staff Management",
    //   href: "/staff/staff-management",
    //   icon: UserLock,
    // },
    // {
    //   label: "Student Management",
    //   href: "/staff/student-management",
    //   icon: SquareDashedKanban,
    //   children: [
    //     {
    //       label: "Dashboard",
    //       href: "/staff/student-management/dashboard",
    //       icon: BarChart3,
    //     },
    //     {
    //       label: "Data Import",
    //       href: "/staff/student-management/data-import",
    //       icon: Upload,
    //     },
    //     {
    //       label: "Submissions",
    //       href: "/staff/student-management/submissions",
    //       icon: CheckCircle,
    //     },
    //   ],
    // },
  ],
};
