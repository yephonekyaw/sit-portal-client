import axiosClient from "@/services/api/client";
import { type LoginFormData } from "@/types/auth.types";
import type { ApiResponse } from "../api/types";
import { type User } from "./types";

const postLogin = async (data: LoginFormData) =>
  axiosClient
    .post<ApiResponse<User>>("/shared/auth/login", data)
    .then((res) => res.data);

const postLogout = async () =>
  axiosClient
    .post<ApiResponse<null>>("/shared/auth/logout")
    .then((res) => res.data);

const getMe = async () =>
  axiosClient.get<ApiResponse<User>>("/shared/auth/me").then((res) => res.data);

export { postLogin, postLogout, getMe };
