import { Icon } from "@iconify/react";

import { CTA_SECTION } from "@/constants/landing";

export function CTASection() {
    return (
        <section className="border-b-[3px] border-ink bg-acid py-20 sm:py-32">
            <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-8">
                <h2 className="font-[family:var(--font-black)] text-[clamp(2rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] uppercase">
                    {CTA_SECTION.title.first}
                    <br />
                    {CTA_SECTION.title.second}
                </h2>

                <p className="mx-auto mt-8 max-w-[44ch] text-base leading-relaxed font-medium text-ink/80 sm:text-lg">
                    {CTA_SECTION.description}
                </p>

                <a
                    href="#"
                    className="shadow-brutal-lg btn-brutal mt-12 inline-flex items-center gap-4 border-[3px] border-ink bg-ink px-10 py-5 font-[family:var(--font-black)] text-base tracking-wide text-paper uppercase sm:text-lg"
                >
                    {CTA_SECTION.button}
                    <Icon
                        icon="ph:lightning-bold"
                        className="text-acid"
                    />
                </a>
            </div>
        </section>
    );
}