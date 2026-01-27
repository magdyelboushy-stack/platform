// ============================================================
// Create New Course Page
// ============================================================

import { useState } from 'react';
import { ArrowRight, Image as ImageIcon, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CreateCoursePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/teacher/courses/draft-123'); // Go to editor
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/teacher/courses')}
                    className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)]">إنشاء كورس جديد</h1>
                    <p className="text-[var(--text-secondary)] font-medium">ابدأ رحلة تعليمية جديدة بملء البيانات الأساسية للكورس.</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info Card */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">عنوان الكورس</label>
                        <input
                            type="text"
                            placeholder="مثال: شرح النحو الشامل للصف الثالث الثانوي"
                            className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">وصف قصير</label>
                        <textarea
                            rows={4}
                            placeholder="اكتب وصفاً مختصراً عما سيتعلمه الطلاب في هذا الكورس..."
                            className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors resize-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">السعر (ج.م)</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="0"
                                className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">المادة الدراسية</label>
                            <select className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors">
                                <option>اللغة العربية</option>
                                <option>التاريخ</option>
                                <option>الجغرافيا</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Upload */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8">
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-4">صورة الغلاف</label>
                    <div className="border-2 border-dashed border-[var(--border-color)] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-cyan-500 transition-colors cursor-pointer group bg-[var(--bg-main)]">
                        <div className="w-16 h-16 rounded-full bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-cyan-500 transition-colors shadow-sm">
                            <ImageIcon className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-[var(--text-primary)]">اضغط لرفع صورة</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">PNG, JPG حتى 5 ميجابايت (1920x1080 مستحسن)</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-[var(--border-color)]">
                    <button
                        type="button"
                        onClick={() => navigate('/teacher/courses')}
                        className="px-6 py-3 bg-[var(--bg-card)] hover:bg-[var(--bg-main)] text-[var(--text-primary)] rounded-xl font-bold border border-[var(--border-color)] transition-colors"
                    >
                        إلغاء
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>جاري الإنشاء...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span>حفظ ومتابعة للمحتوى</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
