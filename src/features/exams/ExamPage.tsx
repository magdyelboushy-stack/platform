// ============================================================
// ExamPage - Full Exam/Quiz Interface with Anti-Cheat
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    Send,
    AlertTriangle,
    Trophy,
    CheckCircle,
    XCircle,
    Home,
    RotateCcw,
    Maximize,
    Shield
} from 'lucide-react';
import { clsx } from 'clsx';

// Components
import { ExamTimer } from './components/ExamTimer';
import { QuestionNav } from './components/QuestionNav';
import { QuestionCard, Question } from './components/QuestionCard';

// Mock Exam Data
const mockExam = {
    id: 1,
    title: "اختبار الوحدة الأولى: همزة القطع وألف الوصل",
    courseName: "النحو الشامل للثانوية العامة",
    duration: 30, // minutes
    questions: [
        {
            id: 1,
            type: 'mcq' as const,
            text: "ما الفرق الأساسي بين همزة القطع وألف الوصل؟",
            options: [
                "همزة القطع تُنطق في جميع الأحوال، وألف الوصل تُنطق في بداية الكلام فقط",
                "ألف الوصل تُكتب على السطر دائماً، وهمزة القطع تُكتب فوق الألف",
                "لا يوجد فرق بينهما",
                "همزة القطع خاصة بالأفعال فقط"
            ],
            correctAnswer: "همزة القطع تُنطق في جميع الأحوال، وألف الوصل تُنطق في بداية الكلام فقط"
        },
        {
            id: 2,
            type: 'true-false' as const,
            text: "ألف الوصل تُكتب بدون همزة فوقها أو تحتها.",
            correctAnswer: "صواب"
        },
        {
            id: 3,
            type: 'mcq' as const,
            text: "أي من الكلمات التالية تبدأ بهمزة قطع؟",
            options: ["استخرج", "اكتب", "إنسان", "انطلق"],
            correctAnswer: "إنسان"
        },
        {
            id: 4,
            type: 'mcq' as const,
            text: "من مواضع همزة القطع في الأسماء:",
            options: [
                "جميع الأسماء ما عدا عشرة أسماء",
                "الأسماء المبدوءة بـ'ال' التعريف",
                "أسماء الإشارة",
                "الضمائر المتصلة"
            ],
            correctAnswer: "جميع الأسماء ما عدا عشرة أسماء"
        },
        {
            id: 5,
            type: 'true-false' as const,
            text: "همزة الفعل الماضي الثلاثي هي همزة وصل.",
            correctAnswer: "خطأ"
        }
    ] as Question[]
};

