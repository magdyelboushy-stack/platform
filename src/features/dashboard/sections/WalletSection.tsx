// ============================================================
// WalletSection - بيانات المحفظة
// ============================================================

import { WalletBalanceCard } from '../components/wallet/WalletBalanceCard';
import { WalletActions } from '../components/wallet/WalletActions';
import { TransactionHistory } from '../components/wallet/TransactionHistory';

export function WalletSection() {
    // Zeroed data template as requested (No API/Backend/Mock)
    const currentBalance = 0;
    const totalDeposits = 0;
    const totalSpent = 0;
    const transactions: any[] = [];

    return (
        <div className="space-y-12 pb-20 max-w-6xl mx-auto">
            {/* 1. Header Area - Luxe Alignment */}
            <div className="text-right">
                <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-3 font-display tracking-tight transition-colors">
                    بيانات <span className="text-[var(--color-brand)]">المحفظة</span>
                </h2>
                <div className="h-1.5 w-24 bg-[var(--color-brand)] rounded-full mb-4 shadow-[0_0_15px_rgba(197,160,89,0.4)]" />
                <p className="text-[var(--text-secondary)] font-bold text-lg max-w-2xl leading-relaxed">
                    تحكم بالكامل في رصيدك المالي، تابع عملياتك الشرائية، واشحن محفظتك بكل سهولة وأمان.
                </p>
            </div>

            {/* 2. Visual Balance Module */}
            <WalletBalanceCard
                balance={currentBalance}
                totalDeposits={totalDeposits}
                totalSpent={totalSpent}
            />

            {/* 3. Financial Engine (Actions & Recharge) */}
            <WalletActions />

            {/* 4. Transaction Audit Log */}
            <TransactionHistory transactions={transactions} />

            {/* Decorative Element */}
            <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </div>
    );
}
