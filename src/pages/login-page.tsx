import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMousePosition } from "@/hooks/use-mouse-position";
import React, { Suspense, lazy, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Lazy loaded components
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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Combined background with all effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-500">
        {/* Floating animated orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse [animation-delay:0.5s]" />
        </div>
      </div>

      {/* Interactive background effects */}
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
            <div className="text-center mb-8 text-gray-900">
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
            <div className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-lg p-6 text-center">
              <p className="text-gray-900 mb-4">
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
