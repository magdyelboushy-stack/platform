// ============================================================
// ExamResultsSection - نتائج الامتحانات
// ============================================================

import { ExamStats } from '../components/exams/ExamStats';
import { ExamResultsList } from '../components/exams/ExamResultsList';

export function ExamResultsSection() {
    // Zeroed data template as requested (No API/Backend/Mock)
    const exams: any[] = [];
    const totalExams = 0;
    const avgScore = 0;
    const passedExams = 0;
    const passRate = 0;

    return (
        <div className="space-y-12 pb-20 max-w-6xl mx-auto">
            {/* 1. Header Area - Luxe Alignment */}
            <div className="text-right">
                <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-3 font-display tracking-tight transition-colors">
                    نتائج <span className="text-[var(--color-brand)]">الاختبارات</span>
                </h2>
                <div className="h-1.5 w-24 bg-[var(--color-brand)] rounded-full mb-4 shadow-[0_0_15px_rgba(197,160,89,0.4)]" />
                <p className="text-[var(--text-secondary)] font-bold text-lg max-w-2xl leading-relaxed">
                    هنا تجد تحليلاً كاملاً لأدائك في الاختبارات، درجاتك، ونسب النجاح لمساعدتك على التحسن المستمر.
                </p>
            </div>

            {/* 2. Stats Module */}
            <ExamStats
                total={totalExams}
                avgScore={avgScore}
                passed={passedExams}
                passRate={passRate}
            />

            {/* 3. Main Results Repository */}
            <ExamResultsList results={exams} />

            {/* Decorative Element */}
            <div className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </div>
    );
}
