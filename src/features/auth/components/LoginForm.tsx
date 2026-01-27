// ============================================================
// LoginForm - Premium Split-Screen (Theme Aware)
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Lock,
    Eye,
    EyeOff,
    LogIn,
    Loader2,
    Smartphone,
    Home
} from 'lucide-react';
import { clsx } from 'clsx';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Dialog } from '@/core/components/Dialog';

const BRAND_IMAGE = '/src/assets/images/login.png';
const LOGO_IMAGE = '/src/assets/images/logo1.png';
const TEACHER_IMAGE = '/src/assets/images/image.png';
const DECORATIONS = '/src/assets/images/decorations.png';

export function LoginForm() {
    const navigate = useNavigate();
    const authLogin = useAuthStore((state) => state.login);

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        type: 'error' as 'success' | 'error' | 'warning' | 'info',
        title: '',
        message: ''
    });

    const showDialog = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
        setDialogConfig({ type, title, message });
        setDialogOpen(true);
    };

    // Inline error state (more stable than dialog for quick errors)
    const [inlineError, setInlineError] = useState<string | null>(null);

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Extra safety to prevent any bubbling

        // Clear previous error
        setInlineError(null);
        setIsLoading(true);

        try {
            await authLogin(identifier, password);
            setIsLoading(false);

            // Get user data from store for personalized message
            const user = useAuthStore.getState().user;
            const userName = user?.name || 'الطالب';

            showDialog('success', `أهلاً يا ${userName}! 👋`, 'مرحباً بك في منصة الأستاذ أحمد راضي. جاري تحويلك...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err: any) {
            setIsLoading(false);

            // Extract Backend Error Message if available
            let errorMessage = 'فشل تسجيل الدخول';

            if (err.response && err.response.data && err.response.data.error) {
                errorMessage = err.response.data.error;

                if (err.response.data.message) {
                    errorMessage += `\n${err.response.data.message}`;
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }


            // Only use inline banner for errors (stable - no Dialog to prevent reload)
            setInlineError(errorMessage);

            // Dialog disabled for errors to prevent page reload issues
            // showDialog('error', 'خطأ في الدخول ❌', errorMessage);
        }
    };

    const inputContainerVariants = {
        idle: { scale: 1, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
        focused: { scale: 1.01, boxShadow: "0px 10px 40px -10px rgba(197, 160, 89, 0.15)" }
    };

    const floatingVariants = {
        animate: (i: number) => ({
            y: [0, -15, 0],
            rotate: [i * 5, i * -5, i * 5],
            transition: {
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg-main)] transition-colors duration-300" dir="rtl">
            <Dialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                type={dialogConfig.type}
                title={dialogConfig.title}
                message={dialogConfig.message}
            />

            {/* Right Side: Visual Brand Experience */}
            <div className="hidden lg:flex flex-1 relative bg-dark-900 overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={BRAND_IMAGE}
                    alt="Brand Experience"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/40" />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="p-6 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl"
                    >
                        <img src={LOGO_IMAGE} alt="Logo" className="w-32 h-auto rounded-2xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-center space-y-6"
                    >
                        <div className="relative inline-block">
                            <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                            <img src={TEACHER_IMAGE} alt="Teacher" className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white/30 object-cover shadow-2xl relative" />
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight font-display drop-shadow-2xl">
                            منصة الأستاذ <br />
                            <span className="text-brand-400 inline-block mt-2">أحمد راضي</span>
                        </h2>
                        <p className="text-white/70 text-xl font-bold tracking-wide">بوابتك للتميز والنجاح في اللغة العربية</p>
                    </motion.div>
                </div>
            </div>

            {/* Left Side: Form Section */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative overflow-hidden bg-[var(--bg-main)] transition-colors">
                {/* 3D Decorative Assets - Floating */}
                <motion.div
                    custom={1}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-[15%] left-[10%] w-32 md:w-48 h-auto pointer-events-none z-0 opacity-40 dark:opacity-20 blur-[1px]"
                >
                    <div className="relative">
                        <img src={DECORATIONS} alt="3D Pen" className="w-full h-auto object-contain scale-[2.5] -rotate-12 translate-x-[-100%] translate-y-[-100%]" style={{ clipPath: 'inset(0 66% 0 0)' }} />
                    </div>
                </motion.div>

                <motion.div
                    custom={2}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-[10%] right-[10%] w-32 md:w-48 h-auto pointer-events-none z-0 opacity-40 dark:opacity-20 blur-[1px]"
                >
                    <div className="relative">
                        <img src={DECORATIONS} alt="3D Inkwell" className="w-full h-auto object-contain scale-[2.5] rotate-12 translate-x-[150%] translate-y-[150%]" style={{ clipPath: 'inset(0 0 0 66%)' }} />
                    </div>
                </motion.div>

                {/* Decorative Accents */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Back to Home & Logo */}
                <div className="absolute top-8 left-8 lg:left-24 flex items-center gap-4 z-20">
                    <Link to="/" className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-500 hover:border-cyan-500 transition-all shadow-sm">
                        <Home className="w-5 h-5" />
                    </Link>
                    <img src={LOGO_IMAGE} alt="Logo" className="h-12 w-auto rounded-xl shadow-xl dark:shadow-cyan-500/10 border border-white/10" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md w-full mx-auto relative z-10"
                >
                    <div className="mb-14 text-right relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "80px" }}
                            transition={{ delay: 0.3, duration: 1, ease: "circOut" }}
                            className="h-2 bg-gradient-to-r from-brand-600 to-brand-400 rounded-full mb-8 shadow-lg shadow-brand-500/20"
                        />
                        <h1 className="text-5xl font-black text-[var(--text-primary)] mb-4 font-display tracking-tight transition-colors drop-shadow-sm">
                            أهلاً بك مجدداً 👋
                        </h1>
                        <p className="text-[var(--text-secondary)] font-bold text-xl font-body transition-colors">
                            سجل دخولك لتجربة تعليمية فريدة
                        </p>
                    </div>

                    {/* Inline Error Banner - Always Visible */}
                    {inlineError && (
                        <motion.div
                            key="error-banner"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-5 rounded-2xl bg-rose-500/20 border-2 border-rose-500 text-rose-700 dark:text-rose-300 text-center shadow-lg"
                        >
                            <p className="font-black text-base whitespace-pre-line leading-relaxed">{inlineError}</p>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setInlineError(null);
                                }}
                                className="mt-3 px-4 py-2 text-sm font-bold bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                            >
                                ✓ فهمت
                            </button>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Phone/Email Input */}
                        <motion.div
                            variants={inputContainerVariants}
                            animate={focusedField === 'identifier' ? 'focused' : 'idle'}
                            className="group relative"
                        >
                            <div className="absolute -top-3 right-4 z-10">
                                <motion.div
                                    animate={focusedField === 'identifier' ? { y: -5, rotate: -8, scale: 1.15 } : { y: 0, rotate: 0, scale: 1 }}
                                    className={clsx(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border-2 transition-all duration-500",
                                        focusedField === 'identifier'
                                            ? "bg-gradient-to-br from-brand-400 to-brand-600 border-white text-white shadow-brand-500/40"
                                            : "bg-white border-brand-500/10 text-[var(--text-secondary)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
                                    )}
                                >
                                    <Smartphone className="w-6 h-6" />
                                </motion.div>
                            </div>

                            <input
                                type="text"
                                value={identifier}
                                onFocus={() => setFocusedField('identifier')}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => { setIdentifier(e.target.value); }}
                                placeholder="رقم الهاتف أو البريد"
                                required
                                className={clsx(
                                    'w-full pt-7 pb-5 px-8 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border-2 transition-all duration-500 outline-none text-right font-black text-xl font-body',
                                    'placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:text-lg',
                                    focusedField === 'identifier'
                                        ? 'border-brand-500 shadow-[0_25px_50px_-12px_rgba(197,160,89,0.2)] ring-8 ring-brand-500/5'
                                        : 'border-brand-500/10 text-[var(--text-primary)] hover:border-brand-500/40 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)]'
                                )}
                                dir="rtl"
                            />
                        </motion.div>

                        {/* Password Input */}
                        <motion.div
                            variants={inputContainerVariants}
                            animate={focusedField === 'password' ? 'focused' : 'idle'}
                            className="group relative"
                        >
                            <div className="absolute -top-3 right-4 z-10">
                                <motion.div
                                    animate={focusedField === 'password' ? { y: -5, rotate: -8, scale: 1.15 } : { y: 0, rotate: 0, scale: 1 }}
                                    className={clsx(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border-2 transition-all duration-500",
                                        focusedField === 'password'
                                            ? "bg-gradient-to-br from-brand-400 to-brand-600 border-white text-white shadow-brand-500/40"
                                            : "bg-white border-brand-500/10 text-[var(--text-secondary)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
                                    )}
                                >
                                    <Lock className="w-6 h-6" />
                                </motion.div>
                            </div>

                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => { setPassword(e.target.value); }}
                                placeholder="كلمة المرور"
                                required
                                className={clsx(
                                    'w-full pt-7 pb-5 px-8 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border-2 transition-all duration-500 outline-none text-right font-black text-xl font-body',
                                    'placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:text-lg',
                                    focusedField === 'password'
                                        ? 'border-brand-500 shadow-[0_25px_50px_-12px_rgba(197,160,89,0.2)] ring-8 ring-brand-500/5'
                                        : 'border-brand-500/10 text-[var(--text-primary)] hover:border-brand-500/40 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)]'
                                )}
                                dir="rtl"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-6 top-1/2 -translate-y-1/2 mt-1 text-slate-400 hover:text-[var(--color-brand)] transition-colors p-2"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </motion.div>

                        <div className="flex items-center justify-between px-2">
                            <label className="flex items-center gap-3 cursor-pointer group select-none">
                                <div className={clsx(
                                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                    "border-[var(--border-color)] group-hover:border-[var(--color-brand)] bg-white/5"
                                )}>
                                    <div className="w-3 h-3 bg-[var(--color-brand)] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-sm font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors font-body">تذكرني</span>
                            </label>
                            <Link to="/forgot-password" university-id="forgot-pass-link" className="text-sm font-black text-brand-700 hover:text-brand-800 transition-colors hover:underline decoration-2 underline-offset-4 font-body">
                                نسيت كلمة السر؟
                            </Link>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={isLoading}
                            className={clsx(
                                'relative w-full py-6 rounded-2xl font-black text-2xl overflow-hidden group font-display transition-all duration-300',
                                'bg-[#8E6C3D] hover:bg-[#735733] text-white shadow-2xl shadow-[#8E6C3D]/40',
                                'disabled:opacity-70 disabled:cursor-not-allowed'
                            )}
                        >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <div className="relative flex items-center justify-center gap-3">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        جاري التحميل...
                                    </>
                                ) : (
                                    <>
                                        تسجيل الدخول
                                        <LogIn className="w-6 h-6" />
                                    </>
                                )}
                            </div>
                        </motion.button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="font-bold text-[var(--text-secondary)] font-body transition-colors">
                            ليس لديك حساب؟{' '}
                            <Link to="/register" className="text-[var(--text-primary)] hover:text-brand-700 transition-colors border-b-2 border-brand-500/30 hover:border-brand-700 font-display">
                                انشئ حساب جديد
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
