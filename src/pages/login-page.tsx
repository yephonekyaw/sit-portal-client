import React, { useCallback } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { toast } from "sonner";

import { MouseSpotlight } from "@/components/login/mouse-spot-light";
import { DotGrid } from "@/components/login/dot-grid";
import { FloatingElements } from "@/components/login/floating-elements";
import { UniversityLogo } from "@/components/login/university-logo";
import { LoginForm } from "@/components/login/login-form";
import { HelpLinks } from "@/components/login/help-links";

const LoginPage: React.FC = () => {
  const mousePosition = useMousePosition();

  const handleLogin = useCallback(
    async (email: string, password: string, rememberMe: boolean) => {
      console.log("Login attempt:", { email, password: "***", rememberMe });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email && password) {
        toast.success("Login successful!", {
          description: "Welcome back to SIT Portal",
        });
        console.log("Redirecting to dashboard...");
      } else {
        toast.error("Login failed", {
          description: "Please check your credentials and try again.",
        });
      }
    },
    []
  );

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-500">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse [animation-delay:0.5s]" />
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <MouseSpotlight mousePosition={mousePosition} />
        <DotGrid mousePosition={mousePosition} />
      </div>

      <FloatingElements />

      <div className="relative z-10 w-full max-w-md">
        <UniversityLogo />
        <LoginForm onLogin={handleLogin} />
        <HelpLinks />
      </div>
    </div>
  );
};

export default LoginPage;
