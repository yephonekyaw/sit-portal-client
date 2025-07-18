import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { BaseErrorFallback } from "@/components/error/base-error-fallback";
import TemplatePage from "@/pages/template-page";
import { useNavConfigStore } from "@/stores/nav.stores";

const StudentApp = () => {
  const setNavRole = useNavConfigStore((state) => state.setNavRole);

  useEffect(() => {
    setNavRole("student");
  }, [setNavRole]);

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
