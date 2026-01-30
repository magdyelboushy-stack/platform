// ============================================================
// Exam Editor Page - Premium Redesign
// ============================================================

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

import { ExamBuilderHeader } from './components/ExamBuilderHeader';
import { ExamSettingsForm } from './components/ExamSettingsForm';
import { QuestionSidebar } from './components/QuestionSidebar';
import { QuestionEditor } from './components/QuestionEditor';

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
    feedback: string;
}

export function ExamEditorPage() {
    const { id } = useParams();
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

    const updateQuestion = (qId: string, updates: Partial<Question>) => {
        setQuestions(questions.map(q => q.id === qId ? { ...q, ...updates } : q));
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
                options: [...q.options, { id: Date.now().toString(), text: '', isCorrect: false }]
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

    const handleSave = () => {
        // Logic to save exam
        console.log('Saving Exam:', { examTitle, duration, passScore, questions });
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Header Area */}
            <ExamBuilderHeader
                title={examTitle}
                questionsCount={questions.length}
                duration={duration}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onSave={handleSave}
            />

            {/* Main Interactive Workspace */}
            <div className="flex-1 min-h-0">
                {activeTab === 'settings' ? (
                    <ExamSettingsForm
                        title={examTitle}
                        setTitle={setExamTitle}
                        duration={duration}
                        setDuration={setDuration}
                        passScore={passScore}
                        setPassScore={setPassScore}
                    />
                ) : (
                    <div className="h-full grid grid-cols-12 gap-8 px-2">
                        {/* Sidebar: Question List */}
                        <div className="col-span-3 h-full">
                            <QuestionSidebar
                                questions={questions}
                                selectedId={selectedQuestionId}
                                setSelectedId={setSelectedQuestionId}
                                onAdd={handleAddQuestion}
                            />
                        </div>

                        {/* Surface: Rich Editor */}
                        <div className="col-span-9 h-full min-h-0">
                            {activeQuestion ? (
                                <QuestionEditor
                                    question={activeQuestion}
                                    onUpdate={(updates) => updateQuestion(activeQuestion.id, updates)}
                                    onUpdateOption={(optId, text) => updateOption(activeQuestion.id, optId, text)}
                                    onSetCorrect={(optId) => setCorrectOption(activeQuestion.id, optId)}
                                    onAddOption={() => addOption(activeQuestion.id)}
                                    onDeleteOption={(optId) => deleteOption(activeQuestion.id, optId)}
                                />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] opacity-40">
                                    <div className="w-20 h-20 rounded-full bg-[var(--bg-main)] flex items-center justify-center border border-[var(--border-color)] mb-6 shadow-inner">
                                        <FileQuestion className="w-10 h-10" />
                                    </div>
                                    <p className="font-black text-xl">اختر سؤالاً من القائمة الجانبية لبدء التعديل</p>
                                    <p className="text-sm font-bold mt-2">أو أضف سؤالاً جديداً تماماً للامتحان</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Background Atmosphere */}
            <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
        </div>
    );
}
