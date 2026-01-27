
// ============================================================
// Assistant Dashboard Layout - Role Based View
// ============================================================

import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Ticket,
    FileText,
    MessageSquare,
    LogOut,
    Menu,
    X,
    UserCog,
    Bell,
    CheckCircle,
    Lock,
    Users
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from '@/core/components/ThemeToggle';
import { clsx } from 'clsx';

// Mock permissions for now - in a real app these would come from the user object or API
const MOCK_PERMISSIONS = {
    'can_grade_homework': true,
    'can_manage_codes': true,
    'can_handle_support': true,
    'can_manage_courses': false, // Assistants usually don't edit courses
    'can_view_requests': true, // View student registration requests
};

export function AssistantLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Dynamic Navigation based on permissions
    const navItems = [
        { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/assistant/dashboard', end: true, visible: true },
        { icon: FileText, label: 'تصحيح الواجبات', path: '/assistant/grading', visible: MOCK_PERMISSIONS.can_grade_homework },
        { icon: Ticket, label: 'أكواد التفعيل', path: '/assistant/codes', visible: MOCK_PERMISSIONS.can_manage_codes },
        { icon: Users, label: 'طلبات الحسابات', path: '/assistant/requests', visible: MOCK_PERMISSIONS.can_view_requests },
        { icon: MessageSquare, label: 'الدعم الفني', path: '/assistant/support', visible: MOCK_PERMISSIONS.can_handle_support },
    ].filter(item => item.visible);

    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex text-[var(--text-primary)] font-sans transition-colors duration-300" dir="rtl">
            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isSidebarOpen ? 280 : 0,
                    opacity: isSidebarOpen ? 1 : 0
                }}
                className="fixed lg:sticky top-0 right-0 h-screen bg-[var(--bg-secondary)] border-l border-[var(--border-color)] overflow-hidden z-50 flex flex-col shadow-2xl"
            >
                {/* Brand Area */}
                <div className="h-24 flex items-center gap-3 px-6 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <UserCog className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-black text-lg text-[var(--text-primary)] tracking-wide">بوابة المساعد</h1>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Assistant Panel</span>
                    </div>
                </div>

                {/* Profile Widget */}
                <div className="p-6">
                    <div className="flex items-center gap-4 bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-color)] relative overflow-hidden group shadow-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative">
                            <img
                                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Assistant"}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-[var(--bg-secondary)]"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--bg-card)]" />
                        </div>
                        <div className="flex-1 min-w-0 relative">
                            <h3 className="font-bold text-sm text-[var(--text-primary)] truncate">{user?.name || "المساعد محمد"}</h3>
                            <p className="text-xs text-[var(--text-secondary)] truncate">مساعد (صلاحيات محدودة)</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 space-y-1.5 custom-scrollbar">
                    <p className="px-4 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">القائمة الرئيسية</p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => clsx(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20"
                                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)]"
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={clsx("w-5 h-5 transition-colors", isActive ? "text-white" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]")} />
                                    <span className="tracking-wide">{item.label}</span>
                                    {item.visible === false && <Lock className="w-3 h-3 ml-auto text-red-500" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-main)] space-y-2">
                    <div className="px-4 py-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 mb-2">
                        <div className="flex items-center gap-2 text-indigo-500 mb-1">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-bold">حساب نشط</span>
                        </div>
                        <p className="text-[10px] text-[var(--text-secondary)] leading-tight">لديك صلاحيات: التصحيح، الأكواد، الدعم.</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>تسجيل خروج</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative bg-[var(--bg-main)]">
                {/* Top Header */}
                <header className="h-20 flex items-center justify-between px-6 lg:px-8 z-30 bg-[var(--bg-secondary)]/80 backdrop-blur-md border-b border-[var(--border-color)] sticky top-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 rounded-xl hover:bg-[var(--bg-main)] text-[var(--text-primary)] lg:hidden transition-colors"
                        >
                            {isSidebarOpen ? <X /> : <Menu />}
                        </button>

                        <div className="hidden md:block">
                            <h2 className="text-xl font-black text-[var(--text-primary)]">لوحة المساعد</h2>
                            <p className="text-xs text-[var(--text-secondary)] font-bold">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <button className="relative p-2.5 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] transition-colors border border-[var(--border-color)]">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-secondary)]" />
                        </button>
                    </div>
                </header>

                {/* Content Viewport */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar scroll-smooth">
                    <div className="max-w-[1600px] mx-auto min-h-full">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
