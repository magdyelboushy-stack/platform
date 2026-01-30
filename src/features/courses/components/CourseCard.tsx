import { motion } from 'framer-motion';
import { Star, BookOpen, Users, PlayCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from '@/core/utils/url';
import { formatGradeLevel } from '@/core/utils/localization';
import { clsx } from 'clsx';

export const CourseCard = ({ course, index, onEnroll }: { course: any, index: number, onEnroll?: (id: string) => void }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <div className="h-full bg-[var(--bg-card)] rounded-[3rem] border border-brand-500/10 overflow-hidden hover:border-brand-500/40 transition-all duration-500 shadow-2xl hover:shadow-brand-500/10 flex flex-col scale-animation relative">
                {/* Visual Image Section */}
                <Link to={`/course/${course.id}`} className="relative aspect-[16/10] overflow-hidden block">
                    <img
                        src={getImageUrl(course.thumbnail)}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                    {/* Floating Premium Badges */}
                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                        {course.badge && (
                            <span className="px-5 py-2 rounded-full bg-[#C5A059] text-white text-[10px] font-black shadow-xl uppercase tracking-widest">
                                {course.badge}
                            </span>
                        )}
                        <span className="px-5 py-2 rounded-full bg-white/95 dark:bg-[#0c0c0c]/90 backdrop-blur-md text-[var(--text-primary)] text-[10px] font-black shadow-xl">
                            {formatGradeLevel(course.gradeLevel)}
                        </span>
                    </div>

                    {/* Play Animation */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-20 h-20 rounded-full bg-[#C5A059] text-white flex items-center justify-center shadow-[0_0_50px_rgba(197,160,89,0.5)] scale-50 group-hover:scale-100 transition-transform duration-500 border-4 border-white/30">
                            <PlayCircle className="w-10 h-10 fill-current" />
                        </div>
                    </div>
                </Link>

                {/* Content Details */}
                <div className="p-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-1.5 rounded-xl bg-brand-500/10 text-[#8E6C3D] dark:text-[#E2B659] text-[10px] font-black uppercase tracking-wider border border-brand-500/20">
                            {course.subject}
                        </span>
                        <div className="flex items-center text-[#C5A059] gap-1.5 text-xs font-black mr-auto bg-brand-500/5 px-3 py-1.5 rounded-full border border-brand-500/10">
                            <Star className="w-4 h-4 fill-current" />
                            {course.rating}
                        </div>
                    </div>

                    <Link to={`/course/${course.id}`}>
                        <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4 group-hover:text-[#C5A059] transition-colors font-display leading-[1.4] line-clamp-2">
                            {course.title}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-brand-500/20 border-2 border-brand-500/30 overflow-hidden shadow-lg shadow-brand-500/10">
                            <img src="/src/assets/images/image.png" className="w-full h-full object-cover" alt="Teacher" />
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] font-black tracking-tight">{course.teacherName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 py-6 border-y border-brand-500/10 mb-8">
                        <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                            <BookOpen className="w-5 h-5 text-[#C5A059]" />
                            <span className="text-xs font-black">{course.lessonCount} حصة</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                            <Users className="w-5 h-5 text-[#C5A059]" />
                            <span className="text-xs font-black">{course.enrollmentCount} متفوق</span>
                        </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            {Number(course.price || 0) <= 0 ? (
                                <span className="text-2xl font-black text-emerald-500 leading-none mb-1">مجاني</span>
                            ) : (
                                <>
                                    <span className="text-3xl font-black text-[#C5A059] leading-none mb-1">{Number(course.price || 0)} <small className="text-sm">ج.م</small></span>
                                    {course.oldPrice && (
                                        <span className="text-sm text-slate-500/70 line-through font-bold">{course.oldPrice} ج.م</span>
                                    )}
                                </>
                            )}
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (course.isSubscribed) {
                                    navigate(`/course/${course.id}`);
                                    return;
                                }
                                if (Number(course.price || 0) <= 0 && onEnroll) {
                                    onEnroll(course.id);
                                } else {
                                    navigate(`/course/${course.id}`);
                                }
                            }}
                            className={clsx(
                                "px-10 py-4 rounded-2xl text-white font-black text-xs transition-all active:scale-95 shadow-xl",
                                course.isSubscribed ? "bg-emerald-500 shadow-emerald-500/20" :
                                    (Number(course.price || 0) <= 0
                                        ? "bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600"
                                        : "bg-[#C5A059] shadow-brand-500/20 hover:bg-[#8E6C3D]")
                            )}
                        >
                            {course.isSubscribed ? 'تم الاشتراك' : (Number(course.price || 0) <= 0 ? 'ابدأ مجاناً' : 'احجز الآن')}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
