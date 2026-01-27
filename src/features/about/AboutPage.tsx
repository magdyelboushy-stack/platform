// ============================================================
// AboutPage - Platform Vision & Mission (Modular Redesign)
// ============================================================

import { Navbar } from '@/core/components/Navbar';
import { Footer } from '@/core/components/Footer';
import { ContactSection } from '@/core/components/ContactSection';

// Modular Premium Components
import { AboutHero } from './components/AboutHero';
import { AboutVision } from './components/AboutVision';
import { AboutValues } from './components/AboutValues';
import { AboutFounder } from './components/AboutFounder';

export function AboutPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-500 selection:bg-brand-500 selection:text-white" dir="rtl">
            <Navbar />

            <main className="relative">
                {/* 1. Hero Section - The Premium Hook */}
                <AboutHero />

                {/* 2. Vision & Mission - The Strategic Depth */}
                <AboutVision />

                {/* 3. Global Values - The Foundation */}
                <AboutValues />

                {/* 4. Founder's Message - The Emotional Connection */}
                <AboutFounder />
            </main>

            <ContactSection />
            <Footer />
        </div>
    );
}
