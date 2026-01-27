// ============================================================
// HomePage - Ahmed Rady Platform (Arabic Language Expert)
// ============================================================

import {
    MonitorPlay,
    ShieldCheck,
    Award,
    TrendingUp,
    BookOpen
} from 'lucide-react';
import { Navbar } from '@/core/components/Navbar';
import { Footer } from '@/core/components/Footer';
import { ContactSection } from '@/core/components/ContactSection';

// Luxe Components
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';

// Branding Assets
const TEACHER_IMAGE = '/src/assets/images/teacher.png';
const BRAND_IMAGE = '/src/assets/images/brand.jpeg';

// Features (Arabic Focused)
const features_data = [
    {
        icon: BookOpen,
        title: "شرح مبسط لكل فروع اللغة",
        desc: "نحو، بلاغة، أدب، وقصة.. كل الفروع مشروحة بطريقة ممتعة وبسيطة.",
        gradient: "from-[var(--brand-primary)] to-[var(--brand-secondary)]",
        bgGlow: "bg-[var(--brand-primary)]/20"
    },
    {
        icon: TrendingUp,
        title: "تأسيس من الصفر للاحتراف",
        desc: "مش محتاج تكون شاطر في العربي عشان تبدأ، هنأسسك صح لحد الدرجة النهائية.",
        gradient: "from-[var(--brand-accent)] to-[var(--brand-primary)]",
        bgGlow: "bg-[var(--brand-accent)]/20"
    },
    {
        icon: ShieldCheck,
        title: "متابعة اسبوعية وامتحانات",
        desc: "امتحانات دورية ومتابعة مستمرة لمستواك عشان نضمن تفوقك.",
        gradient: "from-[#8E6C3D] to-[#5e482b]", // Brand secondary to dark
        bgGlow: "bg-[var(--brand-secondary)]/20"
    }
];

// Stats (Ahmed Rady's Impact)
const stats_data = [
    { value: "+15K", label: "طالب متفوق", icon: Award },
    { value: "+10", label: "سنوات خبرة", icon: TrendingUp },
    { value: "+500", label: "فيديو شرح", icon: MonitorPlay },
];

// Testimonials (About Ahmed Rady)
const testimonials_data = [
    {
        name: "عمر خالد",
        grade: "الثالث الثانوي",
        text: "مستر أحمد راضي خلاني أحب النحو بعد ما كنت بعاني منه، أسلوبه بسيط جداً وممتع.",
        rating: 5
    },
    {
        name: "مريم حسن",
        grade: "الثاني الثانوي",
        text: "أفضل شرح للبلاغة سمعته في حياتي، شكراً يا مستر على مجهودك معانا.",
        rating: 5
    },
    {
        name: "يوسف إبراهيم",
        grade: "الأول الثانوي",
        text: "المنصة منظمة جداً والفيديوهات جودتها عالية والمتابعة ممتازة.",
        rating: 5
    }
];

// FAQs
const faqs_data = [
    {
        q: "هل الكورس بيشمل كل فروع المادة؟",
        a: "أيوه، الكورس شامل شرح النحو، الأدب، البلاغة، القصة، والقراءة المتحررة."
    },
    {
        q: "إزاي أقدر أشترك في المنصة؟",
        a: "بكل سهولة اضغط على زر 'طالب جديد' وسجل بياناتك، أو تواصل معانا واتساب."
    },
    {
        q: "هل الفيديوهات مسجلة ولا لايف؟",
        a: "الفيديوهات مسجلة بجودة عالية عشان تقدر تتفرج عليها في أي وقت وتراجع براحتك."
    }
];

export function HomePage() {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-300" dir="rtl">
            <Navbar />

            {/* Main Page Layout with Luxe Parts */}
            <Hero
                teacherImage={TEACHER_IMAGE}
                brandImage={BRAND_IMAGE}
                stats={stats_data}
            />

            <Features features={features_data} />

            <Testimonials testimonials={testimonials_data} />

            <FAQ faqs={faqs_data} />

            <ContactSection />
            <Footer />
        </div>
    );
}
