import { SectionHeading } from "@/components/common/SectionHeading";
import { WHY_SECTION } from "@/constants/landing";

import { WhyCard } from "./WhyCard";

export function WhySection() {
    return (
        <section
            id="why"
            className="border-b-[3px] border-ink bg-paper py-16 sm:py-24"
        >
            <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
                <SectionHeading
                    badge={WHY_SECTION.section}
                    title={WHY_SECTION.title}
                />

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {WHY_SECTION.cards.map((card) => (
                        <WhyCard
                            key={card.title}
                            {...card}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}