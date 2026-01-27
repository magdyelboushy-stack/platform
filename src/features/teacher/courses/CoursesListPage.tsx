// ============================================================
// Teacher Courses List Page
// ============================================================

import { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Clock, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Courses data - to be fetched from API
const courses: any[] = [];

export function CoursesListPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">إدارة الكورسات</h1>
                    <p className="text-[var(--text-secondary)] font-medium">قم بإدارة محتوى كورساتك، إضافة دروس جديدة، ومتابعة الاشعارات.</p>
                </div>
                <button
                    onClick={() => navigate('/teacher/courses/new')}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-1"
                >
                    <Plus className="w-5 h-5" />
                    <span>كورس جديد</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                    <input
                        type="text"
                        placeholder="ابحث عن كورس..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-12 pl-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors"
                    />
                </div>
                <button className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold flex items-center gap-2 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>تصفية</span>
                </button>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course: any) => (
                    <div
                        key={course.id}
                        className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 cursor-pointer flex flex-col"
                        onClick={() => navigate(`/teacher/courses/${course.id}`)}
                    >
                        {/* Thumbnail */}
                        <div className="aspect-video relative overflow-hidden bg-[var(--bg-main)]">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-md ${course.status === 'published'
                                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/20'
                                    : 'bg-amber-500/20 text-amber-500 border border-amber-500/20'
                                    }`}>
                                    {course.status === 'published' ? 'منشور' : 'مسودة'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-black text-[var(--text-primary)] mb-3 line-clamp-2 leading-relaxed group-hover:text-cyan-500 transition-colors">
                                {course.title}
                            </h3>

                            <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] font-bold mb-6">
                                <div className="flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4 text-cyan-500" />
                                    <span>{course.lessons} درس</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-cyan-500" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[var(--text-secondary)]" />
                                    <span className="text-sm font-bold text-[var(--text-primary)]">{course.students}</span>
                                </div>
                                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{course.rating || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* New Course Card (Empty State) */}
                <button
                    onClick={() => navigate('/teacher/courses/new')}
                    className="border-2 border-dashed border-[var(--border-color)] rounded-2xl flex flex-col items-center justify-center gap-4 p-8 text-[var(--text-secondary)] hover:border-cyan-500 hover:text-cyan-500 hover:bg-cyan-500/5 transition-all group min-h-[300px]"
                >
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-main)] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-[var(--border-color)]">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-lg">أضف كورس جديد</span>
                </button>
            </div>
        </div>
    );
}
