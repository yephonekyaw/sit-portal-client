import type { NavRole, NavState } from "@/types/nav.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNavConfigStore = create<NavState>()(
  persist(
    (set) => ({
      currentRole: "student",
      setNavRole: (role: NavRole) => {
        set({ currentRole: role });
      },
    }),
    {
      name: "nav-config-storage", // unique name for the storage
      partialize: (state) => ({ currentRole: state.currentRole }),
    }
  )
);
