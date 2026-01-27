// ============================================================
// App Component - Main Application Shell
// ============================================================

import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { Toasts } from '@/core/components/Toasts';

import { TeacherLayout } from '@/features/teacher/layouts/TeacherLayout';

// Lazy load pages
const HomePage = lazy(() => import('@/features/home/HomePage').then(m => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('@/features/auth/components/LoginForm').then(m => ({ default: m.LoginForm })));
const RegisterPage = lazy(() => import('@/features/auth/components/RegisterForm').then(m => ({ default: m.RegisterForm })));
const StaffLoginPage = lazy(() => import('@/features/auth/components/StaffLoginPage').then(m => ({ default: m.StaffLoginPage })));
const TeacherDashboardPage = lazy(() => import('@/features/teacher/pages/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
const TeacherCoursesPage = lazy(() => import('@/features/teacher/courses/CoursesListPage').then(m => ({ default: m.CoursesListPage })));
const CreateCoursePage = lazy(() => import('@/features/teacher/courses/CreateCoursePage').then(m => ({ default: m.CreateCoursePage })));
const EditCoursePage = lazy(() => import('@/features/teacher/courses/EditCoursePage').then(m => ({ default: m.EditCoursePage })));
const ExamsListPage = lazy(() => import('@/features/teacher/exams/ExamsListPage').then(m => ({ default: m.ExamsListPage })));
const ExamEditorPage = lazy(() => import('@/features/teacher/exams/ExamEditorPage').then(m => ({ default: m.ExamEditorPage })));
const FilesManagerPage = lazy(() => import('@/features/teacher/files/FilesManagerPage').then(m => ({ default: m.FilesManagerPage })));
const CodesManagerPage = lazy(() => import('@/features/teacher/codes/CodesManagerPage').then(m => ({ default: m.CodesManagerPage })));
const StudentsManagerPage = lazy(() => import('@/features/teacher/students/StudentsManagerPage').then(m => ({ default: m.StudentsManagerPage })));
const RequestsManagerPage = lazy(() => import('@/features/teacher/requests/RequestsManagerPage').then(m => ({ default: m.RequestsManagerPage })));
const HomeworkManagerPage = lazy(() => import('@/features/teacher/homework/HomeworkManagerPage').then(m => ({ default: m.HomeworkManagerPage })));
const AssistantsManagerPage = lazy(() => import('@/features/teacher/assistants/AssistantsManagerPage').then(m => ({ default: m.AssistantsManagerPage })));
const TeacherSettingsPage = lazy(() => import('@/features/teacher/settings/TeacherSettingsPage').then(m => ({ default: m.TeacherSettingsPage })));
const TeacherWalletPage = lazy(() => import('@/features/teacher/wallet/TeacherWalletPage').then(m => ({ default: m.TeacherWalletPage })));
const TeacherSupportPage = lazy(() => import('@/features/teacher/support/TeacherSupportPage').then(m => ({ default: m.TeacherSupportPage })));
const TeachersPage = lazy(() => import('@/features/teachers/TeachersPage').then(m => ({ default: m.TeachersPage })));
const AboutPage = lazy(() => import('@/features/about/AboutPage').then(m => ({ default: m.AboutPage })));
const CoursesPage = lazy(() => import('@/features/courses/CoursesPage').then(m => ({ default: m.CoursesPage })));
const CourseDetailsPage = lazy(() => import('@/features/courses/CourseDetailsPage').then(m => ({ default: m.CourseDetailsPage })));
const CoursePlayerPage = lazy(() => import('@/features/courses/CoursePlayerPage').then(m => ({ default: m.CoursePlayerPage })));
const FilesPage = lazy(() => import('@/features/courses/FilesPage').then(m => ({ default: m.FilesPage })));
const ExamPage = lazy(() => import('@/features/exams/ExamPage').then(m => ({ default: m.ExamPage })));
const StudentDashboardPage = lazy(() => import('@/features/dashboard/StudentDashboardPage').then(m => ({ default: m.StudentDashboardPage })));

// Dashboard Sections (Lazy Loaded)
const CoursesSection = lazy(() => import('@/features/dashboard/sections/CoursesSection').then(m => ({ default: m.CoursesSection })));
const ExamResultsSection = lazy(() => import('@/features/dashboard/sections/ExamResultsSection').then(m => ({ default: m.ExamResultsSection })));
const HomeworkResultsSection = lazy(() => import('@/features/dashboard/sections/HomeworkResultsSection').then(m => ({ default: m.HomeworkResultsSection })));
const HomeworkVideosSection = lazy(() => import('@/features/dashboard/sections/HomeworkVideosSection').then(m => ({ default: m.HomeworkVideosSection })));
const WalletSection = lazy(() => import('@/features/dashboard/sections/WalletSection').then(m => ({ default: m.WalletSection })));
const SubscriptionsSection = lazy(() => import('@/features/dashboard/sections/SubscriptionsSection').then(m => ({ default: m.SubscriptionsSection })));
const SettingsSection = lazy(() => import('@/features/dashboard/sections/SettingsSection').then(m => ({ default: m.SettingsSection })));
const NotificationsSection = lazy(() => import('@/features/dashboard/sections/NotificationsSection').then(m => ({ default: m.NotificationsSection })));
const UploadSection = lazy(() => import('@/features/dashboard/sections/UploadSection').then(m => ({ default: m.UploadSection })));
const SupportSection = lazy(() => import('@/features/dashboard/sections/SupportSection').then(m => ({ default: m.SupportSection })));

// Assistant Pages
import { AssistantLayout } from '@/features/assistant/layouts/AssistantLayout';
const AssistantDashboardPage = lazy(() => import('@/features/assistant/pages/AssistantDashboard').then(m => ({ default: m.AssistantDashboardPage })));

// Profile Section (Needs to be extracted to a separate file, but for now we'll keep using the one inside StudentDashboardPage.
// Wait, StudentDashboardPage currently HAS the profile section inside it. I need to EXTRACT it first.)
// Since I can't extract it yet, I will use a temporary placeholder or define it inline. 
// Actually I MUST extract it first or else this will fail.
// PLAN CHANGE: I will let the dashboard default to profile for now, and handle others.
// But wait, the route config expects <ProfileSection>.
// I will create a dummy ProfileSection component or extract the code from StudentDashboardPage.
// Let's create a NEW ProfileSection.tsx first. I'll do that in parallel.
const ProfileSection = lazy(() => import('@/features/dashboard/sections/ProfileSection').then(m => ({ default: m.ProfileSection })));

// Loading Fallback
function LoadingScreen() {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
    );
}

// Protected Route Wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout } = useAuthStore();
    const { showToast } = useUIStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Handle account status
    if (user?.status === 'pending') {
        logout();
        showToast({
            type: 'warning',
            title: 'حسابك قيد المراجعة',
            message: 'سيتم تفعيل حسابك فور مراجعة البيانات من قبل الإدارة.',
        });
        return <Navigate to="/login" replace />;
    }

    if (user?.status === 'blocked') {
        logout();
        showToast({
            type: 'error',
            title: 'حساب محظور',
            message: 'تم تعطيل حسابك. يرجى التواصل مع الدعم الفني للاستفسار.',
        });
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

import { useThemeStore } from '@/store/themeStore';
import { useEffect } from 'react';

export default function App() {
    const { theme } = useThemeStore();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const fetchUser = useAuthStore((s) => s.fetchUser);

    useEffect(() => {
        // Apply theme to html element for global tailwind dark mode
        document.documentElement.className = theme;
    }, [theme]);

    // جلب بيانات المستخدم من /auth/me عند فتح التطبيق (لتحديث الأفاتار من DB)
    useEffect(() => {
        if (isAuthenticated) fetchUser();
    }, [isAuthenticated, fetchUser]);

    return (
        <div className={theme}>
            <Toasts />
            <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300">
                <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/teacher/login" element={<StaffLoginPage />} />
                        <Route path="/admin/login" element={<StaffLoginPage />} />
                        <Route path="/assistant/login" element={<StaffLoginPage />} />

                        {/* Teacher Dashboard Routes */}
                        <Route path="/teacher" element={<TeacherLayout />}>
                            <Route path="dashboard" element={<TeacherDashboardPage />} />
                            <Route path="courses" element={<TeacherCoursesPage />} />
                            <Route path="courses/new" element={<CreateCoursePage />} />
                            <Route path="courses/:id" element={<EditCoursePage />} />
                            <Route path="exams" element={<ExamsListPage />} />
                            <Route path="exams/new" element={<ExamEditorPage />} />
                            <Route path="exams/:id" element={<ExamEditorPage />} />
                            <Route path="files" element={<FilesManagerPage />} />
                            <Route path="codes" element={<CodesManagerPage />} />
                            <Route path="students" element={<StudentsManagerPage />} />
                            <Route path="requests" element={<RequestsManagerPage />} />
                            <Route path="homework" element={<HomeworkManagerPage />} />
                            <Route path="assistants" element={<AssistantsManagerPage />} />
                            <Route path="settings" element={<TeacherSettingsPage />} />
                            <Route path="wallet" element={<TeacherWalletPage />} />
                            <Route path="support" element={<TeacherSupportPage />} />
                            {/* Add other sub-routes as we build them */}
                        </Route>

                        <Route path="/teachers" element={<TeachersPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/course/:id" element={<CourseDetailsPage />} />
                        <Route path="/course/:courseId/learn/:lessonId" element={<CoursePlayerPage />} />
                        <Route path="/course/:courseId/files" element={<FilesPage />} />
                        <Route path="/course/:courseId/exam/:examId" element={<ExamPage />} />
                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <StudentDashboardPage />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Navigate to="profile" replace />} />
                            <Route path="profile" element={<ProfileSection />} />
                            <Route path="courses" element={<CoursesSection />} />
                            <Route path="exams" element={<ExamResultsSection />} />
                            <Route path="homework" element={<HomeworkResultsSection />} />
                            <Route path="upload" element={<UploadSection />} />
                            <Route path="homework-videos" element={<HomeworkVideosSection />} />
                            <Route path="wallet" element={<WalletSection />} />
                            <Route path="subscriptions" element={<SubscriptionsSection />} />
                            <Route path="support" element={<SupportSection />} />
                            <Route path="notifications" element={<NotificationsSection />} />
                            <Route path="settings" element={<SettingsSection />} />
                        </Route>

                        {/* Assistant Dashboard Routes */}
                        <Route path="/assistant" element={<AssistantLayout />}>
                            <Route path="dashboard" element={<AssistantDashboardPage />} />
                            {/* Reusing existing components for now since logic is similar, or add dedicated wrappers later */}
                            <Route path="grading" element={<HomeworkManagerPage />} />
                            <Route path="codes" element={<CodesManagerPage />} />
                            <Route path="requests" element={<RequestsManagerPage />} />
                            <Route path="support" element={<TeacherSupportPage />} />
                        </Route>

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}
