// ============================================================
// Exam Editor Page - Builder & Creator
// ============================================================

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowRight, Save, Clock, HelpCircle, Plus, Trash2,
    Image as ImageIcon, CheckCircle, AlertCircle, Check, X,
    FileQuestion
} from 'lucide-react';

interface QuestionOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: string;
    text: string;
    image?: string;
    score: number;
    options: QuestionOption[];
    feedback: string; // Explanation for wrong answer
}

export function ExamEditorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'settings' | 'questions'>('settings');

    // Exam Settings State
    const [examTitle, setExamTitle] = useState(id ? 'امتحان شامل على الوحدة الأولى' : '');
    const [duration, setDuration] = useState(45);
    const [passScore, setPassScore] = useState(50);

    // Questions State
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: '1',
            text: 'ما هو إعراب كلمة "الطالب" في جملة: جاء الطالبُ مسرعاً؟',
            score: 2,
            options: [
                { id: '1', text: 'فاعل مرفوع بالضمة', isCorrect: true },
                { id: '2', text: 'مفعول به منصوب', isCorrect: false },
                { id: '3', text: 'خبر مرفوع', isCorrect: false },
                { id: '4', text: 'حال منصوب', isCorrect: false },
            ],
            feedback: 'لأن الطالب هو من قام بالفعل (المجيء) فهو فاعل مرفوع.'
        }
    ]);

    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(questions[0]?.id || null);

    // Derived State
    const activeQuestion = questions.find(q => q.id === selectedQuestionId);

    const handleAddQuestion = () => {
        const newId = Date.now().toString();
        const newQuestion: Question = {
            id: newId,
            text: 'سؤال جديد...',
            score: 1,
            options: [
                { id: '1', text: 'الخيار الأول', isCorrect: true },
                { id: '2', text: 'الخيار الثاني', isCorrect: false },
            ],
            feedback: ''
        };
        setQuestions([...questions, newQuestion]);
        setSelectedQuestionId(newId);
        setActiveTab('questions');
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
    };

    const updateOption = (qId: string, optId: string, text: string) => {
        setQuestions(questions.map(q => {
            if (q.id !== qId) return q;
            return {
                ...q,
                options: q.options.map(o => o.id === optId ? { ...o, text } : o)
            };
        }));
    };

    const setCorrectOption = (qId: string, optId: string) => {
        setQuestions(questions.map(q => {
            if (q.id !== qId) return q;
            return {
                ...q,
                options: q.options.map(o => ({ ...o, isCorrect: o.id === optId }))
            };
        }));
    };

    const addOption = (qId: string) => {
        setQuestions(questions.map(q => {
            if (q.id !== qId) return q;
            return {
                ...q,
                options: [...q.options, { id: Date.now().toString(), text: 'خيار جديد', isCorrect: false }]
            };
        }));
    };

    const deleteOption = (qId: string, optId: string) => {
        setQuestions(questions.map(q => {
            if (q.id !== qId) return q;
            return {
                ...q,
                options: q.options.filter(o => o.id !== optId)
            };
        }));
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/teacher/exams')}
                        className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-[var(--text-primary)]">
                            {id ? 'تعديل الامتحان' : 'إنشاء امتحان جديد'}
                        </h1>
                        <p className="text-[var(--text-secondary)] font-medium text-sm">
                            {questions.length} سؤال • {duration} دقيقة
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex bg-[var(--bg-card)] p-1 rounded-xl border border-[var(--border-color)]">
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-cyan-600 text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                        >
                            <Clock className="w-4 h-4 inline-block ml-2" />
                            الإعدادات
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'questions' ? 'bg-cyan-600 text-white shadow-md' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                        >
                            <HelpCircle className="w-4 h-4 inline-block ml-2" />
                            الأسئلة
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all">
                        <Save className="w-5 h-5" />
                        <span>حفظ</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            {activeTab === 'settings' ? (
                <div className="max-w-3xl mx-auto w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 space-y-6 animate-in slide-in-from-bottom-4">
                    <div>
                        <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">عنوان الامتحان</label>
                        <input
                            type="text"
                            value={examTitle}
                            onChange={(e) => setExamTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors font-bold"
                            placeholder="مثال: امتحان شهر أكتوبر"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">مدة الامتحان (دقيقة)</label>
                            <div className="relative">
                                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="w-full pr-12 pl-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">درجة النجاح (%)</label>
                            <div className="relative">
                                <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                                <input
                                    type="number"
                                    value={passScore}
                                    onChange={(e) => setPassScore(Number(e.target.value))}
                                    className="w-full pr-12 pl-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:border-cyan-500 outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                    {/* Questions Sidebar (List) */}
                    <div className="col-span-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-main)] flex justify-between items-center">
                            <span className="font-bold text-[var(--text-primary)]">قائمة الأسئلة</span>
                            <span className="text-xs bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded-lg font-bold">{questions.length}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                            {questions.map((q, idx) => (
                                <button
                                    key={q.id}
                                    onClick={() => setSelectedQuestionId(q.id)}
                                    className={`w-full text-right p-3 rounded-xl border transition-all ${selectedQuestionId === q.id
                                        ? 'bg-cyan-500/10 border-cyan-500/50'
                                        : 'bg-[var(--bg-main)] border-transparent hover:border-[var(--border-color)]'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-xs font-black ${selectedQuestionId === q.id ? 'text-cyan-500' : 'text-[var(--text-secondary)]'}`}>سؤال {idx + 1}</span>
                                        <span className="text-[10px] bg-[var(--bg-card)] px-1.5 rounded text-[var(--text-secondary)]">{q.score} درجة</span>
                                    </div>
                                    <p className={`text-xs font-bold line-clamp-2 ${selectedQuestionId === q.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                        {q.text}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-main)]">
                            <button
                                onClick={handleAddQuestion}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>أضف سؤال</span>
                            </button>
                        </div>
                    </div>

                    {/* Question Editor (Main) */}
                    <div className="col-span-9 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 overflow-y-auto custom-scrollbar">
                        {activeQuestion ? (
                            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
                                {/* Question Body */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-[var(--text-secondary)]">نص السؤال</label>
                                        <input
                                            type="number"
                                            value={activeQuestion.score}
                                            onChange={(e) => updateQuestion(activeQuestion.id, { score: Number(e.target.value) })}
                                            className="w-20 px-2 py-1 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg text-center text-sm font-black text-cyan-500 focus:border-cyan-500 outline-none"
                                            title="درجة السؤال"
                                        />
                                    </div>
                                    <textarea
                                        rows={3}
                                        value={activeQuestion.text}
                                        onChange={(e) => updateQuestion(activeQuestion.id, { text: e.target.value })}
                                        className="w-full px-4 py-4 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] text-lg font-bold focus:border-cyan-500 outline-none transition-colors"
                                        placeholder="اكتب نص السؤال هنا..."
                                    />
                                    <button className="mt-2 text-xs font-bold text-cyan-500 hover:underline flex items-center gap-1">
                                        <ImageIcon className="w-3 h-3" />
                                        <span>إرفاق صورة للسؤال</span>
                                    </button>
                                </div>

                                {/* Options */}
                                <div>
                                    <label className="block text-sm font-bold text-[var(--text-secondary)] mb-4">الخيارات والإجابة الصحيحة</label>
                                    <div className="space-y-3">
                                        {activeQuestion.options.map((option, idx) => (
                                            <div
                                                key={option.id}
                                                className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${option.isCorrect
                                                    ? 'bg-emerald-500/5 border-emerald-500/30'
                                                    : 'bg-[var(--bg-main)] border-transparent hover:border-[var(--border-color)]'
                                                    }`}
                                            >
                                                <button
                                                    onClick={() => setCorrectOption(activeQuestion.id, option.id)}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${option.isCorrect
                                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                                        : 'border-[var(--border-color)] text-transparent hover:border-emerald-500/50'
                                                        }`}
                                                    title="حدد كإجابة صحيحة"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>

                                                <input
                                                    type="text"
                                                    value={option.text}
                                                    onChange={(e) => updateOption(activeQuestion.id, option.id, e.target.value)}
                                                    className={`flex-1 bg-transparent border-none outline-none font-medium ${option.isCorrect ? 'text-emerald-500' : 'text-[var(--text-primary)]'
                                                        }`}
                                                    placeholder={`الخيار ${idx + 1}`}
                                                />

                                                <button
                                                    onClick={() => deleteOption(activeQuestion.id, option.id)}
                                                    className="p-2 text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => addOption(activeQuestion.id)}
                                            className="text-xs font-bold text-cyan-500 hover:text-cyan-400 flex items-center gap-1 mt-2 px-2"
                                        >
                                            <Plus className="w-3 h-3" />
                                            <span>إضافة خيار آخر</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Feedback */}
                                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-6">
                                    <label className="block text-sm font-bold text-amber-500 mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        تغذية راجعة (Feedback)
                                    </label>
                                    <p className="text-xs text-[var(--text-secondary)] mb-3">
                                        سيظهر هذا الشرح للطالب إذا أجاب بشكل خاطئ على السؤال.
                                    </p>
                                    <textarea
                                        rows={2}
                                        value={activeQuestion.feedback}
                                        onChange={(e) => updateQuestion(activeQuestion.id, { feedback: e.target.value })}
                                        className="w-full px-4 py-3 bg-[var(--bg-main)] border border-amber-500/20 rounded-xl text-[var(--text-primary)] text-sm focus:border-amber-500/50 outline-none transition-colors"
                                        placeholder="اشرح لماذا الإجابة الصحيحة هي الصحيحة..."
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                <FileQuestion className="w-16 h-16 mb-4" />
                                <p className="font-bold">اختر سؤالاً للتعديل أو أضف سؤال جديد</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
