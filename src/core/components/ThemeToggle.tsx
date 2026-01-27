// ============================================================
// ThemeToggle - Educational Lamp Switch
// ============================================================

import { motion } from 'framer-motion';
import { LampFloor, Lightbulb } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { clsx } from 'clsx';

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="relative group p-2 rounded-xl transition-all duration-500 hover:bg-white/5 active:scale-95"
            title={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الليلي"}
        >
            <div className="relative flex items-center justify-center w-10 h-10">
                {/* Glow Effect behind the lamp */}
                <motion.div
                    animate={{
                        scale: isDark ? [1, 1.2, 1] : [1.2, 1.5, 1.2],
                        opacity: isDark ? 0.3 : 0.8,
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={clsx(
                        "absolute inset-0 rounded-full blur-xl transition-colors duration-500",
                        isDark ? "bg-brand-500/20" : "bg-amber-400/40"
                    )}
                />

                {/* Lamp Icon */}
                <div className="relative z-10">
                    {isDark ? (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <LampFloor className="w-7 h-7 text-slate-400 group-hover:text-brand-400 transition-colors" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            key="light-mode"
                        >
                            <Lightbulb className="w-7 h-7 text-amber-500 fill-amber-500 group-hover:text-amber-400 transition-colors shadow-lamp" />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Hanging Chain (Visual purely) */}
            <motion.div
                animate={{ height: isDark ? 8 : 12 }}
                className="absolute top-0 right-1/2 translate-x-1/2 w-[1px] bg-slate-700/50 -z-10"
            />
        </button>
    );
}
