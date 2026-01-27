// ============================================================
// Teacher Activation Codes Manager (Coupons)
// ============================================================

import { useState } from 'react';
import {
    Plus, Search, Filter, Ticket, Copy, Download,
    Printer, CheckCircle, XCircle, Clock, RefreshCw
} from 'lucide-react';

// Code batches data - to be fetched from API
const batches: any[] = [];

export function CodesManagerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">أكواد التفعيل (Coupons)</h1>
                    <p className="text-[var(--text-secondary)] font-medium">توليد وإدارة كروت الشحن وأكواد الخصم للطلاب.</p>
                </div>
                <button
                    onClick={() => setIsGenerating(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-1"
                >
                    <Plus className="w-5 h-5" />
                    <span>توليد أكواد جديدة</span>
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-cyan-500">
                        <Ticket className="w-20 h-20 transform translate-x-4 -translate-y-4" />
                    </div>
                    <p className="text-[var(--text-secondary)] text-xs font-bold mb-1">إجمالي الأكواد</p>
                    <h3 className="text-2xl font-black text-[var(--text-primary)]">0</h3>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-500">
                        <CheckCircle className="w-20 h-20 transform translate-x-4 -translate-y-4" />
                    </div>
                    <p className="text-[var(--text-secondary)] text-xs font-bold mb-1">تم استخدامها</p>
                    <h3 className="text-2xl font-black text-emerald-500">0</h3>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-amber-500">
                        <Clock className="w-20 h-20 transform translate-x-4 -translate-y-4" />
                    </div>
                    <p className="text-[var(--text-secondary)] text-xs font-bold mb-1">غير مستخدمة</p>
                    <h3 className="text-2xl font-black text-amber-500">0</h3>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500">
                        <XCircle className="w-20 h-20 transform translate-x-4 -translate-y-4" />
                    </div>
                    <p className="text-[var(--text-secondary)] text-xs font-bold mb-1">منتهية الصلاحية</p>
                    <h3 className="text-2xl font-black text-red-500">0</h3>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 bg-[var(--bg-main)]">
                    <div className="flex-1 relative">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                        <input
                            type="text"
                            placeholder="بحث عن كود أو مجموعة..."
                            className="w-full pr-12 pl-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors"
                        />
                    </div>
                    <button className="px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold flex items-center gap-2 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>تصفية</span>
                    </button>
                </div>

                {/* Batches List */}
                <div className="divide-y divide-[var(--border-color)]">
                    {batches.map((batch: any) => (
                        <div key={batch.id} className="p-6 hover:bg-[var(--bg-main)] transition-colors group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-[var(--text-primary)] text-lg">{batch.name}</h3>
                                        <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${batch.status === 'active'
                                            ? 'bg-emerald-500/10 text-emerald-500'
                                            : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {batch.status === 'active' ? 'نشط' : 'منتهي'}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-[var(--text-secondary)] flex items-center gap-2">
                                        <span>{batch.course}</span>
                                        <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
                                        <span>{batch.createdAt}</span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-500 hover:border-cyan-500 transition-colors" title="طباعة">
                                        <Printer className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-emerald-500 hover:border-emerald-500 transition-colors" title="تحميل Excel">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="bg-[var(--bg-card)] rounded-full h-2.5 border border-[var(--border-color)] overflow-hidden mb-2">
                                <div
                                    className="h-full bg-cyan-500 rounded-full"
                                    style={{ width: `${(batch.used / batch.count) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs font-bold text-[var(--text-secondary)]">
                                <span>تم استخدام {batch.used} من {batch.count}</span>
                                <span>القيمة: {batch.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Generator Modal (Simplified) */}
            {isGenerating && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] w-full max-w-lg rounded-2xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-black text-[var(--text-primary)] mb-6">توليد أكواد جديدة</h2>

                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">اسم المجموعة (للتنظيم)</label>
                                <input type="text" placeholder="مثال: دفعة سنتر الجيزة" className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">الكورس</label>
                                <select className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none">
                                    <option>شرح منهج النحو 2024</option>
                                    <option>مراجعة ليلة الامتحان</option>
                                    <option>الكل (شحن محفظة)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">عدد الأكواد</label>
                                    <input type="number" defaultValue={50} className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">القيمة (ج.م)</label>
                                    <input type="number" defaultValue={450} className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setIsGenerating(false)} className="flex-1 py-3 bg-[var(--bg-main)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl font-bold text-[var(--text-secondary)]">إلغاء</button>
                            <button className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20">تأكيد وتوليد</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
