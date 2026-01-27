import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const CoursesHero = () => {
    const { user } = useAuthStore();

    return (
        <section className="relative pt-32 pb-16 overflow-hidden">
            {/* Luxe Ambient Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/10 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_center,_#C5A059_0%,_transparent_70%)] opacity-[0.05]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-black mb-8 border border-brand-500/20 shadow-xl shadow-brand-500/5 backdrop-blur-md">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">مكتبة التفوق المعرفية</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[var(--text-primary)] mb-10 font-display flex flex-col gap-6 lg:gap-10 items-center leading-tight tracking-tight">
                        <span className="block">
                            {user ? (
                                <>أهلاً بك يا <span className="text-[#C5A059]">{user.name.split(' ')[0]}</span> في</>
                            ) : (
                                <>ابتدئ رحلة <span className="text-[#C5A059]">التفوق</span> في</>
                            )}
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#8E6C3D] py-4">لغتنا الجميلة</span>
                    </h1>

                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 font-bold leading-relaxed">
                        نقدم لك منهجاً متكاملاً مصمماً خصيصاً لمرحلتك الدراسية، يجمع بين متعة التذوق الأدبي ودقة القواعد النحوية.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
