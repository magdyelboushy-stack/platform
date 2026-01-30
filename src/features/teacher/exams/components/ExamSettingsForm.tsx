import { Clock, CheckCircle, FileText, Target } from 'lucide-react';

interface ExamSettingsFormProps {
    title: string;
    setTitle: (v: string) => void;
    duration: number;
    setDuration: (v: number) => void;
    passScore: number;
    setPassScore: (v: number) => void;
}

export function ExamSettingsForm({
    title, setTitle,
    duration, setDuration,
    passScore, setPassScore
}: ExamSettingsFormProps) {
    return (
        <div className="max-w-4xl mx-auto w-full space-y-8 py-10 animate-in slide-in-from-bottom-6">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] p-10 shadow-xl shadow-black/5">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[var(--border-color)]">
                    <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
                        <FileText className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-[var(--text-primary)]">إعدادات الامتحان الأساسية</h3>
                        <p className="text-[var(--text-secondary)] font-bold">تحكم في هوية الامتحان ومعايير النجاح</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Exam Title */}
                    <div className="group">
                        <label className="block text-sm font-black text-[var(--text-secondary)] mb-3 mr-1 transition-colors group-focus-within:text-[#C5A059]">
                            عنوان الامتحان العريض
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-16 px-6 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] text-lg font-black focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 outline-none transition-all"
                            placeholder="مثال: الاختبار الشامل لمادة الكيمياء - الفصل الأول"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Duration */}
                        <div className="group">
                            <label className="block text-sm font-black text-[var(--text-secondary)] mb-3 mr-1 transition-colors group-focus-within:text-[#C5A059]">
                                مدة الامتحان (دقيقة)
                            </label>
                            <div className="relative">
                                <Clock className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--text-secondary)] group-focus-within:text-[#C5A059] transition-colors" />
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="w-full h-16 pr-14 pl-6 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] font-black focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 outline-none transition-all"
                                />
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black text-[var(--text-secondary)] opacity-50">MIN</span>
                            </div>
                        </div>

                        {/* Pass Score */}
                        <div className="group">
                            <label className="block text-sm font-black text-[var(--text-secondary)] mb-3 mr-1 transition-colors group-focus-within:text-[#C5A059]">
                                درجة النجاح المطلوبة (%)
                            </label>
                            <div className="relative">
                                <Target className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--text-secondary)] group-focus-within:text-[#C5A059] transition-colors" />
                                <input
                                    type="number"
                                    value={passScore}
                                    onChange={(e) => setPassScore(Number(e.target.value))}
                                    className="w-full h-16 pr-14 pl-6 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] font-black focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 outline-none transition-all"
                                />
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black text-[var(--text-secondary)] opacity-50">PERCENT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hint Card */}
            <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                    <CheckCircle className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-amber-700/80 leading-relaxed">
                    تأكد من تحديد درجة نجاح مناسبة لمستوى الامتحان. الطلاب الذين يحصلون على درجة أقل من هذه النسبة سيتم تصنيفهم بأنهم "لم يحالفهم الحظ" في نتائج الامتحان.
                </p>
            </div>
        </div>
    );
}
