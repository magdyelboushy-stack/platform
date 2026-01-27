// ============================================================
// CoursesPage - Arabic Language Expert (Smart Modular Edition)
// ============================================================

import { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Navbar } from '@/core/components/Navbar';
import { Footer } from '@/core/components/Footer';
import { ContactSection } from '@/core/components/ContactSection';

// Modular Premium Components
import { CoursesHero } from './components/CoursesHero';
import { CoursesFilters } from './components/CoursesFilters';
import { CoursesGrid } from './components/CoursesGrid';

// Level Mapping for Smart Logic (Expanding to Prep)
const LEVEL_MAP: Record<string, string> = {
    "1": "الصف الأول الثانوي",
    "2": "الصف الثاني الثانوي",
    "3": "الصف الثالث الثانوي",
    "7": "الصف الأول الإعدادي",
    "8": "الصف الثاني الإعدادي",
    "9": "الصف الثالث الإعدادي",
    "الصف الأول الإعدادي": "الصف الأول الإعدادي",
    "الصف الثاني الإعدادي": "الصف الثاني الإعدادي",
    "الصف الثالث الإعدادي": "الصف الثالث الإعدادي",
    "الصف الأول الثانوي": "الصف الأول الثانوي",
    "الصف الثاني الثانوي": "الصف الثاني الثانوي",
    "الصف الثالث الثانوي": "الصف الثالث الثانوي"
};

import { useEffect } from 'react';
import { api } from '@/core/api/client';
import { ENDPOINTS } from '@/core/api/endpoints';

export function CoursesPage() {
    const { user, isAuthenticated } = useAuthStore();
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Core filtering states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("الكل");

    // Fetch Real Data from API
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                // Fetch all courses - standard endpoint
                const response = await api.get<any[]>(ENDPOINTS.COURSES.LIST);
                setCourses(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error("Failed to fetch real courses:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Smart Logic: Pre-lock level if user is logged in
    const defaultLevel = useMemo(() => {
        if (isAuthenticated && user?.grade_level) {
            const rawLevel = user.grade_level.toString();
            return LEVEL_MAP[rawLevel] || rawLevel;
        }
        return "جميع الصفوف";
    }, [isAuthenticated, user]);

    const [selectedLevel, setSelectedLevel] = useState(defaultLevel);

    // Orchestrated filtering logic
    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesSubject = selectedSubject === "الكل" || course.subject === selectedSubject;

            // SECURITY GATE: Logged-in students CANNOT see other levels
            const matchesLevel = isAuthenticated
                ? course.level === defaultLevel // Locked to registered grade
                : (selectedLevel === "جميع الصفوف" || course.level === selectedLevel);

            const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSubject && matchesLevel && matchesSearch;
        });
    }, [selectedSubject, selectedLevel, searchQuery, isAuthenticated, defaultLevel, courses]);

    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-500" dir="rtl">
            <Navbar />

            <main>
                {/* 1. High-Fidelity Hero */}
                <CoursesHero />

                {/* 2. Advanced Smart Filters */}
                <CoursesFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedSubject={selectedSubject}
                    setSelectedSubject={setSelectedSubject}
                    selectedLevel={selectedLevel}
                    setSelectedLevel={setSelectedLevel}
                    isLevelLocked={isAuthenticated} // Disable choice for students
                />

                {/* 3. Personalized Courses Grid */}
                {loading ? (
                    <div className="py-32 text-center text-[var(--text-secondary)] font-black text-2xl animate-pulse">
                        جارٍ تحميل الكورسات...
                    </div>
                ) : (
                    <CoursesGrid courses={filteredCourses} levelName={defaultLevel} />
                )}
            </main>

            <ContactSection />
            <Footer />
        </div>
    );
}
