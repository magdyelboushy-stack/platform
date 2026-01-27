// ============================================================
// SubscriptionsSection - الاشتراكات
// ============================================================

import { SubscriptionStats } from '../components/subscriptions/SubscriptionStats';
import { SubscriptionList } from '../components/subscriptions/SubscriptionList';

export function SubscriptionsSection() {
    // Zeroed data template as requested (No API/Backend/Mock)
    const subscriptions: any[] = [];
    const totalSubscriptions = 0;
    const activeSubCount = 0;
    const expiredSubCount = 0;
    const totalPaid = 0;

    return (
        <div className="space-y-12 pb-20 max-w-6xl mx-auto">
            {/* 1. Header Area - Luxe Alignment */}
            <div className="text-right">
                <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-3 font-display tracking-tight transition-colors">
                    سجل <span className="text-[var(--color-brand)]">الاشتراكات</span>
                </h2>
                <div className="h-1.5 w-24 bg-[var(--color-brand)] rounded-full mb-4 shadow-[0_0_15px_rgba(197,160,89,0.4)]" />
                <p className="text-[var(--text-secondary)] font-bold text-lg max-w-2xl leading-relaxed">
                    هنا تتابع جميع اشتراكاتك الحالية والسابقة، فترات الصلاحية، وتاريخ الدفع لكل كورس.
                </p>
            </div>

            {/* 2. Stats Module */}
            <SubscriptionStats
                total={totalSubscriptions}
                active={activeSubCount}
                expired={expiredSubCount}
                totalPaid={totalPaid}
            />

            {/* 3. Main Subscriptions Repository */}
            <SubscriptionList subscriptions={subscriptions} />

            {/* Decorative Element */}
            <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
        </div>
    );
}
