import type { NavigationItem } from "@/types/nav.types";
import {
  FileText,
  BarChart3,
  Upload,
  CheckCircle,
  UserLock,
  SquareDashedKanban,
} from "lucide-react";

export const NAVIGATION_CONFIG: {
  student: NavigationItem[];
  staff: NavigationItem[];
} = {
  student: [
    {
      label: "Certificate Submission",
      href: "/student/certificate-submission",
      icon: Upload,
    },
  ],
  staff: [
    {
      label: "Dashboard",
      href: "/staff/dashboard",
      icon: BarChart3,
    },
    {
      label: "Staff Management",
      href: "/staff/staff-management",
      icon: UserLock,
    },
    {
      label: "Student Management",
      href: "/staff/student-management",
      icon: SquareDashedKanban,
      children: [
        {
          label: "Data Import",
          href: "/staff/student-management/data-import",
          icon: Upload,
        },
        {
          label: "Certificate Verification",
          href: "/staff/student-management/certificate-verification",
          icon: CheckCircle,
        },
        {
          label: "Program Requirements",
          href: "/staff/student-management/program-requirements",
          icon: FileText,
        },
      ],
    },
  ],
};
