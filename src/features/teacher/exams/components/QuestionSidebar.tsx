import { Plus, Layers } from 'lucide-react';

interface QuestionSidebarProps {
    questions: any[];
    selectedId: string | null;
    setSelectedId: (id: string) => void;
    onAdd: () => void;
}

export function QuestionSidebar({ questions, selectedId, setSelectedId, onAdd }: QuestionSidebarProps) {
    return (
        <div className="w-full h-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl shadow-black/5">
            <div className="p-6 border-b border-[var(--border-color)] bg-[var(--bg-main)]/50 flex justify-between items-center">
                <div>
                    <h3 className="font-black text-[var(--text-primary)]">هيكل الامتحان</h3>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">قائمة أسئلة الورقة</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center font-black text-sm">
                    {questions.length}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {questions.map((q, idx) => (
                    <button
                        key={q.id}
                        onClick={() => setSelectedId(q.id)}
                        className={`w-full group text-right p-5 rounded-[1.5rem] border transition-all relative overflow-hidden ${selectedId === q.id
                                ? 'bg-[var(--bg-main)] border-[#C5A059] shadow-lg shadow-[#C5A059]/5'
                                : 'bg-transparent border-transparent hover:bg-[var(--bg-main)] hover:border-[var(--border-color)]'
                            }`}
                    >
                        {selectedId === q.id && (
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-[#C5A059]" />
                        )}
                        <div className="flex justify-between items-center mb-2">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${selectedId === q.id ? 'text-[#C5A059]' : 'text-[var(--text-secondary)]'}`}>
                                سؤال {idx + 1}
                            </span>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[10px] font-black text-[var(--text-secondary)]">
                                <Layers className="w-3 h-3" />
                                {q.score}د
                            </div>
                        </div>
                        <p className={`text-sm font-bold truncate ${selectedId === q.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] opacity-80'}`}>
                            {q.text}
                        </p>
                    </button>
                ))}
            </div>

            <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-main)]/50">
                <button
                    onClick={onAdd}
                    className="w-full py-4 bg-[#C5A059] hover:bg-[#AD874B] text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#C5A059]/20"
                >
                    <Plus className="w-5 h-5" />
                    <span>إضافة سؤال</span>
                </button>
            </div>
        </div>
    );
}
