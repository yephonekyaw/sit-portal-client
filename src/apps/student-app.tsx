import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { BaseErrorFallback } from "@/components/error/base-error-fallback";
import TemplatePage from "@/pages/template-page";

const StudentApp = () => {
  return (
    <ErrorBoundary
      FallbackComponent={BaseErrorFallback}
      onReset={() => window.location.reload()}
    >
      <TemplatePage includeNavbar>
        <Outlet />
      </TemplatePage>
    </ErrorBoundary>
  );
};

export default StudentApp;
