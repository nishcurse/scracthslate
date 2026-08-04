import { SectionHeading } from "@/components/common/SectionHeading";
import { FEATURES_SECTION } from "@/constants/landing";

import { FeatureCard } from "./FeatureCard";

export function FeatureGrid() {
    return (
        <section
            id="features"
            className="grid-bg border-b-[3px] border-ink py-16 sm:py-24"
        >
            <div className="mx-auto max-w-310 px-5 sm:px-8">
                <SectionHeading
                    badge={FEATURES_SECTION.section}
                    title={FEATURES_SECTION.title}
                />

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES_SECTION.cards.map((card) => (
                        <FeatureCard
                            key={card.title}
                            {...card}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}