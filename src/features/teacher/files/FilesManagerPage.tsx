// ============================================================
// Teacher Files Manager - Centralized Library
// ============================================================

import { useState } from 'react';
import {
    Plus, Search, Filter, FileText, Download, Trash2,
    MoreVertical, HardDrive, CheckCircle, Clock
} from 'lucide-react';

// Files data - to be fetched from API
const files: any[] = [];

export function FilesManagerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = () => {
        setIsUploading(true);
        // Simulate upload
        setTimeout(() => setIsUploading(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">مكتبة الملفات</h1>
                    <p className="text-[var(--text-secondary)] font-medium">إدارة جميع ملفات PDF والمذكرات الخاصة بك في مكان واحد.</p>
                </div>
                <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-1 disabled:opacity-50"
                >
                    {isUploading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            <span>رفع ملف جديد</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <HardDrive className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[var(--text-secondary)] text-xs font-bold">إجمالي المساحة</p>
                        <h3 className="text-xl font-black text-[var(--text-primary)]">0.0 GB <span className="text-xs text-[var(--text-secondary)] font-medium">/ 50 GB</span></h3>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[var(--text-secondary)] text-xs font-bold">عدد الملفات</p>
                        <h3 className="text-xl font-black text-[var(--text-primary)]">0 ملف</h3>
                    </div>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <Download className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[var(--text-secondary)] text-xs font-bold">إجمالي التنزيلات</p>
                        <h3 className="text-xl font-black text-[var(--text-primary)]">0</h3>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                    <input
                        type="text"
                        placeholder="ابحث عن ملف..."
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

            {/* Files List */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[var(--bg-main)] border-b border-[var(--border-color)]">
                        <tr>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">اسم الملف</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">الحجم</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">تاريخ الرفع</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-[var(--text-secondary)]">التنزيلات</th>
                            <th className="py-4 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                        {files.map((file: any) => (
                            <tr key={file.id} className="group hover:bg-[var(--bg-main)] transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[var(--text-primary)] text-sm group-hover:text-cyan-500 transition-colors">{file.name}</p>
                                            <p className="text-[10px] text-[var(--text-secondary)]">{file.type.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm font-bold text-[var(--text-secondary)] dir-ltr text-right">{file.size}</td>
                                <td className="py-4 px-6 text-sm font-bold text-[var(--text-secondary)] flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    {file.date}
                                </td>
                                <td className="py-4 px-6 text-sm font-bold text-[var(--text-primary)]">
                                    {file.downloads}
                                </td>
                                <td className="py-4 px-6 text-left">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500">
                                            <Trash2 className="w-4 h-4" />
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
