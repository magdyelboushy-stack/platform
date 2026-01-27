// ============================================================
// Edit Course Page - The Builder (Enhanced with integrated Selectors)
// ============================================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowRight, Plus, GripVertical, Video, Trash2, Edit2, ChevronDown,
    FileText, HelpCircle, Upload, Save, Image as ImageIcon, Clock,
    LayoutList, CheckCircle, Search, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LessonType = 'video' | 'pdf' | 'exam';

interface Lesson {
    id: number;
    title: string;
    type: LessonType;
    duration?: string;
    contentId?: string; // ID of the linked Exam or File
}

// Mock Data for Selectors
const mockAvailableExams = [
    { id: '1', title: 'امتحان شامل على الوحدة الأولى', questions: 20 },
    { id: '2', title: 'اختبار سريع - المبتدأ والخبر', questions: 10 },
];

const mockAvailableFiles = [
    { id: '1', name: 'ملخص الوحدة الأولى - نحو.pdf', size: '2.4 MB' },
    { id: '2', name: 'مذكرة المراجعة النهائية.pdf', size: '5.1 MB' },
];

export function EditCoursePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');
    const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

    // Mock Course Data
    const [sections, setSections] = useState([
        {
            id: 1,
            title: 'الوحدة الأولى: أساسيات النحو',
            lessons: [
                { id: 1, title: 'شرح درس المبتدأ والخبر', type: 'video', duration: '10:00' },
                { id: 2, title: 'ملخص الوحدة الأولى PDF', type: 'pdf', duration: '5 صفحات', contentId: '1' },
                { id: 3, title: 'امتحان على الوحدة الأولى', type: 'exam', duration: '20 سؤال', contentId: '1' },
            ] as Lesson[]
        }
    ]);

    // Derived state for the selected lesson form
    const selectedLesson = sections
        .flatMap(s => s.lessons)
        .find(l => l.id === selectedLessonId);

    // Helper to add a new section
    const handleAddSection = () => {
        const newId = Date.now();
        setSections([
            ...sections,
            {
                id: newId,
                title: 'قسم جديد',
                lessons: []
            }
        ]);
    };

    // Helper to delete a section
    const handleDeleteSection = (sectionId: number) => {
        if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
            setSections(sections.filter(s => s.id !== sectionId));
        }
    };

    // Helper to add a new lesson to a section
    const handleAddLesson = (sectionId: number) => {
        const newLessonId = Date.now();
        const newLesson: Lesson = {
            id: newLessonId,
            title: 'درس جديد',
            type: 'video', // Default type
            duration: '00:00'
        };

        setSections(sections.map(section => {
            if (section.id === sectionId) {
                return { ...section, lessons: [...section.lessons, newLesson] };
            }
            return section;
        }));

        // Auto-select the new lesson
        setSelectedLessonId(newLessonId);
    };

    // Helper to update local state (simulating API update)
    const updateActiveLesson = (updates: Partial<Lesson>) => {
        if (!selectedLesson) return;
        setSections(sections.map(section => ({
            ...section,
            lessons: section.lessons.map(lesson =>
                lesson.id === selectedLesson.id ? { ...lesson, ...updates } : lesson
            )
        })));
    };

    const getIconForType = (type: LessonType) => {
        switch (type) {
            case 'video': return <Video className="w-4 h-4" />;
            case 'pdf': return <FileText className="w-4 h-4" />;
            case 'exam': return <HelpCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/teacher/courses')}
                        className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-[var(--text-primary)]">شرح منهج النحو 2024</h1>
                            <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20">مسودة</span>
                        </div>
                        <p className="text-[var(--text-secondary)] font-medium text-sm">آخر تعديل: منذ دقيقتين</p>
                    </div>
                </div>

                <div className="flex gap-2 bg-[var(--bg-card)] p-1 rounded-xl border border-[var(--border-color)]">
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-cyan-600 text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                        المحتوى والدروس
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-cyan-600 text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                        الإعدادات والنشر
                    </button>
                </div>
            </div>

            {/* Content Builder Area */}
            {activeTab === 'content' ? (
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
                    {/* Left: Sections & Lessons List */}
                    <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden flex flex-col shadow-sm">
                        <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-main)]">
                            <h3 className="font-bold text-[var(--text-primary)]">محتوى الكورس</h3>
                            <button
                                onClick={handleAddSection}
                                className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                قسم جديد
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                            {sections.map((section) => (
                                <div key={section.id} className="border border-[var(--border-color)] rounded-xl bg-[var(--bg-main)] overflow-hidden">
                                    <div className="p-4 flex items-center gap-3 bg-[var(--bg-card)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors border-b border-[var(--border-color)]">
                                        <GripVertical className="w-5 h-5 text-[var(--text-secondary)] cursor-move" />
                                        <input
                                            type="text"
                                            defaultValue={section.title}
                                            className="font-bold text-[var(--text-primary)] bg-transparent border-none outline-none flex-1"
                                            onBlur={(e) => {
                                                setSections(sections.map(s => s.id === section.id ? { ...s, title: e.target.value } : s));
                                            }}
                                        />
                                        <div className="mr-auto flex items-center gap-2">
                                            <button
                                                onClick={() => handleDeleteSection(section.id)}
                                                className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Lessons Inside Section */}
                                    <div className="p-3 space-y-2 bg-[var(--bg-main)]/30">
                                        {section.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                onClick={() => setSelectedLessonId(lesson.id)}
                                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all group ${selectedLessonId === lesson.id
                                                    ? 'bg-[var(--bg-card)] border-cyan-500 shadow-md'
                                                    : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-cyan-500/30'
                                                    }`}
                                            >
                                                <GripVertical className="w-4 h-4 text-[var(--text-secondary)] cursor-move opacity-0 group-hover:opacity-100" />
                                                <div className={`p-2 rounded-lg ${lesson.type === 'video' ? 'bg-blue-500/10 text-blue-500' :
                                                    lesson.type === 'pdf' ? 'bg-red-500/10 text-red-500' :
                                                        'bg-emerald-500/10 text-emerald-500'
                                                    }`}>
                                                    {getIconForType(lesson.type)}
                                                </div>
                                                <span className={`text-sm font-bold ${selectedLessonId === lesson.id ? 'text-cyan-500' : 'text-[var(--text-primary)]'}`}>
                                                    {lesson.title}
                                                </span>
                                                <span className="mr-auto text-xs text-[var(--text-secondary)] font-medium bg-[var(--bg-main)] px-2 py-1 rounded-lg">
                                                    {lesson.duration}
                                                </span>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => handleAddLesson(section.id)}
                                            className="w-full py-3 border border-dashed border-[var(--border-color)] rounded-xl text-xs font-bold text-[var(--text-secondary)] hover:text-cyan-500 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all flex items-center justify-center gap-2 mt-2"
                                        >
                                            <Plus className="w-3 h-3" />
                                            إضافة درس جديد
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Lesson Editor Form */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col shadow-sm">
                        {selectedLesson ? (
                            <div className="flex-1 flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)]">تعديل الدرس</h3>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                // Handle delete
                                                setSections(sections.map(s => ({
                                                    ...s,
                                                    lessons: s.lessons.filter(l => l.id !== selectedLesson.id)
                                                })));
                                                setSelectedLessonId(null);
                                            }}
                                            className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                            title="حذف الدرس"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <span className="text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-main)] px-3 py-1 rounded-lg">ID: {selectedLesson.id}</span>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pl-2">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2">عنوان الدرس</label>
                                        <input
                                            type="text"
                                            defaultValue={selectedLesson.title}
                                            onChange={(e) => updateActiveLesson({ title: e.target.value })}
                                            className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] text-sm focus:border-cyan-500 outline-none transition-colors font-bold"
                                        />
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2">نوع المحتوى</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(['video', 'pdf', 'exam'] as LessonType[]).map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => updateActiveLesson({ type })}
                                                    className={`py-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${selectedLesson.type === type
                                                        ? 'bg-cyan-600 text-white border-cyan-600'
                                                        : 'bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-cyan-500/50'
                                                        }`}
                                                >
                                                    {getIconForType(type)}
                                                    {type === 'video' ? 'فيديو' : type === 'pdf' ? 'ملف PDF' : 'امتحان'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dynamic Fields based on Type */}
                                    {selectedLesson.type === 'video' && (
                                        <div className="space-y-6 bg-[var(--bg-main)] p-4 rounded-xl border border-[var(--border-color)]">
                                            {/* Video inputs content from before... (abbreviated for this step as focus is on selectors) */}
                                            {/* I will keep the previous video input logic here for completeness */}
                                            <div>
                                                <label className="block text-xs font-bold text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                                                    <Video className="w-3 h-3" />
                                                    مصدر الفيديو
                                                </label>
                                                <div className="space-y-3">
                                                    <input
                                                        type="text"
                                                        placeholder="رابط الفيديو (Youtube, etc...)"
                                                        className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] text-sm focus:border-cyan-500 outline-none transition-colors dir-ltr text-left"
                                                    />
                                                    <button className="w-full border-2 border-dashed border-[var(--border-color)] rounded-xl p-4 flex items-center justify-center gap-2 hover:border-cyan-500 transition-colors bg-[var(--bg-card)] text-[var(--text-secondary)]">
                                                        <Upload className="w-4 h-4" />
                                                        <span>رفع ملف فيديو (MP4)</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedLesson.type === 'pdf' && (
                                        <div className="space-y-4 bg-[var(--bg-main)] p-4 rounded-xl border border-[var(--border-color)]">
                                            <div className="text-xs font-bold text-[var(--text-secondary)] mb-2">اختر الملف (من مكتبة الملفات)</div>

                                            {/* File Selector Mock */}
                                            <div className="space-y-2">
                                                {mockAvailableFiles.map(file => (
                                                    <div
                                                        key={file.id}
                                                        onClick={() => updateActiveLesson({ contentId: file.id, title: file.name })}
                                                        className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${selectedLesson.contentId === file.id
                                                            ? 'bg-emerald-500/10 border-emerald-500'
                                                            : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-cyan-500/50'
                                                            }`}
                                                    >
                                                        <FileText className={`w-5 h-5 ${selectedLesson.contentId === file.id ? 'text-emerald-500' : 'text-[var(--text-secondary)]'}`} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className={`text-xs font-bold truncate ${selectedLesson.contentId === file.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{file.name}</p>
                                                            <p className="text-[10px] text-[var(--text-secondary)]">{file.size}</p>
                                                        </div>
                                                        {selectedLesson.contentId === file.id && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                                    </div>
                                                ))}
                                            </div>

                                            <button className="w-full py-2 border border-dashed border-[var(--border-color)] rounded-xl text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors flex items-center justify-center gap-2 mt-2">
                                                <Upload className="w-3 h-3" />
                                                رفع ملف جديد للمكتبة
                                            </button>
                                        </div>
                                    )}

                                    {selectedLesson.type === 'exam' && (
                                        <div className="space-y-4 bg-[var(--bg-main)] p-4 rounded-xl border border-[var(--border-color)]">
                                            <div className="text-xs font-bold text-[var(--text-secondary)] mb-2">اختر الامتحان (من بنك الأسئلة)</div>

                                            {/* Exam Selector Mock */}
                                            <div className="space-y-2">
                                                {mockAvailableExams.map(exam => (
                                                    <div
                                                        key={exam.id}
                                                        onClick={() => updateActiveLesson({ contentId: exam.id, title: exam.title })}
                                                        className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${selectedLesson.contentId === exam.id
                                                            ? 'bg-emerald-500/10 border-emerald-500'
                                                            : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-cyan-500/50'
                                                            }`}
                                                    >
                                                        <HelpCircle className={`w-5 h-5 ${selectedLesson.contentId === exam.id ? 'text-emerald-500' : 'text-[var(--text-secondary)]'}`} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className={`text-xs font-bold truncate ${selectedLesson.contentId === exam.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{exam.title}</p>
                                                            <p className="text-[10px] text-[var(--text-secondary)]">{exam.questions} سؤال</p>
                                                        </div>
                                                        {selectedLesson.contentId === exam.id && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => navigate('/teacher/exams/new')}
                                                className="w-full py-2 border border-dashed border-[var(--border-color)] rounded-xl text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors flex items-center justify-center gap-2 mt-2"
                                            >
                                                <Plus className="w-3 h-3" />
                                                إنشاء امتحان جديد
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Save Actions */}
                                <div className="mt-auto pt-6 border-t border-[var(--border-color)] flex gap-3">
                                    <button className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
                                        <Save className="w-4 h-4" />
                                        حفظ التعديلات
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center h-full animate-in fade-in duration-500">
                                <div className="w-24 h-24 rounded-3xl bg-[var(--bg-main)] flex items-center justify-center text-[var(--text-secondary)] mb-6 shadow-inner border border-[var(--border-color)]">
                                    <Edit2 className="w-10 h-10 opacity-50" />
                                </div>
                                <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">تعديل الدرس</h3>
                                <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                                    قم باختيار درس من القائمة اليمنى لتعديل محتواه، رفع الفيديوهات، أو إضافة ملفات.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 max-w-2xl mx-auto w-full">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">إعدادات الكورس والنشر</h3>
                    <p className="text-[var(--text-secondary)]">إعدادات التسعير، الوصف، والكلمات المفتاحية (قريباً)..</p>
                </div>
            )}
        </div>
    );
}
