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
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-screen lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}
