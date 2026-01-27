// ============================================================
// Teacher Dashboard Home - LMS Analytics with Theme Support
// ============================================================

import { Users, BookOpen, GraduationCap, DollarSign, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const incomeData = [
    { name: 'يناير', income: 0, students: 0 },
    { name: 'فبراير', income: 0, students: 0 },
    { name: 'مارس', income: 0, students: 0 },
    { name: 'أبريل', income: 0, students: 0 },
    { name: 'مايو', income: 0, students: 0 },
    { name: 'يونيو', income: 0, students: 0 },
    { name: 'يوليو', income: 0, students: 0 },
];

export function TeacherDashboard() {
    const stats = [
        {
            title: 'إجمالي الطلاب',
            value: '0',
            icon: Users,
            trend: '+0%',
            isPositive: true,
            color: 'cyan'
        },
        {
            title: 'اشتراكات الكورسات',
            value: '0',
            icon: BookOpen,
            trend: '+0%',
            isPositive: true,
            color: 'violet'
        },
        {
            title: 'الامتحانات المجابة',
            value: '0',
            icon: GraduationCap,
            trend: '-0%',
            isPositive: false,
            color: 'emerald'
        },
        {
            title: 'صافي الأرباح',
            value: '0 ج.م',
            icon: DollarSign,
            trend: '+0%',
            isPositive: true,
            color: 'amber'
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Banner */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">مرحباً، أ/ أحمد 👋</h1>
                    <p className="text-[var(--text-secondary)] font-medium">إليك ملخص أداء الطلاب ومبيعات الكورسات هذا الشهر.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[var(--bg-card)] hover:bg-[var(--bg-main)] text-[var(--text-primary)] rounded-xl border border-[var(--border-color)] font-bold transition-colors">
                        تحميل التقرير
                    </button>
                    <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-colors">
                        + كورس جديد
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/20 transition-colors shadow-sm"
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-${stat.color}-500`}>
                            <stat.icon className="w-24 h-24 transform translate-x-4 -translate-y-4" />
                        </div>

                        <div className="relative z-10 flex justify-between items-start mb-6">
                            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.trend}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-[var(--text-primary)] mb-1">{stat.value}</h3>
                            <p className="text-[var(--text-secondary)] font-bold text-sm">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Area Chart */}
                <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-cyan-500" />
                                إحصائيات الأرباح والطلاب
                            </h3>
                            <p className="text-[var(--text-secondary)] text-xs">تحليل مقارن لأداء المنصة خلال الـ 7 أشهر الماضية</p>
                        </div>
                        <select className="bg-[var(--bg-main)] text-[var(--text-primary)] text-sm px-4 py-2 rounded-xl border border-[var(--border-color)] outline-none focus:border-cyan-500/50 transition-colors">
                            <option>آخر 7 أيام</option>
                            <option>هذا الشهر</option>
                            <option>هذا العام</option>
                        </select>
                    </div>

                    <div className="h-[350px] w-full" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={incomeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Area type="monotone" dataKey="income" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" name="الأرباح" />
                                <Area type="monotone" dataKey="students" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" name="الطلاب" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Side List - Top Courses */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 flex flex-col shadow-sm">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">الكورسات الأعلى مبيعاً</h3>
                    <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-2">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-[var(--bg-main)] rounded-xl transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-[var(--bg-main)] flex items-center justify-center text-[var(--text-secondary)] font-bold text-xs shrink-0 border border-[var(--border-color)]">
                                    IMG
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[var(--text-primary)] font-bold text-sm truncate group-hover:text-cyan-500 transition-colors">النحو الشامل 2024</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-[var(--text-secondary)]">1,200 طالب</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                                        <span className="text-xs text-emerald-500 font-bold">450 ج.م</span>
                                    </div>
                                </div>
                                <div className="text-[var(--text-secondary)] flex flex-col items-end">
                                    <span className="text-xs font-bold text-[var(--text-primary)]">#1</span>
                                    <TrendingUp className="w-3 h-3 text-emerald-500 mt-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-sm transition-all">
                        عرض كل الكورسات
                    </button>
                </div>
            </div>

            {/* Quick Actions & Pending Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-indigo-500/20 text-indigo-500 rounded-xl">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <button className="text-indigo-500 text-sm font-bold hover:underline">التفاصيل</button>
                    </div>
                    <h3 className="text-[var(--text-primary)] font-bold text-lg mb-1">المحفظة والأرباح</h3>
                    <p className="text-[var(--text-secondary)] text-cm mb-6">رصيدك الحالي القابل للسحب هو <span className="text-[var(--text-primary)] font-black">12,500 ج.م</span></p>
                    <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors">
                        طلب سحب رصيد
                    </button>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-xl">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg text-xs font-bold animate-pulse">
                            3 مهام
                        </span>
                    </div>
                    <h3 className="text-[var(--text-primary)] font-bold text-lg mb-1">واجبات بانتظار التصحيح</h3>
                    <p className="text-[var(--text-secondary)] text-cm mb-6">يوجد 3 واجبات مقالية جديدة تحتاج إلى مراجعة يدوية.</p>
                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors">
                        بدء التصحيح
                    </button>
                </div>
            </div>
        </div>
    );
}
