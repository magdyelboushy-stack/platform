// ============================================================
// Base API Client - Axios with JWT Interceptors
// ============================================================

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import type { ApiError } from '@/core/types/common';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create Axios instance with default config
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    withCredentials: true, // Enable sending cookies (Session)
    headers: {
        'Accept': 'application/json',
    },
});

// ============================================================
// Request Interceptor - Attach JWT Token
// ============================================================
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { tokens, csrfToken } = useAuthStore.getState();

        // 1. Bearer Token (Optional if using Sessions exclusively, but kept for hybrid auth)
        if (tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }

        // 2. CSRF Token (Required for Session Security)
        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ============================================================
// Response Interceptor - Handle Errors & Token Refresh
// ============================================================
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config;

        // Handle 401 - Unauthorized (Token Expired or Status Change)
        if (error.response?.status === 401 && originalRequest) {
            // Don't redirect if already on login/register pages
            if (window.location.pathname === '/login' || window.location.pathname === '/register') {
                return Promise.reject(error);
            }

            const { tokens, logout, refreshAccessToken } = useAuthStore.getState();
            const { showToast } = useUIStore.getState();

            // Attempt to refresh the token
            if (tokens?.refreshToken) {
                try {
                    await refreshAccessToken();
                    const newTokens = useAuthStore.getState().tokens;
                    if (newTokens?.accessToken && originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                        return apiClient(originalRequest);
                    }
                } catch {
                    logout();
                    showToast({
                        type: 'warning',
                        title: 'إنتهت الجلسة',
                        message: 'يرجى تسجيل الدخول مرة أخرى لمتابعة الاستخدام.',
                    });
                }
            } else {
                logout();
                const backendMsg = error.response?.data?.error || error.response?.data?.message;
                showToast({
                    type: 'error',
                    title: 'تنبيه الأمان',
                    message: backendMsg || 'تم تسجيل الخروج، يرجى التحقق من حالة حسابك.',
                });
            }
        }

        // Handle 403 - Forbidden
        if (error.response?.status === 403) {
            const { showToast } = useUIStore.getState();
            const backendMsg = error.response.data?.error || error.response.data?.message;
            showToast({
                type: 'error',
                title: 'دخول غير مصرح',
                message: backendMsg || 'ليس لديك الصلاحية للقيام بهذا الإجراء.',
            });
        }

        // Handle 422 - Validation Errors
        if (error.response?.status === 422) {
            const validationErrors = error.response.data?.errors;
            if (validationErrors) {
            }
        }

        // Handle 500 - Server Error
        if (error.response?.status === 500) {
        }

        // Handle Network Error
        if (!error.response) {
        }

        return Promise.reject(error);
    }
);

// ============================================================
// Typed API Methods
// ============================================================
export const api = {
    get: <T>(url: string, config?: object) =>
        apiClient.get<T>(url, config).then((res) => res.data),

    post: <T>(url: string, data?: object, config?: object) =>
        apiClient.post<T>(url, data, config).then((res) => res.data),

    put: <T>(url: string, data?: object, config?: object) =>
        apiClient.put<T>(url, data, config).then((res) => res.data),

    patch: <T>(url: string, data?: object, config?: object) =>
        apiClient.patch<T>(url, data, config).then((res) => res.data),

    delete: <T>(url: string, config?: object) =>
        apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
