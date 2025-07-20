import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { BaseErrorFallback } from "@/components/error/base-error-fallback";
import { useNavConfigStore } from "@/stores/nav.stores";
import BaseLayout from "@/pages/base-layout";

const StaffApp = () => {
  const setNavRole = useNavConfigStore((state) => state.setNavRole);

  useEffect(() => {
    setNavRole("staff");
  }, [setNavRole]);

  return (
    <ErrorBoundary
      FallbackComponent={BaseErrorFallback}
      onReset={() => window.location.reload()}
    >
      <BaseLayout includeNavbar>
        <Outlet />
      </BaseLayout>
    </ErrorBoundary>
  );
};
export default StaffApp;
