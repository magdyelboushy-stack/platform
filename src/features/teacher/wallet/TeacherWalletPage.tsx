
// ============================================================
// Teacher Wallet & Reports Page
// ============================================================

import {
    Wallet, TrendingUp, History, ArrowUpRight,
    DollarSign, Calendar, Download, CreditCard
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Wallet data - to be fetched from API
const transactions: any[] = [];
const chartData: any[] = [];

export function TeacherWalletPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">المحفظة والأرباح</h1>
                    <p className="text-[var(--text-secondary)] font-bold">متابعة الإيرادات، المدفوعات، وطلبات سحب الرصيد.</p>
                </div>
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span>طلب سحب رصيد</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Wallet className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-white/80">الرصيد الحالي</span>
                        </div>
                        <h2 className="text-4xl font-black mb-1 dir-ltr text-right">EGP 0</h2>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-md text-white/90">قابل للسحب</span>
                    </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-[var(--text-secondary)]">أرباح الشهر</span>
                    </div>
                    <h2 className="text-3xl font-black text-[var(--text-primary)] mb-1 dir-ltr text-right">EGP 0</h2>
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 justify-end">
                        <ArrowUpRight className="w-3 h-3" />
                        +0% عن الشهر الماضي
                    </span>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <History className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-[var(--text-secondary)]">معلق للسحب</span>
                    </div>
                    <h2 className="text-3xl font-black text-[var(--text-primary)] mb-1 dir-ltr text-right">EGP 0</h2>
                    <span className="text-xs font-bold text-amber-500">يتم المعالجة خلال 24 ساعة</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-xl text-[var(--text-primary)]">تحليل الإيرادات</h3>
                        <select className="bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-secondary)] text-xs font-bold rounded-lg px-3 py-1.5 outline-none">
                            <option>آخر 6 شهور</option>
                            <option>السنة الحالية</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full dir-ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fontSize: 12 }} />
                                <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Area type="monotone" dataKey="income" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-xl text-[var(--text-primary)]">آخر المعاملات</h3>
                        <button className="text-xs font-bold text-cyan-500 hover:text-cyan-400">عرض الكل</button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                        {transactions.map((tx: any) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-cyan-500/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {tx.type === 'income' ? <DollarSign className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-[var(--text-primary)] line-clamp-1">{tx.title}</h4>
                                        <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {tx.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <div className={`font-black text-sm dir-ltr ${tx.type === 'income' ? 'text-emerald-500' : 'text-red-500'
                                        }`}>
                                        {tx.type === 'income' ? '+' : '-'}{tx.amount}
                                    </div>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                        }`}>
                                        {tx.status === 'completed' ? 'ناجحة' : 'قيد الانتظار'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-4 py-3 bg-[var(--bg-main)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl font-bold text-[var(--text-secondary)] hover:text-cyan-500 transition-all flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>تحميل التقرير (PDF)</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
