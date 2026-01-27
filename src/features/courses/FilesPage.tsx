// ============================================================
// FilesPage - Course Files & Downloads Page
// ============================================================

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    FileText,
    FolderOpen,
    Download,
    Eye,
    X,
    Search,
    Grid,
    List as ListIcon
} from 'lucide-react';
import { clsx } from 'clsx';
import { Navbar } from '@/core/components/Navbar';
import { FileCard, FileItem } from '@/core/components/FileCard';

// Mock Data
const mockCourse = {
    id: 1,
    title: "النحو الشامل للثانوية العامة",
    teacherName: "أ. أحمد راضي"
};

const mockFiles: FileItem[] = [
    { id: 1, name: "ملزمة همزة القطع وألف الوصل", type: 'pdf', size: "2.5 MB", url: "#", previewable: true },
    { id: 2, name: "تدريبات الوحدة الأولى", type: 'pdf', size: "1.8 MB", url: "#", previewable: true },
    { id: 3, name: "ملخص المشتقات العاملة", type: 'doc', size: "850 KB", url: "#" },
    { id: 4, name: "صور توضيحية للإعراب", type: 'image', size: "3.2 MB", url: "#", previewable: true },
    { id: 5, name: "مراجعة صوتية - الممنوع من الصرف", type: 'audio', size: "15 MB", url: "#" },
    { id: 6, name: "فيديو شرح إضافي", type: 'video', size: "120 MB", url: "#" },
    { id: 7, name: "نماذج امتحانات سابقة", type: 'pdf', size: "4.1 MB", url: "#", previewable: true },
    { id: 8, name: "ملزمة المصادر الصريحة والمؤولة", type: 'pdf', size: "2.9 MB", url: "#", previewable: true },
];

type ViewMode = 'grid' | 'list';
type FileType = 'all' | 'pdf' | 'doc' | 'image' | 'video' | 'audio';

export function FilesPage() {
    const { courseId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [filterType, setFilterType] = useState<FileType>('all');
    const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

    // Filter & Search
    const filteredFiles = mockFiles.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || file.type === filterType;
        return matchesSearch && matchesType;
    });

    const fileTypeCounts = {
        all: mockFiles.length,
        pdf: mockFiles.filter(f => f.type === 'pdf').length,
        doc: mockFiles.filter(f => f.type === 'doc').length,
        image: mockFiles.filter(f => f.type === 'image').length,
        video: mockFiles.filter(f => f.type === 'video').length,
        audio: mockFiles.filter(f => f.type === 'audio').length,
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors" dir="rtl">
            <Navbar />

            {/* Header */}
            <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4">
                        <Link to="/courses" className="hover:text-cyan-500 transition-colors font-bold">الكورسات</Link>
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        <Link to={`/course/${courseId}`} className="hover:text-cyan-500 transition-colors font-bold">{mockCourse.title}</Link>
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        <span className="text-cyan-500 font-black">الملفات والمرفقات</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <FolderOpen className="w-8 h-8 text-cyan-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-[var(--text-primary)] mb-1">الملفات والمرفقات</h1>
                            <p className="text-[var(--text-secondary)] font-bold">{mockCourse.title} • {mockFiles.length} ملف</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {/* Toolbar */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ابحث في الملفات..."
                            className="w-full pl-4 pr-12 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                        />
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={clsx(
                                "p-3 rounded-lg transition-all",
                                viewMode === 'list' ? "bg-cyan-500 text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            <ListIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={clsx(
                                "p-3 rounded-lg transition-all",
                                viewMode === 'grid' ? "bg-cyan-500 text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {(['all', 'pdf', 'doc', 'image', 'video', 'audio'] as FileType[]).map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={clsx(
                                "px-5 py-2.5 rounded-xl font-bold text-sm transition-all border",
                                filterType === type
                                    ? "bg-cyan-500 text-white border-cyan-500"
                                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-cyan-500/50"
                            )}
                        >
                            {type === 'all' && 'الكل'}
                            {type === 'pdf' && 'PDF'}
                            {type === 'doc' && 'مستندات'}
                            {type === 'image' && 'صور'}
                            {type === 'video' && 'فيديو'}
                            {type === 'audio' && 'صوت'}
                            <span className="mr-2 px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-xs">
                                {fileTypeCounts[type]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Files List/Grid */}
                {filteredFiles.length === 0 ? (
                    <div className="text-center py-20">
                        <FileText className="w-16 h-16 text-[var(--text-secondary)] mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">لا توجد ملفات</h3>
                        <p className="text-[var(--text-secondary)] font-bold">جرب تغيير كلمات البحث أو الفلتر</p>
                    </div>
                ) : (
                    <div className={clsx(
                        viewMode === 'grid'
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            : "space-y-4"
                    )}>
                        {filteredFiles.map((file, index) => (
                            <FileCard
                                key={file.id}
                                file={file}
                                index={index}
                                onPreview={file.previewable ? setPreviewFile : undefined}
                            />
                        ))}
                    </div>
                )}

                {/* Download All Button */}
                {filteredFiles.length > 0 && (
                    <div className="mt-12 text-center">
                        <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-lg shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:scale-105 transition-all">
                            <Download className="w-6 h-6" />
                            تحميل جميع الملفات ({filteredFiles.length})
                        </button>
                    </div>
                )}
            </main>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setPreviewFile(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[var(--bg-card)] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[var(--border-color)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-[var(--text-primary)]">{previewFile.name}</h3>
                                        <p className="text-sm text-[var(--text-secondary)] font-bold">{previewFile.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={previewFile.url}
                                        download
                                        className="p-3 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition-all"
                                    >
                                        <Download className="w-5 h-5" />
                                    </a>
                                    <button
                                        onClick={() => setPreviewFile(null)}
                                        className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-red-500 hover:border-red-500/50 transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="h-[60vh] bg-[var(--bg-main)] flex items-center justify-center">
                                {previewFile.type === 'pdf' ? (
                                    <div className="text-center">
                                        <FileText className="w-24 h-24 text-red-500/50 mx-auto mb-4" />
                                        <p className="text-[var(--text-secondary)] font-bold mb-4">معاينة PDF</p>
                                        <p className="text-xs text-[var(--text-secondary)]">
                                            (في الواقع سيتم عرض الـ PDF هنا باستخدام embed أو react-pdf)
                                        </p>
                                    </div>
                                ) : previewFile.type === 'image' ? (
                                    <div className="text-center">
                                        <img
                                            src="https://via.placeholder.com/600x400?text=Image+Preview"
                                            alt={previewFile.name}
                                            className="max-w-full max-h-full object-contain rounded-xl"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Eye className="w-24 h-24 text-[var(--text-secondary)] opacity-50 mx-auto mb-4" />
                                        <p className="text-[var(--text-secondary)] font-bold">المعاينة غير متاحة لهذا النوع من الملفات</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
