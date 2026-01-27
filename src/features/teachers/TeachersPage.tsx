// ============================================================
// TeachersPage - Mr. Ahmed Rady Profile (Luxe Redesign v13.06)
// ============================================================

import { motion } from 'framer-motion';
import {
    BookOpen,
    Users,
    Star,
    CheckCircle2,
    Calendar,
    ArrowLeft,
    Sparkles,
    Medal,
    Trophy
} from 'lucide-react';
import { Navbar } from '@/core/components/Navbar';
import { Footer } from '@/core/components/Footer';
import { ContactSection } from '@/core/components/ContactSection';
import { Link } from 'react-router-dom';

const TEACHER = {
    name: "أ/ أحمد راضي",
    title: "خبير اللغة العربية للمرحلة الثانوية",
    bio: "على مدار أكثر من 15 عاماً، كرس الأستاذ أحمد راضي حياته لتبسيط لغة الضاد وجعلها مادة ممتعة وشيقة لطلاب الثانوية العامة. مؤلف سلسلة 'البيان' التعليمية ومبتكر منهجية التبسيط اللغوي.",
    image: "/src/assets/images/teacher.png",
    stats: [
        { label: "سنة خبرة", value: "+15", icon: Calendar },
        { label: "طالب متفوق", value: "+50K", icon: Users },
        { label: "فيديو شرح", value: "+500", icon: BookOpen },
        { label: "تقييم عام", value: "5/5", icon: Star },
    ],
    milestones: [
        { year: "2010", text: "بداية رحلة التدريس في المدارس الكبرى" },
        { year: "2015", text: "إصدار النسخة الأولى من سلسلة 'البيان'" },
        { year: "2020", text: "تأسيس المنصة الرقمية لطلاب الأقاليم" },
        { year: "2023", text: "تكريم كأفضل معلم لغة عربية رقمي" }
    ],
    achievements: [
        "ماجستير في النحو والصرف من كلية دار العلوم",
        "مؤلف سلسلة 'البيان' الأكثر مبيعاً في مصر",
        "تكريم وزارة التربية والتعليم - المعلم المثالي",
        "خبرة واسعة في نظام التقييم الحديث بوزارة التعليم"
    ]
};

const BentoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-8 rounded-[3rem] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#C5A059]/40 transition-all duration-500 shadow-xl group ${className}`}
    >
        {children}
    </motion.div>
);

export function TeachersPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-300" dir="rtl">
            <Navbar />

            {/* Hero Profile Section */}
            <section className="pt-32 pb-24 relative overflow-hidden">
                {/* Luxe Background Layer */}
                <div className="absolute top-0 right-0 w-[1000px] h-[600px] bg-[#C5A059]/5 blur-[150px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#8E6C3D]/5 blur-[100px] rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Image Pillar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full lg:w-[40%] group"
                        >
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                                <img src={TEACHER.image} alt={TEACHER.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                <div className="absolute bottom-10 right-10 left-10 text-white text-right">
                                    <h2 className="text-4xl font-black font-display mb-2">{TEACHER.name}</h2>
                                    <div className="flex items-center justify-end gap-2 text-[#C5A059] font-black">
                                        <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                                        <span>خبير لغة الضاد</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Pillar */}
                        <div className="w-full lg:w-[60%] text-right space-y-10">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] text-sm font-black mb-8 border border-[#C5A059]/20 shadow-sm">
                                    <Sparkles className="w-5 h-5" />
                                    <span>الملهم المتميز لعام 2024</span>
                                </div>

                                <h1 className="text-4xl lg:text-7xl font-black text-[var(--text-primary)] mb-8 font-display leading-[1.3] lg:leading-[1.4]">
                                    ابنِ مستقبلك مع <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#8E6C3D]">خبير اللغة العربية</span>
                                </h1>

                                <p className="text-2xl text-[var(--text-secondary)] leading-loose mb-12 max-w-3xl font-medium italic opacity-90 transition-colors">
                                    "{TEACHER.bio}"
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                    {TEACHER.stats.map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -5 }}
                                            className="p-6 rounded-[2.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center shadow-lg group hover:border-[#C5A059]/30 transition-all duration-300"
                                        >
                                            <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#C5A059] transition-transform group-hover:scale-110" />
                                            <p className="text-3xl font-black text-[var(--text-primary)] font-display mb-1">{stat.value}</p>
                                            <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center justify-end gap-6">
                                    <Link to="/courses" className="px-12 py-5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#8E6C3D] text-white font-black text-xl shadow-2xl shadow-[#C5A059]/30 hover:shadow-[#C5A059]/50 transition-all group flex items-center gap-3">
                                        تصفح الكورسات
                                        <ArrowLeft className="w-6 h-6 group-hover:translate-x-[-5px] transition-transform" />
                                    </Link>
                                    <button className="px-12 py-5 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border-2 border-[#C5A059]/20 text-[var(--text-primary)] font-black text-xl transition-all shadow-lg">
                                        تواصل مباشرة
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credentials & Methodology Bento */}
            <section className="py-24 bg-[var(--bg-secondary)]/30 backdrop-blur-sm relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Achievements */}
                        <BentoCard className="lg:col-span-2 space-y-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-3xl font-black text-[var(--text-primary)] font-display">المؤهلات والإنجازات</h3>
                                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
                                    <Trophy className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {TEACHER.achievements.map((item, i) => (
                                    <motion.div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#C5A059]/5 transition-colors">
                                        <CheckCircle2 className="w-6 h-6 text-[#C5A059] shrink-0 mt-1" />
                                        <p className="text-xl text-[var(--text-primary)] font-bold leading-relaxed">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </BentoCard>

                        {/* Milestones / Timeline */}
                        <BentoCard className="bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c] text-white border-none space-y-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-3xl font-black font-display">محطات النجاح</h3>
                                <Medal className="w-8 h-8 text-[#C5A059]" />
                            </div>
                            <div className="space-y-8">
                                {TEACHER.milestones.map((ms, i) => (
                                    <div key={i} className="flex gap-6 items-center">
                                        <span className="text-sm font-black text-[#C5A059] font-display w-12 text-center border-b border-[#C5A059]/30 pb-1">{ms.year}</span>
                                        <p className="text-lg font-bold text-white/80">{ms.text}</p>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </section>

            <ContactSection />
            <Footer />
        </div>
    );
}
