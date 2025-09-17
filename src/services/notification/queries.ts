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
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // 30 seconds
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

export const useGetUnreadCount = (enabled: boolean = true) =>
  useQuery({
    queryKey: ["notifications", "unread", "count"],
    queryFn: getUnreadCount,
    enabled,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // 30 seconds
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });
