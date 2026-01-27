// ============================================================
// CoursePlayerPage - Functional Controls & Protection
// ============================================================

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Play,
    ChevronRight,
    CheckCircle,
    Menu,
    X,
    FileText,
    HelpCircle,
    Clock,
    Feather
} from 'lucide-react';
import { clsx } from 'clsx';
import { HLSPlayer } from '../player/components/HLSPlayer';

// Mock Data
const courseData = {
    id: 1,
    title: "النحو الشامل للثانوية العامة",
    curriculum: [
        {
            id: 1,
            title: "الأسبوع الأول: همزة القطع وألف الوصل",
            lessons: [
                { id: 1, title: "شرح همزة القطع وألف الوصل", duration: "45:00", type: 'video', isCompleted: true, videoId: "https://vz-b7925bda-68a.b-cdn.net/fd102e93-b807-4c3b-8a69-7ba430a692b1/playlist.m3u8" },
                { id: 2, title: "تدريبات على الوحدة الأولى", duration: "10 صفحات", type: 'pdf', isCompleted: true },
                { id: 3, title: "اختبار إلكتروني (همزات)", duration: "20 سؤال", type: 'exam', isCompleted: false },
            ]
        },
        {
            id: 2,
            title: "الأسبوع الثاني: المشتقات العاملة",
            lessons: [
                { id: 4, title: "اسم الفاعل وصيغ المبالغة", duration: "01:30:00", type: 'video', isCompleted: false, videoId: "ScMzIvxBSi4" },
                { id: 5, title: "اسم المفعول وعمله", duration: "50:00", type: 'video', isCompleted: false, videoId: "ScMzIvxBSi4" },
                { id: 6, title: "مذكرة تدريبات المشتقات", duration: "15 صفحة", type: 'pdf', isCompleted: false },
            ]
        },
        {
            id: 3,
            title: "الأسبوع الثالث: المصادر",
            lessons: [
                { id: 7, title: "المصادر الصريحة (ثلاثي ورباعي)", duration: "60:00", type: 'video', isCompleted: false, videoId: "ScMzIvxBSi4" },
            ]
        },
        {
            id: 4,
            title: "الأسبوع الرابع: المصادر المؤولة",
            lessons: [
                { id: 8, title: "المصادر المؤولة وإعرابها", duration: "45:00", type: 'video', isCompleted: false, videoId: "ScMzIvxBSi4" },
            ]
        },
        {
            id: 5,
            title: "الأسبوع الخامس: الممنوع من الصرف",
            lessons: [
                { id: 9, title: "علل المنع من الصرف", duration: "55:00", type: 'video', isCompleted: false, videoId: "ScMzIvxBSi4" },
            ]
        }
    ]
};

export function CoursePlayerPage() {
    const { courseId, lessonId } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<'content' | 'attachments'>('content');

    // Derived state
    const currentLessonId = parseInt(lessonId || '1');
    const currentLesson = courseData.curriculum
        .flatMap(m => m.lessons)
        .find(l => l.id === currentLessonId) || courseData.curriculum[0].lessons[0];

    return (
        <div className="h-screen flex flex-col bg-[var(--bg-main)] overflow-hidden transition-colors duration-300" dir="rtl">
            {/* Header - Theme Aware */}
            <header className="h-16 shrink-0 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between px-6 z-30 relative shadow-sm">
                <div className="flex items-center gap-4">
                    <Link to={`/course/${courseId}`} className="p-2 hover:bg-[var(--bg-card)] rounded-full transition-colors">
                        <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
                    </Link>
                    <div>
                        <h1 className="text-sm font-bold text-[var(--text-secondary)] mb-0.5">أنت تشاهد</h1>
                        <p className="text-base font-black text-[var(--text-primary)]">{currentLesson.title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all flex items-center gap-2 px-4 whitespace-nowrap"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        <span className="text-xs font-bold hidden sm:block whitespace-nowrap">{isSidebarOpen ? 'إخفاء القائمة' : 'إظهار القائمة'}</span>
                    </button>
                    <button className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 whitespace-nowrap">
                        <CheckCircle className="w-4 h-4" />
                        <span>اكتمل الدرس</span>
                    </button>
                </div>
            </header>

            {/* Split Layout */}
            <div className="flex-1 flex overflow-hidden relative z-10">

                {/* Main Content (Video Area) */}
                <main className="flex-1 flex flex-col relative min-w-0 h-full overflow-y-auto custom-scrollbar bg-[var(--bg-main)]">

                    {/* Simple Iframe Player */}
                    <div className="w-full bg-black aspect-video relative z-10 shadow-2xl flex items-center justify-center">
                        {currentLesson.type === 'video' ? (
                            <div className="absolute inset-0 bg-black">
                                {currentLesson.videoId?.includes('.m3u8') ? (
                                    <HLSPlayer
                                        src={currentLesson.videoId}
                                        onComplete={() => { /* Lesson Completed logic */ }}
                                    />
                                ) : (
                                    <iframe
                                        src={currentLesson.videoId || ''}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                                        referrerPolicy="origin"
                                        loading="eager"
                                        allowFullScreen={true}
                                    />
                                )}
                            </div>
                        ) : currentLesson.type === 'pdf' ? (
                            // PDF Content Viewer
                            <div className="w-full h-full flex flex-col bg-[var(--bg-secondary)]">
                                {/* PDF Header */}
                                <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                            <FileText className="w-7 h-7 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-[var(--text-primary)]">{currentLesson.title}</h3>
                                            <p className="text-sm font-bold text-[var(--text-secondary)]">{currentLesson.duration}</p>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        download
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-black hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                                    >
                                        <FileText className="w-5 h-5" />
                                        تحميل الملف
                                    </a>
                                </div>

                                {/* PDF Preview Area */}
                                <div className="flex-1 flex items-center justify-center p-8">
                                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-12 text-center max-w-lg w-full shadow-xl">
                                        <div className="w-24 h-24 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
                                            <FileText className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3">{currentLesson.title}</h3>
                                        <p className="text-[var(--text-secondary)] font-bold mb-8">
                                            ملف PDF - {currentLesson.duration}
                                        </p>
                                        <div className="flex flex-col gap-4">
                                            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-lg hover:shadow-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3">
                                                <FileText className="w-6 h-6" />
                                                فتح المعاينة
                                            </button>
                                            <a
                                                href="#"
                                                download
                                                className="w-full py-4 rounded-xl bg-[var(--bg-main)] border-2 border-[var(--border-color)] text-[var(--text-primary)] font-black text-lg hover:border-red-500 transition-all flex items-center justify-center gap-3"
                                            >
                                                <FileText className="w-6 h-6" />
                                                تحميل مباشر
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Exam - Should redirect, but fallback display
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-secondary)] gap-6">
                                <div className="p-8 rounded-full bg-amber-500/10 border border-amber-500/20">
                                    <HelpCircle className="w-16 h-16 text-amber-500" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-[var(--text-primary)] mb-2">اختبار إلكتروني</h3>
                                    <p className="font-bold">اضغط على الزر أدناه لبدء الاختبار</p>
                                </div>
                                <div className="flex gap-4">
                                    <Link
                                        to={`/course/${courseId}/exam/${currentLesson.id}`}
                                        className="px-8 py-3 rounded-full bg-amber-500 text-white font-black hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                                    >
                                        بدء الاختبار
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content Scrollable Area - Theme Aware */}
                    <div className="flex-1 p-8 pb-32">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex gap-8 border-b border-[var(--border-color)] mb-8 bg-[var(--bg-main)] pt-4 transition-colors">
                                <button
                                    onClick={() => setActiveTab('content')}
                                    className={clsx("pb-4 text-lg font-black relative transition-colors", activeTab === 'content' ? "text-cyan-500" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")}
                                >
                                    نظرة عامة
                                    {activeTab === 'content' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 rounded-t-full" />}
                                </button>
                                <button
                                    onClick={() => setActiveTab('attachments')}
                                    className={clsx("pb-4 text-lg font-black relative transition-colors", activeTab === 'attachments' ? "text-cyan-500" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")}
                                >
                                    المرفقات والمصادر
                                    {activeTab === 'attachments' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 rounded-t-full" />}
                                </button>
                            </div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-lg prose-headings:font-black prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] max-w-none">
                                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                    <Feather className="w-8 h-8 text-cyan-500" />
                                    <span>تفاصيل الدرس والملاحظات</span>
                                </h2>
                                <p className="text-lg leading-loose font-bold mb-6">
                                    في هذا الفيديو، يشرح الأستاذ أحمد راضي الأساسيات الهامة لقواعد همزة القطع وألف الوصل.
                                    يرجى التركيز على النقاط التالية:
                                </p>
                                <ul className="space-y-4 list-none p-0">
                                    {[
                                        "الفرق بين همزة القطع وألف الوصل في النطق والكتابة.",
                                        "مواضع همزة القطع في الأسماء والحروف والأفعال.",
                                        "مواضع ألف الوصل القياسية والسماعية.",
                                        "الملاحظات الشاذة والتريكات الامتحانية."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
                                            <span className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white font-black text-sm shrink-0">{i + 1}</span>
                                            <span className="font-bold">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-12 p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                                    <h3 className="text-xl font-black text-emerald-500 mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-6 h-6" />
                                        واجب المحاضرة
                                    </h3>
                                    <p className="font-bold mb-4 text-[var(--text-secondary)]">
                                        قم بحل التدريبات من صفحة 15 إلى 20 في كتاب الشرح (البيان).
                                        سيتم مراجعة الواجب في بداية المحاضرة القادمة.
                                    </p>
                                    <button className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-black hover:bg-emerald-600 transition-all">
                                        تحميل ملزمة الواجب (PDF)
                                    </button>
                                </div>
                                <div className="h-20" />
                            </motion.div>
                        </div>
                    </div>
                </main>

                {/* Sidebar (Right Side) - Theme Aware */}
                <motion.aside
                    initial={false}
                    animate={{ width: isSidebarOpen ? 350 : 0, opacity: isSidebarOpen ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="border-r border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden shrink-0 flex flex-col h-full sticky top-0 right-0 transition-colors"
                >
                    <div className="w-[350px] flex flex-col h-full">
                        <div className="p-6 border-b border-[var(--border-color)]">
                            <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">محتوى الكورس</h3>
                            <div className="w-full bg-[var(--bg-main)] rounded-full h-1.5 mt-4 overflow-hidden border border-[var(--border-color)]">
                                <div className="bg-cyan-500 h-full w-[25%]" />
                            </div>
                            <p className="text-xs text-cyan-500 font-bold mt-2 text-left">2 مكتمل من 10</p>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                            {courseData.curriculum.map((week) => (
                                <div key={week.id}>
                                    <h4 className="text-xs font-black text-[var(--text-secondary)] opacity-70 uppercase mb-4 px-2 tracking-wider flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                        {week.title}
                                    </h4>
                                    <div className="space-y-2">
                                        {week.lessons.map((lesson) => {
                                            // Determine the correct route based on lesson type
                                            const lessonRoute = lesson.type === 'exam'
                                                ? `/course/${courseId}/exam/${lesson.id}`
                                                : `/course/${courseId}/learn/${lesson.id}`;

                                            return (
                                                <Link
                                                    key={lesson.id}
                                                    to={lessonRoute}
                                                    className={clsx(
                                                        "flex items-center gap-4 p-4 rounded-xl transition-all border group",
                                                        currentLesson.id === lesson.id && lesson.type !== 'exam'
                                                            ? "bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20"
                                                            : "bg-[var(--bg-card)] border-transparent hover:border-[var(--border-color)] hover:bg-[var(--bg-main)]"
                                                    )}
                                                >
                                                    <div className={clsx(
                                                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                                                        lesson.isCompleted ? "bg-emerald-500 text-white" :
                                                            lesson.type === 'exam' ? "bg-amber-500/20 text-amber-500" :
                                                                currentLesson.id === lesson.id ? "bg-white/20 text-white" : "bg-[var(--bg-main)] text-[var(--text-secondary)]"
                                                    )}>
                                                        {lesson.isCompleted ? <CheckCircle className="w-5 h-5" /> :
                                                            lesson.type === 'video' ? <Play className="w-4 h-4 fill-current" /> :
                                                                lesson.type === 'exam' ? <HelpCircle className="w-4 h-4" /> :
                                                                    <FileText className="w-4 h-4" />}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <p className={clsx(
                                                            "text-sm font-black truncate mb-1 transition-colors",
                                                            currentLesson.id === lesson.id && lesson.type !== 'exam' ? "text-white" : "text-[var(--text-primary)]"
                                                        )}>
                                                            {lesson.title}
                                                        </p>
                                                        <div className={clsx(
                                                            "flex items-center gap-3 text-[10px] font-bold",
                                                            currentLesson.id === lesson.id && lesson.type !== 'exam' ? "text-white/80" : "text-[var(--text-secondary)]"
                                                        )}>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {lesson.duration}
                                                            </span>
                                                            {lesson.type === 'exam' && <span className="text-amber-500 font-black">اختبار</span>}
                                                            {lesson.type === 'pdf' && <span className="text-red-500 font-black">PDF</span>}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.aside>

            </div>
        </div>
    );
}
