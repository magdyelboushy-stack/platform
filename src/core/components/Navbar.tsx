// ============================================================
// Navbar - Premium Bacaloria Edition
// ============================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  Users,
  Info,
  Layers
} from 'lucide-react';
import { clsx } from 'clsx';

import { ThemeToggle } from './ThemeToggle';
import { ProfileDropdown } from './ProfileDropdown';
import { useAuthStore } from '@/store/authStore';

// Branding Assets
const TEACHER_IMAGE = '/src/assets/images/image.png';

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'عن المدرس', href: '/teachers', icon: Users },
  { label: 'عن المنصة', href: '/about', icon: Info },
  { label: 'الكورسات', href: '/courses', icon: Layers },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[var(--bg-secondary)]/90 backdrop-blur-md border-b border-[var(--border-color)] py-2 shadow-xl'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-brand-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-all" />
                <img
                  src={TEACHER_IMAGE}
                  alt="Mr. Ahmed Rady"
                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-500/30 object-cover shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] leading-none mb-1">Ahmed Rady</span>
                <span className="text-xl font-black text-[var(--text-primary)] leading-none tracking-tight transition-colors">الأستاذ أحمد راضي</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Unified Premium Design */}
          <div className="hidden lg:flex items-center gap-1 bg-white/50 dark:bg-[var(--dark-panel)] p-1.5 rounded-full border border-brand-500/10 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={clsx(
                    'px-6 py-2.5 rounded-full text-sm font-black transition-all duration-500 scale-animation relative group overflow-hidden whitespace-nowrap',
                    isActive
                      ? 'bg-[#C5A059] text-white shadow-xl shadow-[#C5A059]/30'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  )}
                >
                  <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none z-0" />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* Authenticated Links (My Courses Template) */}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={clsx(
                  'px-6 py-2.5 rounded-full text-sm font-black transition-all duration-500 scale-animation relative group overflow-hidden whitespace-nowrap',
                  location.pathname === '/dashboard'
                    ? 'bg-[#C5A059] text-white shadow-xl shadow-[#C5A059]/30'
                    : 'text-[var(--text-secondary)] hover:text-white'
                )}
              >
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none z-0" />
                <span className="relative z-10">كورساتي</span>
              </Link>
            )}
          </div>

          {/* Action Buttons - Standardized Hover Effects */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 bg-white/50 dark:bg-[var(--dark-panel)] p-1 rounded-full border border-brand-500/10 backdrop-blur-md shadow-sm">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex p-3 rounded-full text-[var(--text-secondary)] hover:text-white transition-all relative group overflow-hidden scale-animation"
              >
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none z-0" />
                <Search className="w-5 h-5 relative z-10" />
              </button>

              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <div className="hidden lg:flex items-center gap-1">
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-full text-sm font-black text-[var(--text-primary)] hover:text-white transition-all duration-500 scale-animation relative group overflow-hidden whitespace-nowrap"
                  >
                    <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none z-0" />
                    <span className="relative z-10">تسجيل دخول</span>
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 rounded-full bg-[#C5A059] text-white text-sm font-black shadow-xl shadow-[#C5A059]/30 hover:shadow-[#C5A059]/50 transition-all duration-500 scale-animation relative group overflow-hidden whitespace-nowrap"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none z-0" />
                    <span className="relative z-10">طالب جديد</span>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[var(--text-secondary)] flex items-center justify-center transition-transform active:scale-95"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-[var(--bg-main)] px-6 py-8 md:hidden"
            dir="rtl"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <img src={TEACHER_IMAGE} alt="Mr. Ahmed Rady" className="w-10 h-10 rounded-full border border-brand-500/30 shadow-md" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-brand-500 leading-none mb-0.5">Ahmed Rady</span>
                  <span className="text-sm font-black text-[var(--text-primary)] leading-none">الأستاذ أحمد راضي</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-white/5 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-5 rounded-[2rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--color-brand)] hover:text-white transition-all shadow-sm"
                >
                  <span className="text-xl font-black font-display">{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-10 grid grid-cols-2 gap-4">
              {isAuthenticated ? (
                <Link
                  key="mobile-dashboard"
                  to="/dashboard/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-center rounded-[2rem] bg-[var(--color-brand)] font-black text-white shadow-xl shadow-brand-500/30 col-span-2"
                >
                  حسابي
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 text-center rounded-[2rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] font-black text-[var(--text-primary)] hover:bg-white/10"
                  >
                    تسجيل دخول
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 text-center rounded-[2rem] bg-[var(--color-brand)] font-black text-white shadow-xl shadow-brand-500/30"
                  >
                    طالب جديد
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
