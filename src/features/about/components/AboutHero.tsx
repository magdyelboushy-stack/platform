import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

export const AboutHero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C5A059]/10 to-transparent blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#8E6C3D]/10 to-transparent blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-black mb-8 border border-brand-500/20 shadow-xl shadow-brand-500/5 backdrop-blur-md">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">رؤية جديدة للتميز التعليمي</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[var(--text-primary)] mb-10 font-display flex flex-col gap-6 lg:gap-10 items-center leading-tight tracking-tight">
                        <span className="block">نحن نعيد صياغة</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E2B659] to-[#8E6C3D] py-4">مستقبل اللغة العربية</span>
                    </h1>

                    <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed font-bold mb-10">
                        منصة الأستاذ أحمد راضي هي نتاج سنوات من الخبرة والشغف، صُممت لتكون الملاذ الأول لكل طالب يسعى للتفوق الحقيقي والتمكن من لغته الأم بأحدث الوسائل التقنية.
                    </p>

                    <div className="flex items-center justify-center gap-6">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-3 rounded-full bg-brand-500/5 border border-brand-500/10"
                        >
                            <ArrowDown className="w-6 h-6 text-brand-500" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
