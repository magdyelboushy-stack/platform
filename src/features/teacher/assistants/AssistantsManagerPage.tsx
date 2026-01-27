
// ============================================================
// Assistants Manager - Add & Manage Staff
// ============================================================

import { useState } from 'react';
import {
    Users, Trash2, Edit, X,
    Mail, Lock, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Assistants data - to be fetched from API
const assistantsData: any[] = [];

export function AssistantsManagerPage() {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [assistants] = useState<any[]>(assistantsData);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">فريق المساعدين</h1>
                    <p className="text-[var(--text-secondary)] font-bold">إدارة المساعدين وصلاحيات الوصول للنظام.</p>
                </div>
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-black shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                    <UserPlus className="w-5 h-5" />
                    <span>إضافة مساعد جديد</span>
                </button>
            </div>

            {/* Assistants List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assistants.map((assistant) => (
                    <div key={assistant.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

                        <div className="relative flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                                    <span className="text-xl font-black">{assistant.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[var(--text-primary)]">{assistant.name}</h3>
                                    <p className="text-xs text-[var(--text-secondary)] font-bold">{assistant.role}</p>
                                </div>
                            </div>
                            <div className={`w-3 h-3 rounded-full border-2 border-[var(--bg-card)] ${assistant.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                                }`} title={assistant.status === 'active' ? 'متصل' : 'غير متصل'} />
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                <Mail className="w-4 h-4 text-cyan-500" />
                                <span className="dir-ltr truncate">{assistant.email}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {assistant.permissions.map((perm, idx) => (
                                    <span key={idx} className="px-2 py-1 rounded-lg bg-[var(--bg-main)] text-[10px] font-bold text-[var(--text-secondary)] border border-[var(--border-color)]">
                                        {perm}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
                            <button className="flex-1 py-2 text-sm font-bold text-[var(--text-secondary)] hover:text-cyan-500 hover:bg-cyan-500/5 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Edit className="w-4 h-4" />
                                تعديل
                            </button>
                            <button className="flex-1 py-2 text-sm font-bold text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                حذف
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Assistant Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setAddModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[var(--bg-card)] border border-[var(--border-color)] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-main)]">
                                <h2 className="text-xl font-black text-[var(--text-primary)]">إضافة مساعد جديد</h2>
                                <button onClick={() => setAddModalOpen(false)} className="p-2 hover:bg-[var(--bg-card)] rounded-xl text-[var(--text-secondary)]">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[var(--text-secondary)]">الاسم بالكامل</label>
                                    <div className="relative">
                                        <input type="text" placeholder="اسم المساعد" className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:border-cyan-500 outline-none font-bold text-[var(--text-primary)] pr-10" />
                                        <Users className="absolute right-3 top-3.5 w-5 h-5 text-[var(--text-secondary)]" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[var(--text-secondary)]">البريد الإلكتروني</label>
                                    <div className="relative">
                                        <input type="email" placeholder="example@system.com" className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:border-cyan-500 outline-none font-bold text-[var(--text-primary)] pr-10 dir-ltr" />
                                        <Mail className="absolute right-3 top-3.5 w-5 h-5 text-[var(--text-secondary)]" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[var(--text-secondary)]">كلمة المرور</label>
                                    <div className="relative">
                                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] focus:border-cyan-500 outline-none font-bold text-[var(--text-primary)] pr-10 dir-ltr" />
                                        <Lock className="absolute right-3 top-3.5 w-5 h-5 text-[var(--text-secondary)]" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[var(--text-secondary)]">الصلاحيات</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['الطلاب', 'الواجبات', 'الامتحانات', 'طلبات الدخول', 'الكودات', 'الدعم الفني'].map((perm) => (
                                            <label key={perm} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-color)] cursor-pointer hover:bg-[var(--bg-main)]">
                                                <input type="checkbox" className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500" />
                                                <span className="text-xs font-bold text-[var(--text-primary)]">{perm}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button type="button" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-black shadow-lg shadow-cyan-500/20 mt-4 transition-all">
                                    إنشاء الحساب
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
