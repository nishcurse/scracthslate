import { CTASection } from "./CTASection";
import { DeveloperSection } from "./DeveloperSection";
import { FeatureGrid } from "./FeatureGrid";
import { Footer } from "./Footer";
import { Hero } from "./Hero/Hero";
import { Marquee } from "./Marquee";
import { Navbar } from "./Navbar";
import { PricingSection } from "./PricingSection";
import { WhySection } from "./WhySection/WhySection";

export function LandingPage() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />

                <WhySection />

                <Marquee />

                <FeatureGrid />

                <DeveloperSection />

                <PricingSection />

                <CTASection />
            </main>

            <Footer />
        </>
    );
}