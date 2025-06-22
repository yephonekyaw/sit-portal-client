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

      {/* Background with all effects combined */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-fuchsia-950/30 transition-colors duration-500">
        {/* Floating animated orbs */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-300/20 dark:bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-300/20 dark:bg-violet-500/10 rounded-full blur-3xl animate-pulse [animation-delay:0.5s]" />
        </div>
      </div>

      {/* Main content */}
      <div className="w-full flex items-center justify-center">{children}</div>
    </div>
  );
}
