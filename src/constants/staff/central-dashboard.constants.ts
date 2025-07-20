import {
  FileBadge,
  GraduationCap,
  ClipboardList,
  Calendar,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    id: "prog",
    label: "Programs",
    icon: GraduationCap,
    href: "programs",
  },
  {
    id: "cert",
    label: "Certificates",
    icon: FileBadge,
    href: "certificates",
  },
  {
    id: "reqs",
    label: "Requirements",
    icon: ClipboardList,
    href: "requirements",
  },
  {
    id: "sche",
    label: "Schedules",
    icon: Calendar,
    href: "schedules",
  },
];
