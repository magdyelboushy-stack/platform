import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, UserCog, Shield, Users, ArrowLeft, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

// Role Configuration
const ROLE_CONFIG = {
    teacher: {
        title: 'بوابة المدرسين',
        subtitle: 'لوحة التحكم الخاصة بالمحتوى والطلاب',
        icon: UserCog,
        color: 'cyan',
        bgGradient: 'from-cyan-900/20 to-[var(--bg-main)]',
        border: 'border-cyan-500/20',
        glow: 'shadow-cyan-500/10'
    },
    admin: {
        title: 'بوابة الإدارة',
        subtitle: 'لوحة التحكم الكاملة للنظام',
        icon: Shield,
        color: 'red',
        bgGradient: 'from-red-900/20 to-[var(--bg-main)]',
        border: 'border-red-500/20',
        glow: 'shadow-red-500/10'
    },
    assistant: {
        title: 'بوابة المساعدين',
        subtitle: 'نظام المتابعة والدعم الفني',
        icon: Users,
        color: 'emerald',
        bgGradient: 'from-emerald-900/20 to-[var(--bg-main)]',
        border: 'border-emerald-500/20',
        glow: 'shadow-emerald-500/10'
    }
};

export function StaffLoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login, isAuthenticated, user } = useAuthStore();

    // Determine Role from URL
    const role = location.pathname.includes('admin') ? 'admin'
        : location.pathname.includes('teacher') ? 'teacher'
            : 'assistant';

    const config = ROLE_CONFIG[role as keyof typeof ROLE_CONFIG];

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated && user) {
            // Redirect based on role
            if (user.role === 'teacher') navigate('/teacher/dashboard');
            else if (user.role === 'admin') navigate('/admin/dashboard');
            else if (user.role === 'assistant') navigate('/assistant/dashboard');
            else navigate('/dashboard'); // Student fallback
        }
    }, [isAuthenticated, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            // Navigation will be handled by the effect above or manually here
        } catch (err) {
            setError('بيانات الدخول غير صحيحة، يرجى التأكد والمحاولة مرة أخرى');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-main)] relative overflow-hidden" dir="rtl">
            {/* Background Effects */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-50`} />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative w-full max-w-md p-8 rounded-3xl bg-[var(--bg-card)] border ${config.border} shadow-2xl backdrop-blur-xl`}
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className={`w-20 h-20 rounded-2xl bg-[var(--bg-main)] border ${config.border} flex items-center justify-center mx-auto mb-6 shadow-lg ${config.glow}`}>
                        <config.icon className={`w-10 h-10 text-${config.color}-500`} />
                    </div>
                    <h1 className="text-2xl font-black text-[var(--text-primary)] mb-2">{config.title}</h1>
                    <p className="text-[var(--text-secondary)] font-bold text-sm">{config.subtitle}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Access Key / Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-secondary)]">البريد الإلكتروني / كود الموظف</label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full h-12 pr-12 pl-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold focus:border-${config.color}-500 outline-none transition-all`}
                                placeholder="example@platform.com"
                                dir="ltr"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors">
                                <KeyRound className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-secondary)]">كلمة المرور</label>
                        <div className="relative group">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full h-12 pr-12 pl-12 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold focus:border-${config.color}-500 outline-none transition-all`}
                                placeholder="••••••••"
                                dir="ltr"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-500 text-sm font-bold text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full h-12 rounded-xl bg-${config.color}-500 hover:bg-${config.color}-600 text-white font-black text-lg shadow-lg shadow-${config.color}-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'تسجيل الدخول'
                        )}
                    </button>

                    {/* Back to Home */}
                    <div className="pt-4 text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-bold text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            العودة للصفحة الرئيسية
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
