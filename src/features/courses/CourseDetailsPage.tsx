// ============================================================
// CourseDetailsPage - Ahmed Rady Platform
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import {
    PlayCircle,
    FileText,
    HelpCircle,
    Clock,
    ChevronRight,
    Star,
    CheckCircle,
    Share2,
    Heart,
    Lock,
    LayoutGrid,
    Info,
    X,
    MessageSquare,
    Send
} from 'lucide-react';
import { Navbar } from '@/core/components/Navbar';
import { Footer } from '@/core/components/Footer';
import { ContactSection } from '@/core/components/ContactSection';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

// Mock Detailed Course Data (Arabic)
const courseDetails = {
    id: 1,
    title: "كورس النحو الشامل - الوحدة الأولى والثانية للثانوية العامة",
    banner: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1600&auto=format&fit=crop",
    teacher: {
        name: "أ/ أحمد راضي",
        role: "كبير معلمي اللغة العربية",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed&backgroundColor=c0aede",
        rating: 5.0,
    },
    stats: {
        videos: 40,
        files: 20,
        exams: 8,
        weeks: 6,
        duration: "+45 ساعة",
        students: "5.2K"
    },
    description: "في هذا الكورس، سنقوم بشرح مفصل وممتع لقواعد النحو، بداية من همزة القطع وألف الوصل، وصولاً إلى المشتقات والمصادر. الشرح يعتمد على الفهم والتطبيق العملي، مع حل مئات الأسئلة من امتحانات السنوات السابقة.",
    objectives: [
        "إتقان قواعد الوحدة الأولى (النطق والإملاء)",
        "فهم المشتقات العاملة وغير العاملة",
        "القدرة على استخراج المصادر بأنواعها",
        "حل قطع نحو شاملة بنظام الامتحانات الجديد"
    ],
    curriculum: [
        {
            id: 1,
            title: "الأسبوع الأول: همزة القطع وألف الوصل",
            lessons: [
                { id: 1, title: "شرح همزة القطع وألف الوصل", duration: "45 دقيقة", type: 'video', isLocked: false, videoUrl: "https://iframe.mediadelivery.net/embed/585748/fd102e93-b807-4c3b-8a69-7ba430a692b1?autoplay=true&loop=false&muted=false&preload=true&responsive=true" },
                { id: 2, title: "تدريبات على الوحدة الأولى", duration: "10 صفحات", type: 'pdf', isLocked: false },
                { id: 3, title: "اختبار إلكتروني (همزات)", duration: "20 سؤال", type: 'exam', isLocked: true },
            ]
        },
        {
            id: 2,
            title: "الأسبوع الثاني: المشتقات العاملة",
            lessons: [
                { id: 4, title: "اسم الفاعل وصيغ المبالغة (شرح)", duration: "1.5 ساعة", type: 'video', isLocked: true },
                { id: 5, title: "اسم المفعول وعمله", duration: "50 دقيقة", type: 'video', isLocked: true },
                { id: 6, title: "مذكرة تدريبات المشتقات", duration: "15 صفحة", type: 'pdf', isLocked: true },
            ]
        },
        {
            id: 3,
            title: "الأسبوع الثالث: المصادر",
            lessons: [
                { id: 7, title: "المصادر الصريحة (ثلاثي ورباعي)", duration: "60 دقيقة", type: 'video', isLocked: true },
                { id: 8, title: "المصادر الخماسية والسداسية", duration: "45 دقيقة", type: 'video', isLocked: true },
            ]
        }
    ]
};

