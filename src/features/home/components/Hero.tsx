import { motion } from 'framer-motion';
import { ArrowLeft, Play, Feather, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
    teacherImage: string;
    brandImage: string;
    stats: Array<{ value: string; label: string; icon: any }>;
}

export function Hero({ teacherImage, brandImage, stats }: HeroProps) {
    return (
        <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={brandImage} alt="Background" className="w-full h-full object-cover opacity-20 dark:opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-l from-[var(--bg-main)] via-[var(--bg-main)]/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] to-transparent" />
            </div>

            <div className="absolute top-20 right-1/4 w-64 h-64 bg-[var(--brand-primary)]/10 dark:bg-[var(--brand-primary)]/15 rounded-full blur-[80px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center text-right">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-sm font-black mb-8 shadow-sm hover:shadow-[#C5A059]/10 transition-all cursor-default">
                            <Feather className="w-5 h-5" />
                            <span className="font-display tracking-wide">لغة الضاد.. هويتُنا وفخرُنا</span>
                        </div>

                        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[4.5rem] leading-[1.4] lg:leading-[1.4] mb-8">
                            <span className="text-[var(--text-primary)] transition-colors">احترف العربي مع</span>{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#8E6C3D]">الأستاذ أحمد راضي</span>
                        </h1>

                        <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-lg mr-0 ml-auto leading-relaxed transition-colors">
                            رحلتك للتفوق في اللغة العربية تبدأ من هنا. شرح مبسط، متابعة مستمرة، وضمان للدرجة النهائية بإذن الله.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10 justify-start">
                            <Link to="/register" className="group px-8 py-4 rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white font-black text-lg transition-all shadow-xl shadow-[var(--brand-primary)]/25 hover:-translate-y-0.5 flex items-center gap-3 font-display">
                                <span>ابـدأ الـمـذاكـرة</span>
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </Link>
                            <button className="px-6 py-4 rounded-full bg-[var(--bg-secondary)] hover:bg-white dark:hover:bg-slate-800 border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-lg transition-all flex items-center gap-3 font-display shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-[var(--brand-accent)] text-white flex items-center justify-center shadow-lg shadow-[var(--brand-accent)]/20">
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                </div>
                                <span>فيديو تعريفي</span>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-6 justify-start">
                            {stats.map((stat, i) => (
                                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3 text-[var(--text-primary)]">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--brand-primary)] shadow-sm">
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black font-display">{stat.value}</p>
                                        <p className="text-xs text-[var(--text-secondary)]">{stat.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block relative">
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[var(--brand-primary)]/20 to-[var(--brand-accent)]/10 blur-2xl" />
                            <div className="relative rounded-[2rem] overflow-hidden border border-[var(--border-color)] shadow-2xl">
                                <div className="aspect-[4/5] bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-end justify-center">
                                    <img
                                        src={teacherImage}
                                        alt="Mr. Ahmed Rady"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent opacity-60 dark:opacity-80" />
                                <div className="absolute bottom-6 right-6 left-6 p-5 rounded-2xl bg-[var(--bg-secondary)]/90 backdrop-blur-xl border border-[var(--border-color)] flex items-center justify-between transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] flex items-center justify-center shadow-lg text-white">
                                            <Maximize className="w-6 h-6" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-[var(--text-secondary)]">مدرس ذو خبرة</p>
                                            <p className="text-lg font-black text-[var(--text-primary)] font-display">أستاذ أحمد راضي</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
