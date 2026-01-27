import { motion } from 'framer-motion';

interface Feature {
    icon: any;
    title: string;
    desc: string;
    gradient: string;
    bgGlow: string;
}

interface FeaturesProps {
    features: Feature[];
}

export function Features({ features }: FeaturesProps) {
    return (
        <section className="py-24 bg-[var(--bg-main)] transition-colors relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-[var(--brand-primary)]/5 blur-[100px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl lg:text-5xl font-black text-[var(--text-primary)] mb-6 font-display">
                        لماذا تختار <span className="text-[#C5A059]">منصة الأستاذ</span>؟
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#C5A059] to-[#8E6C3D] mx-auto rounded-full shadow-lg shadow-[#C5A059]/20" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-10">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="group relative"
                        >
                            <div className="relative p-10 pt-20 rounded-[3rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--brand-primary)]/40 transition-all duration-500 shadow-xl group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[var(--brand-primary)]/10">
                                <div className="absolute -top-8 right-10">
                                    <div className={`absolute inset-0 ${feature.bgGlow} blur-2xl rounded-full scale-150 opacity-60 group-hover:opacity-100 transition-opacity`} />
                                    <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-2xl text-white transform rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                                        <feature.icon className="w-10 h-10" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4 mt-2 font-display text-right">{feature.title}</h3>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed text-right font-medium opacity-80 group-hover:opacity-100 transition-opacity">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
