import { SectionHeading } from "@/components/common/SectionHeading";
import { PRICING_SECTION } from "@/constants/landing";

import { CanvasPreview } from "./CanvasPreview";

export function PricingSection() {
    return (
        <section
            id="pricing"
            className="grid-bg border-b-[3px] border-ink py-16 sm:py-24"
        >
            <div className="mx-auto max-w-310 px-5 sm:px-8">
                <div className="mb-12 flex flex-col items-end justify-between gap-6 sm:flex-row">
                    <SectionHeading
                        badge={PRICING_SECTION.section}
                        title={PRICING_SECTION.title}
                    />

                    <p className="max-w-[34ch] text-sm font-medium text-ink/70">
                        {PRICING_SECTION.description}
                    </p>
                </div>

                <CanvasPreview />
            </div>
        </section>
    );
}