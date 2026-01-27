import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const AboutFounder = () => {
    return (
        <section className="py-24 bg-[var(--bg-secondary)]/30 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/5 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8E6C3D]/5 rounded-full blur-[100px]" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <Quote className="w-16 h-16 text-brand-500/20 mx-auto mb-8 rotate-180" />

                    <h2 className="text-3xl lg:text-5xl font-black text-[var(--text-primary)] mb-12 font-display">
                        كلمة من القلب
                    </h2>

                    <div className="relative p-12 lg:p-16 rounded-[4rem] bg-[var(--bg-card)] border border-brand-500/10 shadow-3xl glass-card group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <p className="text-2xl lg:text-3xl text-[var(--text-secondary)] leading-[1.8] font-bold italic relative z-10 dark:text-gray-300">
                            "لم تكن فكرة المنصة مجرد مشروع تقني، بل كانت وما زالت عهداً قطعته على نفسي بأن أجعل من اللغة العربية سلاحاً قوياً في يد كل طالب، وأن أحول صعابها إلى جسور يعبر بها الطالب نحو أحلامه بكل ثقة وإجلال للغته الأم."
                        </p>

                        <div className="mt-12 flex flex-col items-center gap-4 relative z-10">
                            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
                            <div>
                                <h4 className="font-black text-[var(--text-primary)] font-display text-2xl lg:text-3xl tracking-tight">الأستاذ أحمد راضي</h4>
                                <p className="text-brand-600 font-bold text-sm lg:text-base mt-2 uppercase tracking-[0.2em]">خبير ومعلم اللغة العربية</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
