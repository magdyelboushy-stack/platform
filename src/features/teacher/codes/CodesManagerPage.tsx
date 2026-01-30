// ============================================================
// Teacher Activation Codes - Premium Manager Redesign
// ============================================================

import { useState } from 'react';
import { CodesHeader } from './components/CodesHeader';
import { CodesStats } from './components/CodesStats';
import { CodesToolbar } from './components/CodesToolbar';
import { BatchItem } from './components/BatchItem';
import { GenerateCodesModal } from './components/GenerateCodesModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

export function CodesManagerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [batches, setBatches] = useState<any[]>([]);

    const stats = {
        total: batches.reduce((acc, b) => acc + b.count, 0),
        used: batches.reduce((acc, b) => acc + b.used, 0),
        remaining: batches.reduce((acc, b) => acc + (b.count - b.used), 0),
        expired: 0
    };

    const handleGenerate = (data: any) => {
        const newBatch = {
            id: Math.random().toString(),
            name: data.batchName,
            course: data.course === 'all' ? 'رصيد محفظة (عام)' : data.course,
            value: data.value,
            count: data.count,
            used: 0,
            status: 'active',
            createdAt: new Date().toLocaleDateString('en-ZA')
        };
        setBatches([newBatch, ...batches]);
    };

    const filteredBatches = batches.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12 max-w-[1600px] mx-auto py-8 animate-in fade-in duration-700">
            {/* 1. Header Section */}
            <CodesHeader onGenerate={() => setIsGenerating(true)} />

            {/* 2. Key Stats */}
            <CodesStats stats={stats} />

            {/* 3. Filtering Toolbar */}
            <CodesToolbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* 4. Batches Grid */}
            <div className="px-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredBatches.map((batch) => (
                            <motion.div
                                layout
                                key={batch.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <BatchItem
                                    batch={batch}
                                    onPrint={(id) => console.log('Print', id)}
                                    onDownload={(id) => console.log('Download', id)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Empty State */}
                    {filteredBatches.length === 0 && (
                        <div className="col-span-full py-32 text-center">
                            <div className="w-28 h-28 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <Search className="w-12 h-12 text-[var(--text-secondary)] opacity-20" />
                            </div>
                            <h3 className="text-2xl font-black text-[var(--text-primary)] mb-2">لا توجد مجموعات أكواد</h3>
                            <p className="text-[var(--text-secondary)] font-bold opacity-60 max-w-xs mx-auto leading-relaxed">
                                جرب البحث بكلمات أخرى أو قم بتوليد مجموعة أكواد جديدة الآن.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 5. Generator Modal */}
            <GenerateCodesModal
                isOpen={isGenerating}
                onClose={() => setIsGenerating(false)}
                onSubmit={handleGenerate}
            />

            {/* Aesthetics Decor */}
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </div>
    );
}
