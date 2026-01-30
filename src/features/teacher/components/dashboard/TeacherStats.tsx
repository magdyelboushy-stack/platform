import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, DollarSign } from 'lucide-react';
import { StatCard } from '../../../dashboard/components/StatCard';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function TeacherStats() {
    const stats = [
        {
            title: 'إجمالي الطلاب',
            value: '0',
            icon: Users,
            trend: { value: 0, isPositive: true },
            color: 'indigo' as const,
        },
        {
            title: 'اشتراكات الكورسات',
            value: '0',
            icon: BookOpen,
            trend: { value: 0, isPositive: true },
            color: 'violet' as const,
        },
        {
            title: 'الامتحانات المجابة',
            value: '0',
            icon: GraduationCap,
            trend: { value: 0, isPositive: false },
            color: 'emerald' as const,
        },
        {
            title: 'صافي الأرباح',
            value: '0 ج.م',
            icon: DollarSign,
            trend: { value: 0, isPositive: true },
            color: 'amber' as const,
        },
    ];

    return (
        <motion.section variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <StatCard
                    key={stat.title}
                    {...stat}
                    delay={index * 0.05}
                />
            ))}
        </motion.section>
    );
}
