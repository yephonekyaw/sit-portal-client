import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogin, postLogout } from "./apis";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/types/auth.types";
import type { ApiError, ApiResponse } from "../api/types";
import type { User } from "./types";
import { toast } from "sonner";

// useMutation<TData, TError, TVariables, TContext>

const usePostLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ApiResponse<User>, ApiError, LoginFormData>({
    mutationFn: (data) => postLogin(data),
    onSuccess: (data) => {
      toast.success(data?.message || "Login successful");
      if (data.data?.userType === "staff") {
        void navigate("/staff/student-management/dashboard");
      } else {
        void navigate("/student/certificate-submission");
      }
      void queryClient.invalidateQueries({ queryKey: ["auth-me"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed", {
        description: "Please try again later.",
      });
    },
    retry: 1,
  });
};

const usePostLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ApiResponse<null>, ApiError>({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Logout successful");
      void queryClient.clear();
      void navigate("/login");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Logout failed", {
        description: "Please try again later.",
      });
    },
    retry: 1,
  });
};

export { usePostLogin, usePostLogout };
