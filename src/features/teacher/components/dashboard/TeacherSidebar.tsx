import { motion } from 'framer-motion';
import { Wallet, TrendingUp } from 'lucide-react';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function TeacherSidebar() {
    return (
        <motion.section
            variants={itemVariants}
            className="space-y-6"
        >
            {/* Wallet Card */}
            <div className="bg-gradient-to-br from-brand-500/20 to-amber-500/10 border border-brand-500/20 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all duration-500" />
                <div className="relative z-10 text-right">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-brand-500/20 text-brand-500 rounded-xl">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <button className="text-brand-500 text-sm font-bold hover:underline">التفاصيل</button>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1 font-display">المحفظة والأرباح</h3>
                    <p className="text-slate-400 text-sm mb-6">الرصيد القابل للسحب: <span className="text-white font-black">0 ج.م</span></p>
                    <button className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/20">
                        طلب سحب رصيد
                    </button>
                </div>
            </div>

            {/* Top Courses List */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white font-display text-right">الأعلى مبيعاً</h3>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-5">
                    {/* Empty state for courses */}
                    <div className="text-center py-8">
                        <p className="text-slate-500 text-sm">لا يوجد بيانات حالياً</p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
