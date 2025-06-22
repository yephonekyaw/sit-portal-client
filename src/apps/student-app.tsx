import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { BaseErrorFallback } from "@/components/error/base-error-fallback";

const StudentApp = () => {
  return (
    <ErrorBoundary
      FallbackComponent={BaseErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Outlet />
    </ErrorBoundary>
  );
};

export default StudentApp;