// Rating Modal Component
function RatingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <div className="absolute top-6 right-6">
                    <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="w-full max-w-lg bg-[var(--bg-card)] rounded-[2.5rem] p-8 border-2 border-[var(--border-color)] shadow-2xl relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

                    <div className="text-center mb-8 relative z-10">
                        <div className="w-20 h-20 bg-amber-400/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-10 h-10 fill-current" />
                        </div>
                        <h3 className="text-2xl font-black text-[var(--text-primary)] mb-2">كيف كانت تجربتك؟</h3>
                        <p className="text-[var(--text-secondary)] font-bold">رأيك يهمنا ويساعدنا على تطوير المحتوى</p>
                    </div>

                    <div className="flex justify-center gap-2 mb-8" dir="ltr">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                className="transition-all duration-200 hover:scale-110"
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(rating)}
                                onClick={() => setRating(star)}
                            >
                                <Star
                                    className={clsx(
                                        "w-10 h-10 transition-colors",
                                        star <= (hover || rating) ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-700"
                                    )}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <textarea
                            placeholder="اكتب تعليقك هنا..."
                            className="w-full h-32 p-4 rounded-2xl bg-[var(--bg-main)] border-2 border-[var(--border-color)] focus:border-cyan-500 outline-none text-[var(--text-primary)] font-bold resize-none transition-all placeholder:text-[var(--text-secondary)]/50"
                        />
                        <button
                            onClick={onClose}
                            disabled={rating === 0}
                            className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5 rtl:-scale-x-100" />
                            إرسال التقييم
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export function CourseDetailsPage() {
    const [activeTab, setActiveTab] = useState<'curriculum' | 'overview'>('curriculum');
    const [expandedModule, setExpandedModule] = useState<number | null>(1);
    const navigate = useNavigate();

    // Modal States
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const handlePlayVideo = (lesson: any) => {
        if (!lesson.isLocked && lesson.type === 'video') {
            navigate(`/course/${courseDetails.id}/learn/${lesson.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-500" dir="rtl">
            <Navbar />

            {/* Modals */}
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
            />

            {/* Premium Dynamic Banner Header */}
            <div className="relative pt-24 min-h-[550px] flex items-center overflow-hidden">
                {/* Dynamic Banner Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={courseDetails.banner}
                        alt="Banner"
                        className="w-full h-full object-cover scale-105"
                    />
                    {/* Unique Multi-layer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/20 to-transparent" />
                    <div className="absolute inset-0 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2 space-y-8"
                        >
                            <div className="flex flex-wrap gap-3">
                                <span className="px-5 py-2 rounded-xl bg-cyan-500 text-white text-xs font-black shadow-lg shadow-cyan-500/20">الثانوية العامة</span>
                                <span className="px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white text-xs font-black border border-white/20">الصف الثالث</span>
                            </div>

                            <h1
                                className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-white drop-shadow-lg max-w-4xl py-4 tracking-wide"
                                style={{ lineHeight: '1.8' }}
                            >
                                {courseDetails.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 py-4">
                                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-3 pr-4 rounded-2xl border border-white/10">
                                    <div className="w-14 h-14 rounded-full border-2 border-cyan-500 overflow-hidden shadow-xl">
                                        <img src={courseDetails.teacher.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-white">{courseDetails.teacher.name}</p>
                                        <p className="text-xs text-cyan-400 font-bold">{courseDetails.teacher.role}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-[2px] h-12 bg-white/10" />
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 bg-amber-400 p-2 px-4 rounded-xl shadow-lg shadow-amber-500/20">
                                        <Star className="w-5 h-5 text-slate-900 fill-slate-900" />
                                        <span className="text-xl font-black text-slate-900">{courseDetails.teacher.rating}</span>
                                    </div>
                                    <button
                                        onClick={() => setIsRatingModalOpen(true)}
                                        className="text-sm text-white/80 font-bold hover:text-cyan-400 transition-colors underline decoration-dotted"
                                    >
                                        (قيم الكورس الآن)
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 -mt-20 relative z-20">
                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Course Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:order-2"
                    >
                        <div className="sticky top-28 bg-[var(--bg-card)] rounded-[3rem] border-2 border-[var(--border-color)] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            <div className="relative aspect-video group cursor-pointer" onClick={() => handlePlayVideo({ ...courseDetails.curriculum[0].lessons[0], type: 'video', isLocked: false })}>
                                <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-20 h-20 rounded-full bg-cyan-500/90 backdrop-blur-lg flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                                        <PlayCircle className="w-10 h-10 fill-current" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-lg font-black">شاهد البرومو</div>
                            </div>

                            <div className="p-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[var(--text-secondary)] font-bold mb-1">سعر الكورس</p>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-black text-cyan-500">300 ج.م</span>
                                            <span className="text-lg text-[var(--text-secondary)] line-through opacity-50">450 ج.م</span>
                                        </div>
                                    </div>
                                    <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-2xl text-xs font-black">خصم 33%</div>
                                </div>

                                <button className="w-full py-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-black text-xl shadow-xl shadow-cyan-500/20 transition-all hover:-translate-y-1 active:scale-95">
                                    اشترك الآن في الكورس
                                </button>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: PlayCircle, label: `${courseDetails.stats.videos} محاضرة`, color: 'text-blue-500', bg: 'bg-blue-500/5' },
                                        { icon: FileText, label: `${courseDetails.stats.files} ملف PDF`, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
                                        { icon: HelpCircle, label: `${courseDetails.stats.exams} اختبارات`, color: 'text-amber-500', bg: 'bg-amber-500/5' },
                                        { icon: Clock, label: courseDetails.stats.duration, color: 'text-cyan-500', bg: 'bg-cyan-500/5' },
                                    ].map((stat, i) => (
                                        <div key={i} className={`flex flex-col gap-2 p-4 rounded-2xl ${stat.bg} border border-transparent hover:border-[var(--border-color)] transition-all`}>
                                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                            <span className="text-xs font-black text-[var(--text-primary)]">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)]">
                                    <button
                                        onClick={() => setIsRatingModalOpen(true)}
                                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-[var(--bg-main)] hover:bg-[var(--border-color)] transition-colors text-[var(--text-primary)] font-black text-sm"
                                    >
                                        <Star className="w-4 h-4" />
                                        تقييم
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-[var(--bg-main)] hover:bg-[var(--border-color)] transition-colors text-[var(--text-primary)] font-black text-sm"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        مشاركة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <div className="lg:order-1 lg:col-span-2 space-y-10">
                        {/* Tab Navigation */}
                        <div className="p-3 bg-[var(--bg-card)] rounded-[2.5rem] border-2 border-[var(--border-color)] shadow-xl flex gap-3">
                            {[
                                { id: 'curriculum', label: 'محتوى الكورس وتوزيعه', icon: LayoutGrid },
                                { id: 'overview', label: 'تفاصيل ومميزات إضافية', icon: Info },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={clsx(
                                        "flex-1 py-5 rounded-[2rem] font-black text-lg transition-all duration-300 flex items-center justify-center gap-3",
                                        activeTab === tab.id
                                            ? "bg-cyan-500 text-white shadow-2xl shadow-cyan-500/30 -translate-y-1"
                                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-main)]"
                                    )}
                                >
                                    <tab.icon className="w-6 h-6" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Sections */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' ? (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="p-10 rounded-[3rem] bg-[var(--bg-card)] border-2 border-[var(--border-color)] shadow-lg group">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                                                <MessageSquare className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-3xl font-black text-[var(--text-primary)] font-display transition-colors">عن هذا الكورس</h3>
                                        </div>
                                        <p className="text-[var(--text-secondary)] leading-[1.8] text-xl font-bold transition-colors">
                                            {courseDetails.description}
                                        </p>
                                    </div>
                                    <div className="p-10 rounded-[3rem] bg-[var(--bg-card)] border-2 border-[var(--border-color)] shadow-lg">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <CheckCircle className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-3xl font-black text-[var(--text-primary)] font-display transition-colors">أهداف المنهج</h3>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {courseDetails.objectives.map((obj, i) => (
                                                <div key={i} className="flex gap-5 p-6 rounded-3xl bg-[var(--bg-main)] border-2 border-[var(--border-color)] hover:border-emerald-500/30 transition-all">
                                                    <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-extrabold text-[var(--text-primary)] transition-colors leading-relaxed">{obj}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="curriculum"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                >
                                    {courseDetails.curriculum.map((module) => (
                                        <div key={module.id} className="relative group">
                                            {/* Timeline Line */}
                                            <div className="absolute top-0 bottom-0 right-10 w-[2px] bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent z-0 hidden sm:block" />

                                            <div
                                                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                                className={clsx(
                                                    "relative z-10 p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 flex items-center justify-between group-hover:shadow-2xl",
                                                    expandedModule === module.id
                                                        ? "bg-cyan-500 border-cyan-500 text-white shadow-xl shadow-cyan-500/30"
                                                        : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-cyan-500 shadow-lg"
                                                )}
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className={clsx(
                                                        "w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl font-black shadow-inner shrink-0",
                                                        expandedModule === module.id ? "bg-white/20" : "bg-[var(--bg-main)] text-cyan-500"
                                                    )}>
                                                        {module.id < 10 ? `0${module.id}` : module.id}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl lg:text-2xl font-black font-display mb-1">{module.title}</h4>
                                                        <p className={clsx("text-sm font-bold opacity-70")}>
                                                            {module.lessons.length} عناصر تعليمية (اختبارات وملفات وفيديوهات)
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={clsx(
                                                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                                                    expandedModule === module.id ? "bg-white/20 rotate-90" : "bg-[var(--bg-main)]"
                                                )}>
                                                    <ChevronRight className="w-7 h-7" />
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {expandedModule === module.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-4 space-y-4 pr-0 sm:pr-20 lg:pr-24 pl-2">
                                                            {module.lessons.map((lesson) => (
                                                                <div key={lesson.id} className="p-6 rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-color)] flex items-center justify-between hover:border-cyan-500 transition-all shadow-md group/lesson">
                                                                    <div className="flex items-center gap-5">
                                                                        <div className="w-14 h-14 rounded-2xl bg-[var(--bg-main)] flex items-center justify-center text-cyan-500 group-hover/lesson:bg-cyan-500 group-hover/lesson:text-white transition-all transform group-hover/lesson:scale-110">
                                                                            {lesson.type === 'video' ? <PlayCircle className="w-7 h-7 transition-all" /> :
                                                                                lesson.type === 'pdf' ? <FileText className="w-7 h-7" /> :
                                                                                    <HelpCircle className="w-7 h-7" />}
                                                                        </div>
                                                                        <div>
                                                                            <h5 className="text-lg font-black text-[var(--text-primary)] transition-colors mb-1">{lesson.title}</h5>
                                                                            <div className="flex items-center gap-3">
                                                                                <span className="text-xs font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
                                                                                    <Clock className="w-3.5 h-3.5" />
                                                                                    {lesson.duration}
                                                                                </span>
                                                                                <span className="w-1 h-1 rounded-full bg-[var(--border-color)]" />
                                                                                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-cyan-500/5 text-cyan-500">{lesson.type === 'video' ? 'فيديو شرح' : lesson.type === 'pdf' ? 'ملف PDF' : 'اختبار'}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {lesson.isLocked ? (
                                                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] bg-[var(--bg-main)] shadow-inner">
                                                                            <Lock className="w-4 h-4 opacity-40" />
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => handlePlayVideo(lesson)}
                                                                            className="px-6 py-3 rounded-2xl bg-cyan-500 text-white text-xs font-black shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
                                                                        >
                                                                            بدء الآن
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ContactSection />
            <Footer />
        </div>
    );
}
