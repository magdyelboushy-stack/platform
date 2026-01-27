// ============================================================
// API Endpoints - Centralized Route Definitions
// ============================================================

export const ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        VALIDATE_STEP: '/auth/validate-step', // New Endpoint
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
        UPDATE_PROFILE: '/auth/profile/update',
        UPDATE_PASSWORD: '/auth/password/update',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },

    // Courses
    COURSES: {
        LIST: '/courses',
        DETAIL: (id: string) => `/courses/${id}`,
        ENROLL: (id: string) => `/courses/${id}/enroll`,
        MY_COURSES: '/courses/enrolled',
        LESSONS: (courseId: string) => `/courses/${courseId}/lessons`,
        LESSON_DETAIL: (courseId: string, lessonId: string) =>
            `/courses/${courseId}/lessons/${lessonId}`,
    },

    // Video Player
    PLAYER: {
        STREAM_URL: (lessonId: string) => `/player/${lessonId}/stream`,
        PROGRESS: (lessonId: string) => `/player/${lessonId}/progress`,
        COMPLETE: (lessonId: string) => `/player/${lessonId}/complete`,
    },

    // Exams
    EXAMS: {
        LIST: '/exams',
        DETAIL: (id: string) => `/exams/${id}`,
        START: (id: string) => `/exams/${id}/start`,
        SUBMIT: (id: string) => `/exams/${id}/submit`,
        RESULT: (id: string) => `/exams/${id}/result`,
    },

    // Wallet
    WALLET: {
        BALANCE: '/wallet/balance',
        TRANSACTIONS: '/wallet/transactions',
        DEPOSIT: '/wallet/deposit',
        FAWRY_CALLBACK: '/wallet/fawry/callback',
    },

    // Dashboard
    DASHBOARD: {
        STATS: '/dashboard/stats',
        RECENT_ACTIVITY: '/dashboard/activity',
        NOTIFICATIONS: '/dashboard/notifications',
    },

    // Support
    SUPPORT: {
        TICKETS: '/support/tickets',
        CREATE_TICKET: '/support/tickets',
        TICKET_DETAIL: (id: string) => `/support/tickets/${id}`,
        REPLY: (id: string) => `/support/tickets/${id}/reply`,
    },

    // Admin
    ADMIN: {
        USERS: '/admin/users',
        USER_DETAIL: (id: string) => `/admin/users/${id}`,
        APPROVE_USER: (id: string) => `/admin/users/${id}/approve`,
        BLOCK_USER: (id: string) => `/admin/users/${id}/block`,
    },
} as const;