export function ExamPage() {
    const { courseId, examId } = useParams();
    const navigate = useNavigate();

    // Exam State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Map<number, string | string[]>>(new Map());
    const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Anti-Cheat State
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [warningCount, setWarningCount] = useState(0);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(true);
    const [examCancelled, setExamCancelled] = useState(false);

    // Current Question
    const currentQuestion = mockExam.questions[currentQuestionIndex];
    const answeredQuestions = new Set(answers.keys());

    // Anti-Cheat: Fullscreen Handler
    const enterFullscreen = useCallback(() => {
        document.documentElement.requestFullscreen().catch(err => {
            // Silently handle fullscreen failures
        });
    }, []);

    // Anti-Cheat: Visibility Change Detection
    useEffect(() => {
        if (showStartModal || isSubmitted) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setWarningCount(prev => prev + 1);
                setShowWarningModal(true);
            }
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement && !isSubmitted && !showStartModal) {
                setWarningCount(prev => prev + 1);
                setShowWarningModal(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [showStartModal, isSubmitted]);

    // Block Right-Click
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    // Block Copy/Cut/Paste and Keyboard Shortcuts
    useEffect(() => {
        if (showStartModal || isSubmitted) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Block Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+A, Ctrl+P, F12, Ctrl+Shift+I
            if (
                (e.ctrlKey && ['c', 'x', 'v', 'a', 'p', 'u'].includes(e.key.toLowerCase())) ||
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j')
            ) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        const handleCopy = (e: ClipboardEvent) => e.preventDefault();
        const handleCut = (e: ClipboardEvent) => e.preventDefault();
        const handlePaste = (e: ClipboardEvent) => e.preventDefault();

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('cut', handleCut);
        document.addEventListener('paste', handlePaste);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('cut', handleCut);
            document.removeEventListener('paste', handlePaste);
        };
    }, [showStartModal, isSubmitted]);

    // Auto-cancel exam after 2 exits
    useEffect(() => {
        if (warningCount >= 2 && !examCancelled && !isSubmitted) {
            setExamCancelled(true);
        }
    }, [warningCount, examCancelled, isSubmitted]);

    // Handle Answer
    const handleAnswer = (answer: string | string[]) => {
        const newAnswers = new Map(answers);
        newAnswers.set(currentQuestionIndex, answer);
        setAnswers(newAnswers);
    };

    // Handle Flag Toggle
    const handleToggleFlag = () => {
        const newFlagged = new Set(flaggedQuestions);
        if (newFlagged.has(currentQuestionIndex)) {
            newFlagged.delete(currentQuestionIndex);
        } else {
            newFlagged.add(currentQuestionIndex);
        }
        setFlaggedQuestions(newFlagged);
    };

    // Handle Navigation
    const goToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const goNext = () => {
        if (currentQuestionIndex < mockExam.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const goPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    // Handle Submit
    const handleSubmit = () => {
        let correctCount = 0;
        mockExam.questions.forEach((q, index) => {
            const userAnswer = answers.get(index);
            if (userAnswer === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsSubmitted(true);
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    // Handle Time Up
    const handleTimeUp = () => {
        handleSubmit();
    };

    // Start Exam
    const startExam = () => {
        setShowStartModal(false);
        enterFullscreen();
    };

    // Calculate percentage
    const percentage = Math.round((score / mockExam.questions.length) * 100);

    return (
        <div
            className="min-h-screen bg-[var(--bg-main)] transition-colors select-none"
            dir="rtl"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
        >

            {/* Start Modal */}
            <AnimatePresence>
                {showStartModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[var(--bg-card)] rounded-3xl p-8 max-w-md w-full border border-[var(--border-color)] shadow-2xl text-center"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4">
                                {mockExam.title}
                            </h2>
                            <p className="text-[var(--text-secondary)] font-bold mb-6">
                                سيتم تفعيل وضع ملء الشاشة لمنع الغش. عند الخروج من ملء الشاشة أو ترك التبويب سيتم تسجيل تحذير.
                            </p>
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6 text-amber-500 text-sm font-bold">
                                <AlertTriangle className="w-5 h-5 inline-block ml-2" />
                                الوقت المحدد: {mockExam.duration} دقيقة | عدد الأسئلة: {mockExam.questions.length}
                            </div>
                            <button
                                onClick={startExam}
                                className="w-full py-4 rounded-2xl bg-cyan-500 text-white font-black text-lg hover:bg-cyan-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/30"
                            >
                                <Maximize className="w-5 h-5" />
                                ابدأ الاختبار
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Warning Modal */}
            <AnimatePresence>
                {showWarningModal && !isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-[var(--bg-card)] rounded-3xl p-8 max-w-md w-full border border-red-500/30 shadow-2xl text-center"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-black text-red-500 mb-4">
                                تحذير! ⚠️
                            </h2>
                            <p className="text-[var(--text-secondary)] font-bold mb-4">
                                تم اكتشاف محاولة خروج من وضع الاختبار. يرجى البقاء في وضع ملء الشاشة.
                            </p>
                            <p className="text-red-500 font-black mb-6">
                                عدد التحذيرات: {warningCount} / 2
                            </p>
                            {warningCount >= 2 || examCancelled ? (

                                <button
                                    onClick={handleSubmit}
                                    className="w-full py-4 rounded-2xl bg-red-500 text-white font-black hover:bg-red-600 transition-all"
                                >
                                    تم إنهاء الاختبار تلقائياً
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setShowWarningModal(false);
                                        enterFullscreen();
                                    }}
                                    className="w-full py-4 rounded-2xl bg-cyan-500 text-white font-black hover:bg-cyan-600 transition-all"
                                >
                                    العودة للاختبار
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Modal */}
            <AnimatePresence>
                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[var(--bg-card)] rounded-3xl p-8 max-w-lg w-full border border-[var(--border-color)] shadow-2xl text-center"
                        >
                            <div className={clsx(
                                "w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6",
                                percentage >= 60 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                            )}>
                                <Trophy className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-black text-[var(--text-primary)] mb-2">
                                {percentage >= 60 ? "أحسنت! 🎉" : "حاول مرة أخرى 💪"}
                            </h2>
                            <p className="text-[var(--text-secondary)] font-bold mb-6">
                                {mockExam.title}
                            </p>

                            <div className="bg-[var(--bg-main)] rounded-2xl p-6 mb-6">
                                <div className="text-6xl font-black text-cyan-500 mb-2">
                                    {percentage}%
                                </div>
                                <p className="text-[var(--text-secondary)] font-bold">
                                    {score} من {mockExam.questions.length} إجابات صحيحة
                                </p>
                            </div>

                            {/* Quick Summary */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-emerald-500/10 rounded-xl p-4 text-center">
                                    <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                    <span className="text-2xl font-black text-emerald-500">{score}</span>
                                    <p className="text-xs font-bold text-[var(--text-secondary)]">صحيحة</p>
                                </div>
                                <div className="bg-red-500/10 rounded-xl p-4 text-center">
                                    <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                                    <span className="text-2xl font-black text-red-500">{mockExam.questions.length - score}</span>
                                    <p className="text-xs font-bold text-[var(--text-secondary)]">خاطئة</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Link
                                    to={`/course/${courseId}`}
                                    className="flex-1 py-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] font-black flex items-center justify-center gap-2 hover:bg-[var(--bg-card)] transition-all"
                                >
                                    <Home className="w-5 h-5" />
                                    العودة للكورس
                                </Link>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex-1 py-4 rounded-2xl bg-cyan-500 text-white font-black flex items-center justify-center gap-2 hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/30"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    إعادة المحاولة
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Exam Interface (Only show if not in start modal and not submitted) */}
            {!showStartModal && !isSubmitted && (
                <>
                    {/* Header */}
                    <header className="h-20 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between px-6 sticky top-0 z-30">
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-bold text-[var(--text-secondary)]">{mockExam.courseName}</p>
                                <h1 className="text-lg font-black text-[var(--text-primary)]">{mockExam.title}</h1>
                            </div>
                        </div>
                        <ExamTimer initialMinutes={mockExam.duration} onTimeUp={handleTimeUp} />
                    </header>

                    {/* Main Content */}
                    <div className="flex gap-8 p-8 max-w-7xl mx-auto">
                        {/* Question Area */}
                        <div className="flex-1">
                            <AnimatePresence mode="wait">
                                <QuestionCard
                                    key={currentQuestion.id}
                                    question={currentQuestion}
                                    questionNumber={currentQuestionIndex + 1}
                                    selectedAnswer={answers.get(currentQuestionIndex) || null}
                                    isFlagged={flaggedQuestions.has(currentQuestionIndex)}
                                    onAnswer={handleAnswer}
                                    onToggleFlag={handleToggleFlag}
                                />
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-8">
                                <button
                                    onClick={goPrev}
                                    disabled={currentQuestionIndex === 0}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-main)] transition-all"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                    السابق
                                </button>

                                {currentQuestionIndex === mockExam.questions.length - 1 ? (
                                    <button
                                        onClick={handleSubmit}
                                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 text-white font-black hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30"
                                    >
                                        <Send className="w-5 h-5" />
                                        إرسال الإجابات
                                    </button>
                                ) : (
                                    <button
                                        onClick={goNext}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/30"
                                    >
                                        التالي
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="w-72 shrink-0">
                            <QuestionNav
                                totalQuestions={mockExam.questions.length}
                                currentQuestion={currentQuestionIndex}
                                answeredQuestions={answeredQuestions}
                                flaggedQuestions={flaggedQuestions}
                                onNavigate={goToQuestion}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
