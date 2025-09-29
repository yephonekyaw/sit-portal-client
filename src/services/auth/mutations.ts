import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogin, postLogout } from "./apis";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/types/auth.types";
import type { ApiError, ApiResponse } from "../api/types";
import type { User } from "./types";
import { toast } from "sonner";
import { useZustandStoreClear } from "@/hooks/use-zustand-store-clear";

// useMutation<TData, TError, TVariables, TContext>

const usePostLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ApiResponse<User>, ApiError, LoginFormData>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      toast.success(data?.message || "Login successful");
      if (data.data?.userType === "staff") {
        void navigate("/staff/dashboard");
      } else {
        void navigate("/student/requirements");
      }
      void queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
    retry: 1,
  });
};

const usePostLogout = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { clearAllStores } = useZustandStoreClear();

  return useMutation<ApiResponse<null>, ApiError>({
    mutationFn: postLogout,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Logout successful");
      clearAllStores();
      void queryClient.clear();
      // void navigate("/login");
      window.location.href = import.meta.env.VITE_BASE_LANDING_URL;
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Logout failed");
    },
    retry: 1,
  });
};

export { usePostLogin, usePostLogout };
