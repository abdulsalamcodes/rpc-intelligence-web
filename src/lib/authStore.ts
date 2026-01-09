import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Organization } from "./api";

interface AuthState {
    user: User | null;
    currentOrg: Organization | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setCurrentOrg: (org: Organization | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            currentOrg: null,
            isAuthenticated: false,
            isLoading: true,

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                    currentOrg: user?.organizations?.[0] || null,
                }),

            setCurrentOrg: (org) => set({ currentOrg: org }),

            setLoading: (loading) => set({ isLoading: loading }),

            logout: () =>
                set({
                    user: null,
                    currentOrg: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                currentOrg: state.currentOrg,
                isAuthenticated: state.isAuthenticated,
            }),
            skipHydration: true,
        }
    )
);
