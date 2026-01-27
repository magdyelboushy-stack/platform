// ============================================================
// CoursesSection - عرض كورسات الطالب
// ============================================================

import { CourseStats } from '../components/courses/CourseStats';
import { CourseList } from '../components/courses/CourseList';

export function CoursesSection() {
    // Zeroed data template as requested (No API/Backend)
    const courses = [];
    const activeCoursesCount = 0;
    const completedCoursesCount = 0;
    const avgProgress = 0;

    return (
        <div className="space-y-12 pb-20 max-w-6xl mx-auto">
            {/* 1. Header Area - Luxe Alignment */}
            <div className="text-right">
                <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-3 font-display tracking-tight transition-colors">
                    إدارة <span className="text-[var(--color-brand)]">كورساتي</span>
                </h2>
                <div className="h-1.5 w-24 bg-[var(--color-brand)] rounded-full mb-4 shadow-[0_0_15px_rgba(197,160,89,0.4)]" />
                <p className="text-[var(--text-secondary)] font-bold text-lg max-w-2xl leading-relaxed">
                    هنا تجد جميع الكورسات التي قمت بالاشتراك فيها، تابع تقدمك وانجز دروسك للوصول إلى القمة.
                </p>
            </div>

            {/* 2. Stats Module */}
            <CourseStats
                total={courses.length}
                active={activeCoursesCount}
                completed={completedCoursesCount}
                averageProgress={avgProgress}
            />

            {/* 3. Main Course Repository (Clean List) */}
            <CourseList courses={[]} />

            {/* Decorative Element */}
            <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </div>
    );
}
