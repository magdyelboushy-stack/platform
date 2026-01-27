import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CreditCard, Phone, Terminal, Plus, Loader2, CheckCircle2 } from 'lucide-react';

type VerifyStatus = 'idle' | 'checking' | 'success' | 'invalid';

export function WalletActions() {
    const [promoCode, setPromoCode] = useState('');
    const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');

    const handleRedeem = () => {
        if (!promoCode) return;
        setVerifyStatus('checking');

        // Simulate premium verification sequence
        setTimeout(() => {
            setVerifyStatus('success');
            setPromoCode('');
        }, 2500);
    };

    const depositMethods = [
        { name: 'فوري (Fawry)', icon: CreditCard, color: '#f59e0b' },
        { name: 'فودافون كاش', icon: Phone, color: '#ef4444' },
    ];

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* 1. Redeem Code Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-12 xl:col-span-12 p-8 rounded-[2.5rem] bg-white/40 dark:bg-[var(--bg-card)] border border-brand-500/10 backdrop-blur-xl shadow-xl space-y-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                            <Terminal className="w-5 h-5 text-[var(--color-brand)]" />
                        </div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] font-display tracking-tight">شحن رصيد بواسطة كود</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="اكتب كود الشحن هنا..."
                                className="w-full px-8 py-5 rounded-2xl bg-white/50 dark:bg-black/20 border-2 border-brand-500/10 focus:border-brand-500/50 outline-none font-black text-lg transition-all placeholder:text-[var(--text-secondary)] placeholder:opacity-50"
                            />
                            <div className="absolute inset-0 rounded-2xl border border-brand-500/0 group-hover:border-brand-500/20 pointer-events-none transition-all" />
                        </div>
                        <button
                            onClick={handleRedeem}
                            className="px-10 py-5 rounded-2xl bg-[var(--color-brand)] text-white font-black text-lg shadow-xl shadow-brand-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            <Zap className="w-5 h-5 fill-current" />
                            تفعيل الكود
                        </button>
                    </div>
                    <p className="text-xs font-bold text-[var(--text-secondary)] opacity-60 text-right pr-4">أدخل كود الشحن المكون من أرقام وحروف لتعبئة محفظتك فوراً.</p>
                </motion.div>

                {/* 2. Quick Deposit Methods */}
                {depositMethods.map((method, index) => (
                    <motion.div
                        key={method.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="lg:col-span-6 p-6 rounded-[2rem] bg-white/40 dark:bg-[var(--bg-card)] border border-brand-500/5 hover:border-brand-500/30 transition-all group flex flex-row-reverse items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-4 flex-row-reverse">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
                                style={{ background: `${method.color}15`, color: method.color }}
                            >
                                <method.icon className="w-7 h-7" />
                            </div>
                            <div className="text-right">
                                <h4 className="text-lg font-black text-[var(--text-primary)]">{method.name}</h4>
                                <p className="text-xs font-bold text-[var(--text-secondary)] opacity-50">شحن آمن وسريع</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/10 transition-all">
                            <Plus className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--color-brand)]" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Custom Luxe Dialog (Modal) */}
            <AnimatePresence>
                {verifyStatus !== 'idle' && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => verifyStatus !== 'checking' && setVerifyStatus('idle')}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 10 }}
                            className="relative w-full max-w-md p-10 rounded-[3rem] bg-white dark:bg-[var(--bg-card)] border-4 border-brand-500/20 shadow-[0_50px_100px_-20px_rgba(197,160,89,0.5)] text-center overflow-hidden"
                        >
                            <AnimatePresence mode="wait">
                                {verifyStatus === 'checking' ? (
                                    <motion.div
                                        key="checking"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="space-y-6 py-4"
                                    >
                                        <div className="relative w-24 h-24 mx-auto">
                                            <div className="absolute inset-0 rounded-full border-4 border-brand-500/10 animate-ping" />
                                            <div className="relative w-full h-full rounded-full bg-brand-500/5 flex items-center justify-center border-2 border-brand-500/20">
                                                <Loader2 className="w-12 h-12 text-brand-500 animate-spin" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-[var(--text-primary)] mb-2 font-display">جاري التحقق...</h4>
                                            <p className="text-[var(--text-secondary)] font-bold">يتم الآن مراجعة كود الشحن وتأكيد العملية</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="space-y-6 py-4"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto border-4 border-emerald-500/30">
                                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-3xl font-black text-emerald-500 font-display">تم الشحن بنجاح!</h4>
                                            <p className="text-[var(--text-secondary)] font-bold">تم إضافة المبلغ إلى محفظتك الإلكترونية بنجاح.</p>
                                        </div>
                                        <button
                                            onClick={() => setVerifyStatus('idle')}
                                            className="w-full py-4 bg-emerald-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all"
                                        >
                                            رائع! شكراً لك
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Background Glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
