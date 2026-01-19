import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isHydrated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  setIsHydrated: (isHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isHydrated: false,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
      isAuthenticated: () => !!get().token,
      setIsHydrated: (isHydrated) => set({ isHydrated }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error && state) {
            state.setIsHydrated(true);
          }
        };
      },
    }
  )
);
