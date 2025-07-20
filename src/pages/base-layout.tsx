import type React from "react";
import { Navbar } from "@/components/nav/navbar";

interface BaseLayoutProps {
  includeNavbar?: boolean;
  children: React.ReactNode;
}

export default function BaseLayout({
  includeNavbar,
  children,
}: BaseLayoutProps) {
  return (
    <div className="min-h-screen">
      {includeNavbar && <Navbar />}

      {/* Main content */}
      <div className="w-full flex items-center justify-center">{children}</div>
    </div>
  );
}
