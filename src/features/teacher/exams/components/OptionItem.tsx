import { Check, Trash2 } from 'lucide-react';

interface OptionItemProps {
    id: string;
    text: string;
    isCorrect: boolean;
    index: number;
    onTextChange: (text: string) => void;
    onSetCorrect: () => void;
    onDelete: () => void;
}

export function OptionItem({ text, isCorrect, index, onTextChange, onSetCorrect, onDelete }: OptionItemProps) {
    return (
        <div
            className={`group flex items-center gap-4 p-3 rounded-2xl border transition-all ${isCorrect
                ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/10'
                : 'bg-[var(--bg-main)] border-[var(--border-color)] hover:border-[#C5A059]/30'
                }`}
        >
            <button
                onClick={onSetCorrect}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all shrink-0 ${isCorrect
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'border-[var(--border-color)] text-transparent hover:border-emerald-500/50'
                    }`}
                title="حدد كإجابة صحيحة"
            >
                <Check className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => onTextChange(e.target.value)}
                    className={`w-full bg-transparent border-none outline-none font-bold text-lg placeholder:opacity-30 ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-[var(--text-primary)]'
                        }`}
                    placeholder={`خيار الإجابة رقم ${index + 1}...`}
                />
            </div>

            <button
                onClick={onDelete}
                className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
