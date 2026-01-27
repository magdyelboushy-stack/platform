// ============================================================
// Teacher Requests Manager - Login & Devices
// ============================================================

import { useState } from 'react';
import {
    Check, X, ShieldAlert, CheckCircle, Eye,
    User, Phone, Calendar, Users, FileText, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Requests data - to be fetched from API
const requests: any[] = [];

export function RequestsManagerPage() {
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">طلبات الدخول والأمان</h1>
                    <p className="text-[var(--text-secondary)] font-medium">مراجعة طلبات الانضمام الجديدة، تغيير الأجهزة، وتنبيهات الأمان.</p>
                </div>
            </div>

            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((req: any) => (
                    <div key={req.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden group flex flex-col">
                        <div className={`absolute top-0 left-0 w-1 h-full ${req.type === 'new_registration' ? 'bg-cyan-500' :
                            req.type === 'device_reset' ? 'bg-amber-500' : 'bg-red-500'
                            }`} />

                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${req.type === 'new_registration' ? 'bg-cyan-500/10 text-cyan-500' :
                                    req.type === 'device_reset' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    {req.type === 'new_registration' ? <User className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-primary)] line-clamp-1">{req.student}</h3>
                                    <p className="text-xs text-[var(--text-secondary)]">{req.time}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${req.type === 'new_registration' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' :
                                'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                }`}>
                                {req.type === 'new_registration' ? 'تسجيل جديد' : 'أمان'}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6 bg-[var(--bg-main)] p-4 rounded-xl border border-[var(--border-color)] flex-1">
                            {req.type === 'new_registration' ? (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">الصف:</span>
                                        <span className="font-bold text-[var(--text-primary)]">{req.details?.gradeLevel}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">رقم الهاتف:</span>
                                        <span className="font-bold text-[var(--text-primary)] dir-ltr">{req.details?.phone}</span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedRequest(req)}
                                        className="w-full mt-2 py-2 text-xs font-bold text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-3 h-3" />
                                        عرض كامل البيانات
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">السبب:</span>
                                        <span className="font-bold text-[var(--text-primary)] line-clamp-1" title={req.reason}>{req.reason}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">الجهاز:</span>
                                        <span className="font-bold text-[var(--text-primary)] dir-ltr">{req.device}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">IP:</span>
                                        <span className="font-bold text-[var(--text-primary)] dir-ltr">{req.ip}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                                <Check className="w-4 h-4" />
                                <span>موافقة</span>
                            </button>
                            <button className="flex-1 py-2.5 bg-[var(--bg-main)] hover:bg-red-500/10 text-[var(--text-primary)] hover:text-red-500 border border-[var(--border-color)] hover:border-red-500/30 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                <X className="w-4 h-4" />
                                <span>رفض</span>
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-2xl p-6 flex flex-col items-center justify-center text-center text-[var(--text-secondary)] min-h-[300px]">
                    <CheckCircle className="w-12 h-12 mb-4 opacity-50" />
                    <p className="font-bold">لا توجد طلبات أخرى</p>
                    <p className="text-xs mt-1">قمت بمراجعة جميع الطلبات المعلقة.</p>
                </div>
            </div>

            {/* Registration Details Modal */}
            <AnimatePresence>
                {selectedRequest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedRequest(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[var(--bg-card)] border border-[var(--border-color)] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                        >
                            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-main)]">
                                <h2 className="text-xl font-black text-[var(--text-primary)]">بيانات الطالب للتوثيق</h2>
                                <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-[var(--bg-card)] rounded-xl text-[var(--text-secondary)]">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Personal Info */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-bold text-cyan-500 mb-4 flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                البيانات الشخصية
                                            </h3>
                                            <div className="space-y-3 text-sm">
                                                <div>
                                                    <p className="text-[var(--text-secondary)] text-xs">الاسم بالكامل</p>
                                                    <p className="font-bold text-[var(--text-primary)]">{selectedRequest.details.fullName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[var(--text-secondary)] text-xs">الرقم القومي</p>
                                                    <p className="font-bold text-[var(--text-primary)] dir-ltr text-right">{selectedRequest.details.nationalId}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[var(--text-secondary)] text-xs">تاريخ الميلاد</p>
                                                    <p className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                                                        <Calendar className="w-3 h-3" />
                                                        {selectedRequest.details.birthDate}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[var(--text-secondary)] text-xs">النوع</p>
                                                    <p className="font-bold text-[var(--text-primary)]">{selectedRequest.details.gender}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-cyan-500 mb-4 flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                بيانات ولي الأمر
                                            </h3>
                                            <div className="space-y-3 text-sm">
                                                <div>
                                                    <p className="text-[var(--text-secondary)] text-xs">اسم ولي الأمر</p>
                                                    <p className="font-bold text-[var(--text-primary)]">{selectedRequest.details.guardianName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[var(--text-secondary)] text-xs">رقم هاتف ولي الأمر</p>
                                                    <p className="font-bold text-[var(--text-primary)] dir-ltr text-right">{selectedRequest.details.guardianPhone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Proof & Contact */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-bold text-cyan-500 mb-4 flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                إثبات الهوية
                                            </h3>
                                            <div className="bg-[var(--bg-main)] border-2 border-dashed border-[var(--border-color)] rounded-xl h-48 flex items-center justify-center overflow-hidden">
                                                <div className="text-center">
                                                    <img
                                                        src="https://via.placeholder.com/400x250?text=ID+Card+Photo"
                                                        alt="ID Card"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-cyan-500 mb-4 flex items-center gap-2">
                                                <Smartphone className="w-4 h-4" />
                                                بيانات التواصل
                                            </h3>
                                            <div className="space-y-3 text-sm">
                                                <div>
                                                    <p className="text-[var(--text-secondary)] text-xs">رقم الطالب</p>
                                                    <p className="font-bold text-[var(--text-primary)] dir-ltr text-right">{selectedRequest.details.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[var(--text-secondary)] text-xs">البريد الإلكتروني</p>
                                                    <p className="font-bold text-[var(--text-primary)]">{selectedRequest.details.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-main)] flex gap-4">
                                <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                                    <Check className="w-5 h-5" />
                                    <span>توثيق وتفعيل الحساب</span>
                                </button>
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl font-bold transition-all"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
