import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Mail, Lock, Shield, Check, Phone, UserCog } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AssistantFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any; // If present, we are in Edit mode
}

const PERMISSIONS_MAP = [
    { key: 'students', label: 'الطلاب' },
    { key: 'homework', label: 'الواجبات' },
    { key: 'exams', label: 'الامتحانات' },
    { key: 'requests', label: 'طلبات الدخول' },
    { key: 'codes', label: 'الكودات' },
    { key: 'support', label: 'الدعم الفني' },
    { key: 'courses', label: 'المحتوى التعليمي' },
] as const;

export function AssistantFormModal({ isOpen, onClose, onSubmit, initialData }: AssistantFormModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
    const isEditMode = !!initialData;

    useEffect(() => {
        if (isOpen && initialData) {
            setName(initialData.name || '');
            setEmail(initialData.email || '');
            setPhone(initialData.phone || '');
            setSelectedPerms(initialData.permissions || []);
            setPassword(''); // Don't pre-fill password
        } else if (isOpen && !initialData) {
            // Reset for new entry
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setSelectedPerms([]);
        }
    }, [isOpen, initialData]);

    const togglePermission = (permKey: string) => {
        setSelectedPerms(prev =>
            prev.includes(permKey) ? prev.filter(p => p !== permKey) : [...prev, permKey]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: any = { name, email, phone, permissions: selectedPerms };
        // Only include password if it's set (optional in edit mode, required in create mode handled by required attr logic below)
        if (password) {
            payload.password = password;
        }
        onSubmit(payload);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-[var(--border-color)] flex items-center justify-between bg-gradient-to-l from-[#C5A059]/5 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                                    {isEditMode ? <UserCog className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                                </div>
                                <h2 className="text-2xl font-black text-[var(--text-primary)]">
                                    {isEditMode ? 'تعديل بيانات المساعد' : 'إضافة مساعد جديد'}
                                </h2>
                            </div>
                            <button onClick={onClose} className="p-3 rounded-xl hover:bg-[var(--bg-main)] text-[var(--text-secondary)] transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-[var(--text-secondary)] px-2">الاسم بالكامل</label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="مثال: محمد أحمد"
                                    className="w-full h-16 px-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-[#C5A059] transition-all"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-black text-[var(--text-secondary)] px-2">رقم الهاتف</label>
                                <div className="relative">
                                    <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] opacity-40" />
                                    <input
                                        required
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="01xxxxxxxxx"
                                        className="w-full h-16 pr-14 pl-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-[#C5A059] transition-all dir-ltr"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-[var(--text-secondary)] px-2">البريد الإلكتروني</label>
                                    <div className="relative">
                                        <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] opacity-40" />
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="assistant@system.com"
                                            className="w-full h-16 pr-14 pl-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-[#C5A059] transition-all dir-ltr"
                                        />
                                    </div>
                                </div>
                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-[var(--text-secondary)] px-2">
                                        {isEditMode ? 'كلمة المرور (اختياري)' : 'كلمة المرور'}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] opacity-40" />
                                        <input
                                            // Required only if NOT edit mode
                                            required={!isEditMode}
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder={isEditMode ? "اتركها فارغة للتجاهل" : "••••••••"}
                                            className="w-full h-16 pr-14 pl-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-[#C5A059] transition-all dir-ltr"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Permissions */}
                            <div className="space-y-3">
                                <label className="text-sm font-black text-[var(--text-secondary)] px-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    تحديد الصلاحيات
                                </label>
                                <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto p-2 border border-[var(--border-color)] rounded-2xl bg-[var(--bg-main)] custom-scrollbar">
                                    {PERMISSIONS_MAP.map(perm => (
                                        <button
                                            key={perm.key}
                                            type="button"
                                            onClick={() => togglePermission(perm.key)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${selectedPerms.includes(perm.key) ? 'bg-[#C5A059] border-[#C5A059] text-white shadow-lg shadow-[#C5A059]/20' : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#C5A059]/30'}`}
                                        >
                                            {selectedPerms.includes(perm.key) && <Check className="w-3 h-3" />}
                                            {perm.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 h-16 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-black hover:bg-[var(--bg-card)] transition-all active:scale-95"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] h-16 rounded-2xl bg-[#C5A059] text-white font-black shadow-xl shadow-[#C5A059]/20 hover:shadow-[#C5A059]/40 hover:scale-105 transition-all active:scale-95"
                                >
                                    {isEditMode ? 'حفظ التعديلات' : 'تأكيد الإضافة'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
