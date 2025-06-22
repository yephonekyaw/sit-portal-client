import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMousePosition } from "@/hooks/use-mouse-position";
import React, { Suspense, lazy, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MouseSpotlight = lazy(() =>
  import("@/components/login/mouse-spot-light").then((module) => ({
    default: module.MouseSpotlight,
  }))
);
const DotGrid = lazy(() =>
  import("@/components/login/dot-grid").then((module) => ({
    default: module.DotGrid,
  }))
);
const FloatingElements = lazy(() =>
  import("@/components/login/floating-elements").then((module) => ({
    default: module.FloatingElements,
  }))
);
const UniversityLogo = lazy(() =>
  import("@/components/login/university-logo").then((module) => ({
    default: module.UniversityLogo,
  }))
);
const LoginForm = lazy(() =>
  import("@/components/login/login-form").then((module) => ({
    default: module.LoginForm,
  }))
);
const HelpLinks = lazy(() =>
  import("@/components/login/help-links").then((module) => ({
    default: module.HelpLinks,
  }))
);

const LoginPage: React.FC = () => {
  const mousePosition = useMousePosition();

  const handleMicrosoftLogin = useCallback(() => {
    console.log("Redirecting to Microsoft authentication...");
    // Add actual Microsoft authentication logic here
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center p-6">
      {/* Light mode overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 opacity-100 dark:opacity-0 transition-opacity duration-500"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <ErrorBoundary
          fallback={<div className="hidden" />}
          onError={(error) =>
            console.warn("MouseSpotlight failed to load:", error)
          }
        >
          <Suspense fallback={null}>
            <MouseSpotlight mousePosition={mousePosition} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<div className="hidden" />}
          onError={(error) => console.warn("DotGrid failed to load:", error)}
        >
          <Suspense fallback={null}>
            <DotGrid mousePosition={mousePosition} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Floating Elements */}
      <ErrorBoundary
        fallback={<div className="hidden" />}
        onError={(error) =>
          console.warn("FloatingElements failed to load:", error)
        }
      >
        <Suspense fallback={null}>
          <FloatingElements />
        </Suspense>
      </ErrorBoundary>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        <ErrorBoundary
          fallback={
            <div className="text-center mb-8 text-gray-900 dark:text-white">
              University Portal
            </div>
          }
          onError={(error) =>
            console.warn("UniversityLogo failed to load:", error)
          }
        >
          <Suspense fallback={<LoadingSpinner />}>
            <UniversityLogo />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          FallbackComponent={({ resetErrorBoundary }) => (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-2xl rounded-lg p-6 text-center">
              <p className="text-gray-900 dark:text-white mb-4">
                Login form failed to load
              </p>
              <button
                onClick={resetErrorBoundary}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
          onError={(error) => console.error("LoginForm failed to load:", error)}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <LoginForm onMicrosoftLogin={handleMicrosoftLogin} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<div className="hidden" />}
          onError={(error) => console.warn("HelpLinks failed to load:", error)}
        >
          <Suspense fallback={null}>
            <HelpLinks />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default LoginPage;
