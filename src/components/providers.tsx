"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/authStore";
import { getAccessToken } from "@/lib/api";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                retry: 1,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (typeof window === "undefined") {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    // Hydrate auth store on mount
    React.useEffect(() => {
        useAuthStore.persist.rehydrate();

        // Check if we have a token and set loading to false
        const token = getAccessToken();
        if (!token) {
            useAuthStore.getState().setLoading(false);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
