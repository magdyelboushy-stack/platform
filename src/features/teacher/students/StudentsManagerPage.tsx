// ============================================================
// Teacher Students Manager
// ============================================================

import { useState } from 'react';
import {
    Search, Filter, MoreVertical, Ban,
    Mail, Phone, GraduationCap, Clock
} from 'lucide-react';

// Students data - to be fetched from API
const students: any[] = [];

export function StudentsManagerPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">الطلاب والمتابعة</h1>
                    <p className="text-[var(--text-secondary)] font-medium">متابعة أداء الطلاب، الحضور، وحالة الاشتراكات.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2 rounded-xl flex flex-col items-center">
                        <span className="text-[10px] text-[var(--text-secondary)] font-bold">إجمالي الطلاب</span>
                        <span className="text-xl font-black text-cyan-500">1,240</span>
                    </div>
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2 rounded-xl flex flex-col items-center">
                        <span className="text-[10px] text-[var(--text-secondary)] font-bold">نشط اليوم</span>
                        <span className="text-xl font-black text-emerald-500">350</span>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                    <input
                        type="text"
                        placeholder="ابحث عن طالب (اسم، رقم هاتف، بريد)..."
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

            {/* Students List */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-main)] border-b border-[var(--border-color)]">
                        <tr>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">الطالب</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">بيانات الاتصال</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">الكورسات</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">آخر ظهور</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">الحالة</th>
                            <th className="py-4 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                        {students.map((student: any) => (
                            <tr key={student.id} className="group hover:bg-[var(--bg-main)] transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={student.avatar}
                                            alt={student.name}
                                            className="w-10 h-10 rounded-full border border-[var(--border-color)]"
                                        />
                                        <div>
                                            <p className="font-bold text-[var(--text-primary)] text-sm group-hover:text-cyan-500 transition-colors">{student.name}</p>
                                            <p className="text-[10px] text-[var(--text-secondary)]">ID: {student.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                            <Phone className="w-3 h-3" />
                                            <span dir="ltr">{student.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                            <Mail className="w-3 h-3" />
                                            <span>{student.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4 text-cyan-500" />
                                        <span className="text-sm font-bold text-[var(--text-primary)]">{student.courses}</span>
                                    </div>
                                    <div className="w-20 h-1.5 bg-[var(--bg-main)] rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${student.progress}%` }} />
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm font-bold text-[var(--text-secondary)]">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {student.lastLogin}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${student.status === 'active'
                                        ? 'bg-emerald-500/10 text-emerald-500'
                                        : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {student.status === 'active' ? 'نشط' : 'محظور'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-left">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]" title="تعطيل الحساب">
                                            <Ban className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
