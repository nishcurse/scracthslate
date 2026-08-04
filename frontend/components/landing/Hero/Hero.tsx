import { HERO } from "@/constants/landing";

import { GoogleSignInButton } from "@/components/auth/GoogleSigninButton";

import { HeroActionButton } from "./HeroActionButton";
import { HeroCard } from "./HeroCard";
import { HeroFeature } from "./HeroFeature";

export function Hero() {
    return (
        <section className="grid-bg border-b-[3px] border-ink py-14 lg:py-24">
            <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
                {/* Badge */}
                <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span className="shadow-brutal-sm border-[3px] border-ink bg-acid px-3 py-1.5 font-[family:var(--font-mono)] text-xs font-bold uppercase tracking-wider">
                        {HERO.badge}
                    </span>

                    <span className="font-[family:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-ink/60">
                        {HERO.version}
                    </span>
                </div>

                <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr]">
                    {/* Left */}
                    <div>
                        <h1 className="font-[family:var(--font-black)] text-[clamp(3rem,8vw,6rem)] leading-[0.9] uppercase tracking-[-0.03em]">
                            {HERO.title.first}

                            <br />

                            <span className="inline-block bg-acid px-2">
                                {HERO.title.highlight}
                            </span>
                        </h1>

                        <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-ink/80">
                            {HERO.description}
                        </p>

                        {/* Actions */}
                        <div className="mt-10 flex flex-wrap gap-4">
                            <GoogleSignInButton />

                            <HeroActionButton
                                href="https://github.com"
                                icon="mdi:github"
                                variant="secondary"
                            >
                                Github
                            </HeroActionButton>
                        </div>

                        {/* Features */}
                        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
                            {HERO.features.map((feature) => (
                                <HeroFeature
                                    key={feature.label}
                                    icon={feature.icon}
                                >
                                    {feature.label}
                                </HeroFeature>
                            ))}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="grid grid-cols-2 gap-5">
                        {HERO.cards.map((card) => (
                            <HeroCard
                                key={card.label}
                                value={card.value}
                                label={card.label}
                                variant={card.variant}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}