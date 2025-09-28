import { useGetMeQuery } from "@/services/auth/queries";
import type { UserType } from "@/services/auth/types";
import { isAxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface RouteProtectProps {
  types: UserType[];
  children: React.ReactNode;
}

const RouteProtect = ({ types, children }: RouteProtectProps) => {
  const { data: user, isLoading, error } = useGetMeQuery();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasType, setHasType] = useState<boolean | null>(null);

  // Use refs to track if we've already shown toasts to prevent duplicates
  const hasShownAuthError = useRef(false);
  const hasShownLoginError = useRef(false);
  const hasShownPermissionError = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    if (user && user.data) {
      setIsAuthenticated(true);
      setHasType(types.includes(user.data.userType as UserType));
      // Reset error flags on successful auth
      hasShownAuthError.current = false;
      hasShownLoginError.current = false;
      hasShownPermissionError.current = false;
    } else {
      setIsAuthenticated(false);
      setHasType(false);
    }
  }, [user, types, isLoading]);

  // Handle authentication errors with useEffect
  useEffect(() => {
    if (
      isAxiosError(error) &&
      error.status === 401 &&
      !hasShownAuthError.current
    ) {
      hasShownAuthError.current = true;
      toast.dismiss();
      toast.error("Session expired", {
        description: "Please log in again to continue.",
      });
    }
  }, [error]);

  // Handle not authenticated case with useEffect
  useEffect(() => {
    if (isAuthenticated === false && !hasShownLoginError.current) {
      hasShownLoginError.current = true;
      toast.dismiss();
      toast.error("You must be logged in to access this page", {
        description: "Please log in to continue.",
      });
    }
  }, [isAuthenticated]);

  // Handle permission errors with useEffect
  useEffect(() => {
    if (
      isAuthenticated === true &&
      hasType === false &&
      !hasShownPermissionError.current
    ) {
      hasShownPermissionError.current = true;
      toast.dismiss();
      toast.error("You do not have permission to access this page", {
        description: "Please contact support if you believe this is an error.",
      });
    }
  }, [isAuthenticated, hasType]);

  // Show loading while authenticating
  if (isLoading || isAuthenticated === null || hasType === null) {
    return null;
  }

  // Handle authentication errors
  if (isAxiosError(error) && error.status === 401) {
    // return <Navigate to="/login" state={{ from: location }} replace />;
    window.location.href = import.meta.env.VITE_BASE_LOGIN_URL;
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // return <Navigate to="/login" state={{ from: location }} replace />;
    window.location.href = import.meta.env.VITE_BASE_LOGIN_URL;
    return null;
  }

  // Redirect to 404 if user doesn't have required type
  if (!hasType) {
    return <Navigate to="*" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default RouteProtect;
