"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient, {
    AuthResponse,
    User,
    RFP,
    JobStatus,
    UsageInfo,
    setTokens,
    clearTokens,
} from "./api";
import { useAuthStore } from "./authStore";

// ============== AUTH HOOKS ==============

export const useLogin = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const formData = new URLSearchParams();
            formData.append("username", credentials.email);
            formData.append("password", credentials.password);

            const response = await apiClient.post<AuthResponse>("/api/v1/auth/login", formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            return response.data;
        },
        onSuccess: async (data) => {
            setTokens(data.access_token, data.refresh_token);
            const userResponse = await apiClient.get<User>("/api/v1/auth/me");
            setUser(userResponse.data);
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (data: {
            email: string;
            password: string;
            full_name: string;
            organization_name: string;
        }) => {
            const response = await apiClient.post<AuthResponse>("/api/v1/auth/register", data);
            return response.data;
        },
        onSuccess: async (data) => {
            setTokens(data.access_token, data.refresh_token);
            const userResponse = await apiClient.get<User>("/api/v1/auth/me");
            setUser(userResponse.data);
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};

export const useMe = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const setLoading = useAuthStore((state) => state.setLoading);

    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const response = await apiClient.get<User>("/api/v1/auth/me");
            setUser(response.data);
            return response.data;
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const logout = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: async () => {
            clearTokens();
            logout();
        },
        onSuccess: () => {
            queryClient.clear();
        },
    });
};

export const useSwitchOrg = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orgId: string) => {
            const response = await apiClient.post<AuthResponse>(
                `/api/v1/auth/switch-org?org_id=${orgId}`
            );
            return response.data;
        },
        onSuccess: (data) => {
            setTokens(data.access_token, data.refresh_token);
            queryClient.invalidateQueries();
        },
    });
};

// ============== RFP HOOKS ==============

export const useRFPs = () => {
    return useQuery({
        queryKey: ["rfps"],
        queryFn: async () => {
            const response = await apiClient.get<RFP[]>("/api/v1/rfps");
            return response.data;
        },
    });
};

export const useRFP = (rfpId: string | undefined) => {
    return useQuery({
        queryKey: ["rfp", rfpId],
        queryFn: async () => {
            const response = await apiClient.get<RFP>(`/api/v1/rfps/${rfpId}`);
            return response.data;
        },
        enabled: !!rfpId,
    });
};

export const useUploadRFP = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            file: File;
            client_name?: string;
            sector?: string;
            submission_deadline?: string;
        }) => {
            const formData = new FormData();
            formData.append("file", data.file);
            if (data.client_name) formData.append("client_name", data.client_name);
            if (data.sector) formData.append("sector", data.sector);
            if (data.submission_deadline)
                formData.append("submission_deadline", data.submission_deadline);

            const response = await apiClient.post("/api/v1/rfps/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rfps"] });
        },
    });
};

export const useDeleteRFP = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (rfpId: string) => {
            await apiClient.delete(`/api/v1/rfps/${rfpId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rfps"] });
        },
    });
};

// ============== ANALYSIS HOOKS ==============

export const useStartAnalysis = () => {
    return useMutation({
        mutationFn: async (data: {
            rfp_id: string;
            run_full_workflow?: boolean;
            company_context?: {
                company_name?: string;
                industry?: string;
                strengths?: string[];
            };
        }) => {
            const response = await apiClient.post("/api/analyze", {
                rfp_id: data.rfp_id,
                run_full_workflow: data.run_full_workflow ?? true,
                company_context: data.company_context,
            });
            return response.data;
        },
    });
};

export const useRerunAnalysis = () => {
    return useMutation({
        mutationFn: async (rfpId: string) => {
            const response = await apiClient.post(`/api/analyze/${rfpId}/rerun`);
            return response.data;
        },
    });
};

export const useJobStatus = (jobId: string | undefined) => {
    return useQuery({
        queryKey: ["job-status", jobId],
        queryFn: async () => {
            const response = await apiClient.get<JobStatus>(`/api/status/${jobId}`);
            return response.data;
        },
        enabled: !!jobId,
        refetchInterval: (query) => {
            const data = query.state.data;
            if (!data) return 2000;
            if (data.status === "completed" || data.status === "failed") {
                return false;
            }
            return 2000;
        },
    });
};

export const useRFPStatus = (rfpId: string | undefined) => {
    return useQuery({
        queryKey: ["rfp-status", rfpId],
        queryFn: async () => {
            const response = await apiClient.get<JobStatus>(`/api/rfp/${rfpId}/status`);
            return response.data;
        },
        enabled: !!rfpId,
    });
};

export const useResults = (rfpId: string | undefined) => {
    return useQuery({
        queryKey: ["results", rfpId],
        queryFn: async () => {
            const response = await apiClient.get(`/api/results/${rfpId}`);
            return response.data;
        },
        enabled: !!rfpId,
    });
};

export const useAgentResult = (rfpId: string | undefined, agentName: string) => {
    return useQuery({
        queryKey: ["results", rfpId, agentName],
        queryFn: async () => {
            const response = await apiClient.get(`/api/results/${rfpId}/${agentName}`);
            return response.data;
        },
        enabled: !!rfpId && !!agentName,
    });
};

export const useReviseProposal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (rfpId: string) => {
            const response = await apiClient.post(`/api/proposal/${rfpId}/revise`);
            return response.data;
        },
        onSuccess: (_, rfpId) => {
            queryClient.invalidateQueries({ queryKey: ["results", rfpId] });
        },
    });
};

// ============== ORGANIZATION HOOKS ==============

export const useOrganizations = () => {
    return useQuery({
        queryKey: ["organizations"],
        queryFn: async () => {
            const response = await apiClient.get("/api/v1/organizations");
            return response.data;
        },
    });
};

export const useOrgMembers = (orgId: string | undefined) => {
    return useQuery({
        queryKey: ["org-members", orgId],
        queryFn: async () => {
            const response = await apiClient.get(`/api/v1/organizations/${orgId}/members`);
            return response.data;
        },
        enabled: !!orgId,
    });
};

export const useInviteMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { orgId: string; email: string; role: string }) => {
            const response = await apiClient.post(
                `/api/v1/organizations/${data.orgId}/members`,
                { email: data.email, role: data.role }
            );
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["org-members", variables.orgId] });
        },
    });
};

export const useRemoveMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { orgId: string; userId: string }) => {
            await apiClient.delete(
                `/api/v1/organizations/${data.orgId}/members/${data.userId}`
            );
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["org-members", variables.orgId] });
        },
    });
};

// ============== BILLING HOOKS ==============

export const useUsage = () => {
    return useQuery({
        queryKey: ["usage"],
        queryFn: async () => {
            const response = await apiClient.get<UsageInfo>("/api/v1/billing/usage");
            return response.data;
        },
    });
};

export const useCanCreateRFP = () => {
    return useQuery({
        queryKey: ["can-create-rfp"],
        queryFn: async () => {
            const response = await apiClient.get<{ can_create: boolean; message: string }>(
                "/api/v1/billing/can-create-rfp"
            );
            return response.data;
        },
    });
};
