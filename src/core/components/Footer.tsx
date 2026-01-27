// ============================================================
// Footer - Ahmed Rady Platform
// ============================================================

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const LOGO_PATH = '/src/assets/images/logo1.png';

export function Footer() {
    return (
        <footer className="relative py-20 bg-[#020617] text-white overflow-hidden border-t border-white/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex flex-col items-center lg:items-start gap-4">
                            <img src={LOGO_PATH} alt="Ahmed Rady Platform" className="h-20 w-20 rounded-2xl object-contain border border-[#C5A059]/30 shadow-2xl bg-white/5 p-1" />
                            <span className="text-2xl font-black font-display text-center lg:text-right">منصة <span className="text-[#C5A059]">الأستاذ أحمد راضي</span></span>
                        </Link>
                        <p className="text-slate-400 font-bold leading-relaxed text-sm">
                            المنصة المتخصصة الأولى في تدريس اللغة العربية للمرحلة الثانوية. نسعى لتبسيط العلم وجعله ممتعاً.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C5A059] hover:border-[#C5A059] transition-all group">
                                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-black mb-6 font-display">روابط سريعة</h4>
                        <ul className="space-y-4 font-bold text-slate-400">
                            <li><Link to="/" className="hover:text-cyan-500 transition-colors">الرئيسية</Link></li>
                            <li><Link to="/about" className="hover:text-cyan-500 transition-colors">عن الأستاذ</Link></li>
                            <li><Link to="/courses" className="hover:text-cyan-500 transition-colors">الكورسات</Link></li>
                            <li><Link to="/register" className="hover:text-cyan-500 transition-colors">إنشاء حساب</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-xl font-black mb-6 font-display">الدعم والمساعدة</h4>
                        <ul className="space-y-4 font-bold text-slate-400">
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">الأسئلة الشائعة</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">سياسة الخصوصية</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">الشروط والأحكام</a></li>
                            <li><a href="#" className="hover:text-cyan-500 transition-colors">تواصل معنا</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-black mb-6 font-display">تواصل معنا</h4>
                        <ul className="space-y-5">
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all shadow-lg">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-300">01000000000</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all shadow-lg">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-300">contact@ahmedrady.com</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all shadow-lg">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-300">القاهرة، مصر</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 font-bold text-sm">© 2026 منصة الأستاذ أحمد راضي. جميع الحقوق محفوظة.</p>
                    <div className="flex gap-6 text-slate-500 font-bold text-sm">
                        <a href="#" className="hover:text-[#C5A059] transition-colors">شروط الاستخدام</a>
                        <a href="#" className="hover:text-[#C5A059] transition-colors">سياسة الخصوصية</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
