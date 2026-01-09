import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Token management
let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;
    if (typeof window !== "undefined") {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    }
};

export const getAccessToken = () => {
    if (accessToken) return accessToken;
    if (typeof window !== "undefined") {
        accessToken = localStorage.getItem("access_token");
    }
    return accessToken;
};

export const getRefreshToken = () => {
    if (refreshToken) return refreshToken;
    if (typeof window !== "undefined") {
        refreshToken = localStorage.getItem("refresh_token");
    }
    return refreshToken;
};

export const clearTokens = () => {
    accessToken = null;
    refreshToken = null;
    if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }
};

// Request interceptor - add auth header
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        const isAuthRequest = originalRequest.url?.includes("/auth/login") || originalRequest.url?.includes("/auth/register");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            originalRequest._retry = true;

            const refresh = getRefreshToken();
            if (refresh) {
                try {
                    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, {
                        refresh_token: refresh,
                    });

                    const { access_token, refresh_token } = response.data;
                    setTokens(access_token, refresh_token);

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    }
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    clearTokens();
                    if (typeof window !== "undefined") {
                        window.location.href = "/login";
                    }
                    return Promise.reject(refreshError);
                }
            } else {
                clearTokens();
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;

// API Types
export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface User {
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
    organizations: Organization[];
}

export interface Organization {
    id: string;
    name: string;
    slug: string;
    role: "owner" | "admin" | "member" | "viewer";
    settings?: Record<string, unknown>;
    member_count?: number;
}

export interface RFP {
    rfp_id: string;
    filename: string;
    client_name?: string;
    sector?: string;
    submission_deadline?: string;
    status: "uploaded" | "analyzing" | "analyzed" | "failed";
    text_length: number;
    ocr_used: boolean;
    created_at: string;
}

export interface JobStatus {
    job_id: string;
    rfp_id: string;
    status: "queued" | "running" | "completed" | "failed";
    started_at?: string;
    completed_at?: string;
    current_step: number;
    total_steps: number;
    step_name: string;
    step_description: string;
    progress_percent: number;
    logs: string[];
    error?: string;
    results_summary?: Record<string, unknown>;
}

export interface Requirement {
    id: string;
    text: string;
    mandatory: boolean;
    confidence: number;
    source_section?: string;
    category?: string;
}

export interface ComplianceItem {
    requirement_id: string;
    requirement_text?: string;
    mandatory: boolean;
    status: "pending" | "met" | "not_met" | "partial" | "not_applicable";
    response_location?: string;
    notes: string;
    evidence?: string;
}

export interface RiskFlag {
    requirement_id: string;
    risk_level: "low" | "medium" | "high" | "critical";
    category?: string;
    explanation: string;
    mitigation?: string;
}

export interface UsageInfo {
    has_subscription: boolean;
    plan: {
        name: string;
        display_name: string;
        rfp_limit: number;
        user_limit: number;
    };
    subscription_status: string;
    billing_cycle: string;
    current_period_end: string;
    rfps_used: number;
    rfps_limit: number;
    rfps_remaining: number;
}
