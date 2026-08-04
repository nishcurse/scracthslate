import { Navbar } from "./Navbar";
import { Hero } from "./Hero/Hero";
import { WhySection } from "./WhySection/WhySection";
import { Marquee } from "./Marquee/Marquee";
import { FeatureGrid } from "./FeatureGrid/FeatureGrid";
import { DeveloperSection } from "./DeveloperSection/DeveloperSection";
import { PricingSection } from "./PricingSection/PricingSection";
import { CTASection } from "./CTASection/CTASection";
import { Footer } from "./Footer/footer";

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