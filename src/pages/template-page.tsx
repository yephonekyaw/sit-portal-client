import type React from "react";
import { Navbar } from "@/components/nav/navbar";

interface TemplatePageProps {
  includeNavbar?: boolean;
  children: React.ReactNode;
}

export default function TemplatePage({
  includeNavbar,
  children,
}: TemplatePageProps) {
  return (
    <div className="min-h-screen">
      {includeNavbar && <Navbar />}

      {/* Main content */}
      <div className="w-full flex items-center justify-center">{children}</div>
    </div>
  );
}
