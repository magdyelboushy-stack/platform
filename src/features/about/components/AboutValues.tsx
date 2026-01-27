import { motion } from 'framer-motion';
import {
    BookOpen,
    Users,
    Heart,
    Trophy,
    Rocket,
    Target
} from 'lucide-react';

const AboutFeature = ({ icon: Icon, title, desc, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="group relative p-10 rounded-[3rem] bg-[var(--bg-card)] border border-brand-500/10 hover:border-brand-500/40 transition-all duration-500 shadow-xl scale-animation"
    >
        <div className="absolute inset-0 bg-brand-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-[3rem] pointer-events-none" />

        <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-600 mb-8 border border-brand-500/20 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-500">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4 font-display">{title}</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed font-bold text-lg">{desc}</p>
        </div>
    </motion.div>
);

export const AboutValues = () => {
    return (
        <section className="py-24 bg-[var(--bg-main)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-6xl font-black text-[var(--text-primary)] mb-6 font-display">
                            قيمنا <span className="text-brand-500">الجوهرية</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-brand-600 to-brand-400 mx-auto rounded-full shadow-lg shadow-brand-500/20" />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AboutFeature
                        icon={BookOpen}
                        title="الدقة العلمية"
                        desc="نلتزم بأعلى معايير المحتوى التعليمي، لضمان وصول المعلومة سليمة ومؤصلة لعقل الطالب."
                        delay={0}
                    />
                    <AboutFeature
                        icon={Users}
                        title="المجتمع التفاعلي"
                        desc="لا نتعامل كشاشات، بل كعينة واحدة، نوفر بيئة من الدعم والرد الفوري على كل التساؤلات."
                        delay={0.1}
                    />
                    <AboutFeature
                        icon={Heart}
                        title="إخلاص الرسالة"
                        desc="نؤمن أن التعليم رسالة قبل أن يكون مهنة، لذا نقدم كل ما نملك من علم بمحبة وإتقان."
                        delay={0.2}
                    />
                    <AboutFeature
                        icon={Trophy}
                        title="ثقافة التفوق"
                        desc="هدفنا ليس النجاح فقط، بل غرس فلسفة 'الدرجة النهائية' في وجدان كل طالب يثق بنا."
                        delay={0.3}
                    />
                    <AboutFeature
                        icon={Rocket}
                        title="السبق التكنولوجي"
                        desc="نوظف أحدث تقنيات التعليم عن بُعد لنقل التجربة التعليمية من الجمود إلى الحيوية."
                        delay={0.4}
                    />
                    <AboutFeature
                        icon={Target}
                        title="استراتيجية التبسيط"
                        desc="فك الشفرات اللغوية المعقدة وشرحها بلغة قريبة من ذهن الطالب مع الحفاظ على الرصانة."
                        delay={0.5}
                    />
                </div>
            </div>
        </section>
    );
};
