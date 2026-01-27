import { motion } from 'framer-motion';
import { Story } from './Story';
import { Stats } from './Stats';
import { Philosophy } from './Philosophy';

export function AboutTeacher() {
    return (
        <section className="py-32 bg-[var(--bg-secondary)]/30 relative overflow-hidden">
            {/* Luxe Decorative Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A059]/5 blur-[150px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8E6C3D]/5 blur-[120px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Visual Pillar (Portrait & Stats) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-tr from-[#C5A059]/20 to-transparent blur-2xl group-hover:from-[#C5A059]/30 transition-all duration-700" />
                            <div className="relative rounded-[3rem] overflow-hidden border-4 border-white/50 dark:border-slate-800/50 shadow-2xl aspect-[4/5]">
                                <img
                                    src="/src/assets/images/teacher.png"
                                    alt="Ahmed Rady Portrait"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-8 right-8">
                                    <h4 className="text-4xl font-black text-white font-display">أحمد راضي</h4>
                                    <p className="text-[#C5A059] font-black text-lg mt-1">كبير معلمي اللغة العربية</p>
                                </div>
                            </div>
                        </div>

                        <Stats />
                    </motion.div>

                    {/* Content Pillar (Story) */}
                    <Story />
                </div>

                {/* Methodology Pillar */}
                <Philosophy />
            </div>
        </section>
    );
}

export * from './Story';
export * from './Stats';
export * from './Philosophy';
