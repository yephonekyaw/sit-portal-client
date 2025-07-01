import {
  FileText,
  Settings,
  BarChart3,
  HelpCircle,
  Info,
  Upload,
  CheckCircle,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  children?: NavigationItem[];
}

export const navigationConfig: {
  student: NavigationItem[];
  staff: NavigationItem[];
  help: NavigationItem[];
} = {
  student: [
    {
      title: "Dashboard",
      href: "/student/dashboard",
      icon: FileText,
    },
    {
      title: "Submit Certificates",
      href: "/student/submit",
      icon: Upload,
    },
    {
      title: "Verification Status",
      href: "/student/status",
      icon: CheckCircle,
    },
  ],
  staff: [
    {
      title: "Dashboard",
      href: "/staff/dashboard",
      icon: BarChart3,
    },
    {
      title: "Student Management",
      href: "/staff/students",
      icon: Users,
      children: [
        {
          title: "Upload Student List",
          href: "/staff/upload-students",
          icon: Upload,
        },
        {
          title: "View All Students",
          href: "/staff/students/list",
          icon: Users,
        },
      ],
    },
    {
      title: "Certificate Verification",
      href: "/staff/verification",
      icon: CheckCircle,
      children: [
        {
          title: "Pending Verification",
          href: "/staff/verification/pending",
          icon: CheckCircle,
        },
        {
          title: "Verification History",
          href: "/staff/verification/history",
          icon: FileText,
        },
      ],
    },
    {
      title: "Reports",
      href: "/staff/reports",
      icon: FileText,
      children: [
        {
          title: "Analytics Dashboard",
          href: "/staff/reports/analytics",
          icon: BarChart3,
        },
        {
          title: "Export Data",
          href: "/staff/reports/export",
          icon: FileText,
        },
      ],
    },
    {
      title: "Settings",
      href: "/staff/settings",
      icon: Settings,
      children: [
        {
          title: "General Settings",
          href: "/staff/settings/general",
          icon: Settings,
        },
        {
          title: "User Management",
          href: "/staff/settings/users",
          icon: Users,
        },
        {
          title: "Security",
          href: "/staff/settings/security",
          icon: Settings,
        },
      ],
    },
  ],
  help: [
    {
      title: "Help & Support",
      href: "/help",
      icon: HelpCircle,
    },
    {
      title: "About",
      href: "/about",
      icon: Info,
    },
  ],
};
