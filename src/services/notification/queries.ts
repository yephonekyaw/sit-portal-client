import { useQuery } from "@tanstack/react-query";
import { getUnreadNotifications, getUnreadCount } from "./apis";

export const useGetUnreadNotifications = (
  limit: number = 50,
  offset: number = 0,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: ["notifications", "unread", limit, offset],
    queryFn: () => getUnreadNotifications(limit, offset),
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

export const useGetUnreadCount = (enabled: boolean = true) =>
  useQuery({
    queryKey: ["notifications", "unread", "count"],
    queryFn: getUnreadCount,
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });
