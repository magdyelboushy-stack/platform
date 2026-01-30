import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useEffect } from 'react';

interface PermissionGuardProps {
    permission: string;
    children: React.ReactNode;
}

export function PermissionGuard({ permission, children }: PermissionGuardProps) {
    const { user } = useAuthStore();
    const { showToast } = useUIStore();

    const hasPermission = user?.permissions?.includes(permission);

    useEffect(() => {
        if (!hasPermission) {
            showToast({
                type: 'error',
                title: 'غير مصرح',
                message: 'ليس لديك الصلاحية للوصول إلى هذا القسم.',
            });
        }
    }, [hasPermission, showToast]);

    if (!user) return <Navigate to="/" />;

    if (!hasPermission) {
        return <Navigate to="/assistant/dashboard" replace />;
    }

    return <>{children}</>;
}
