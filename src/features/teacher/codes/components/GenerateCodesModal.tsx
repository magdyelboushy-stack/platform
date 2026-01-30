import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Wallet, Search, Check, Users } from 'lucide-react';
import { useState, useMemo } from 'react';

// Mock Students Data
const mockStudents: any[] = [];

interface GenerateCodesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export function GenerateCodesModal({ isOpen, onClose, onSubmit }: GenerateCodesModalProps) {
    const [batchName, setBatchName] = useState('');
    const [course, setCourse] = useState('all');
    const [count, setCount] = useState(50);
    const [value, setValue] = useState(100);
    const [selectionMode, setSelectionMode] = useState<'batch' | 'targeted'>('batch');
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [studentSearch, setStudentSearch] = useState('');

    const filteredStudents = useMemo(() =>
        mockStudents.filter(s => s.name.includes(studentSearch)),
        [studentSearch]
    );

    const toggleStudent = (id: string) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            batchName,
            course,
            count: selectionMode === 'targeted' ? selectedStudents.length : count,
            value,
            students: selectionMode === 'targeted' ? selectedStudents : null
        });
        onClose();
        // Reset
        setBatchName('');
        setCourse('all');
        setCount(50);
        setValue(100);
        setSelectedStudents([]);
        setSelectionMode('batch');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-[var(--border-color)] flex items-center justify-between bg-gradient-to-l from-[#C5A059]/5 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black text-[var(--text-primary)]">توليد أكواد شحن</h2>
                            </div>
                            <button onClick={onClose} className="p-3 rounded-xl hover:bg-[var(--bg-main)] text-[var(--text-secondary)] transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Selection Mode Tabs */}
                            <div className="flex p-1 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)]">
                                <button
                                    type="button"
                                    onClick={() => setSelectionMode('batch')}
                                    className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-black transition-all ${selectionMode === 'batch' ? 'bg-[#C5A059] text-white shadow-lg shadow-[#C5A059]/20' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>توليد كمية</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectionMode('targeted')}
                                    className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-black transition-all ${selectionMode === 'targeted' ? 'bg-[#C5A059] text-white shadow-lg shadow-[#C5A059]/20' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                                >
                                    <Users className="w-4 h-4" />
                                    <span>طلاب محددين</span>
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-[var(--text-secondary)] px-2">اسم المجموعة (للتنظيم)</label>
                                <input
                                    required
                                    type="text"
                                    value={batchName}
                                    onChange={(e) => setBatchName(e.target.value)}
                                    placeholder="مثال: طلاب سنتر الأمل - شهر فبراير"
                                    className="w-full h-16 px-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-[#C5A059] transition-all"
                                />
                            </div>

                            {selectionMode === 'targeted' ? (
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] group-focus-within:text-[#C5A059] transition-colors" />
                                        <input
                                            type="text"
                                            value={studentSearch}
                                            onChange={(e) => setStudentSearch(e.target.value)}
                                            placeholder="ابحث عن طالب..."
                                            className="w-full h-14 pr-12 pl-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-[#C5A059] transition-all text-sm"
                                        />
                                    </div>

                                    <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                        {filteredStudents.map(student => (
                                            <button
                                                key={student.id}
                                                type="button"
                                                onClick={() => toggleStudent(student.id)}
                                                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${selectedStudents.includes(student.id) ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059]' : 'bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#C5A059]/30'}`}
                                            >
                                                <div className="text-right">
                                                    <p className="font-black text-sm">{student.name}</p>
                                                    <p className="text-[10px] font-bold opacity-60">{student.grade}</p>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedStudents.includes(student.id) ? 'bg-[#C5A059] border-[#C5A059]' : 'border-[var(--border-color)]'}`}>
                                                    {selectedStudents.includes(student.id) && <Check className="w-4 h-4 text-white" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-[var(--text-secondary)] px-2">عدد الأكواد</label>
                                        <input
                                            required
                                            type="number"
                                            min={1}
                                            value={count}
                                            onChange={(e) => setCount(parseInt(e.target.value))}
                                            className="w-full h-16 px-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-[#C5A059] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-[var(--text-secondary)] px-2">القيمة (ج.م)</label>
                                        <input
                                            required
                                            type="number"
                                            min={0}
                                            value={value}
                                            onChange={(e) => setValue(parseInt(e.target.value))}
                                            className="w-full h-16 px-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none focus:border-[#C5A059] transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-black text-[var(--text-secondary)] px-2">نوع التفعيل</label>
                                <select
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    className="w-full h-16 px-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold outline-none border-[#C5A059]/20 focus:border-[#C5A059] transition-all appearance-none"
                                >
                                    <option value="all">رصيد محفظة (عام)</option>
                                    <option value="course1">كورس الكيمياء العضوية</option>
                                    <option value="course2">مراجعة الفيزياء الحديثة</option>
                                </select>
                            </div>

                            {/* Summary Box */}
                            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-amber-700/80 leading-relaxed">
                                        سيتم توليد {selectionMode === 'targeted' ? (
                                            <><span className="text-amber-800 font-black">{selectedStudents.length}</span> كود لـ {selectedStudents.length} طالب مختار</>
                                        ) : (
                                            <><span className="text-amber-800 font-black">{count}</span> كود شحن</>
                                        )}
                                    </p>
                                    <p className="text-[10px] font-black text-amber-600/60 uppercase">إجمالي القيمة: {(selectionMode === 'targeted' ? selectedStudents.length : count) * value} ج.م</p>
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
                                    disabled={selectionMode === 'targeted' && selectedStudents.length === 0}
                                    className="flex-[2] h-16 rounded-2xl bg-[#C5A059] text-white font-black shadow-xl shadow-[#C5A059]/20 hover:shadow-[#C5A059]/40 hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:scale-100"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    <span>تأكيد وتوليد الآن</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
