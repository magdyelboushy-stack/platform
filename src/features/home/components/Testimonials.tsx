import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
    name: string;
    grade: string;
    text: string;
    rating: number;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
    return (
        <section className="py-24 bg-[var(--bg-secondary)]/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl lg:text-5xl font-black text-[var(--text-primary)] mb-6 font-display">
                        ماذا يقول <span className="text-[#C5A059]">طلاب الأوائل</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#C5A059] to-[#8E6C3D] mx-auto rounded-full shadow-lg shadow-[#C5A059]/20" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-10">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[3rem] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-amber-500/30 transition-all shadow-xl hover:-translate-y-2 group"
                        >
                            <Quote className="w-12 h-12 text-amber-500/10 mb-8 group-hover:text-amber-500/20 transition-colors" />
                            <p className="text-right text-[var(--text-secondary)] text-lg leading-relaxed mb-10 font-bold italic transition-colors">"{testimonial.text}"</p>
                            <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-8">
                                <div className="text-right">
                                    <p className="font-black text-xl text-[var(--text-primary)] font-display transition-colors">{testimonial.name}</p>
                                    <p className="text-sm text-[var(--text-secondary)] mt-1 font-bold">{testimonial.grade}</p>
                                </div>
                                <div className="flex gap-1.5 bg-[#C5A059]/5 px-3 py-1.5 rounded-full border border-[#C5A059]/10">
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
