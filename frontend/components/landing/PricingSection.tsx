import { PRICING_SECTION } from "@/constants/landing";

export function PricingSection() {
    return (
        <section
            id="pricing"
            className="grid-bg border-b-[3px] border-ink py-16 sm:py-24"
        >
            <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
                <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <span className="mb-2 block font-[family:var(--font-mono)] text-xs font-bold uppercase tracking-widest text-ink/65">
                            {PRICING_SECTION.section}
                        </span>

                        <h2 className="font-[family:var(--font-black)] text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] tracking-tight uppercase">
                            {PRICING_SECTION.title}
                        </h2>
                    </div>

                    <p className="max-w-[34ch] text-sm font-medium text-ink/70">
                        {PRICING_SECTION.description}
                    </p>
                </div>

                <div className="shadow-brutal relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-[3px] border-ink bg-paper p-6 md:aspect-[21/9] md:p-12">
                    <div className="relative h-full w-full border-[3px] border-ink bg-white/50">
                        <div className="grid-bg absolute inset-0 opacity-30" />

                        <svg
                            className="absolute inset-0 h-full w-full p-4 md:p-8"
                            viewBox="0 0 1000 400"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <rect x="120" y="100" width="180" height="120" fill="none" stroke="#000" strokeWidth="3" />
                            <circle cx="500" cy="200" r="80" fill="none" stroke="#000" strokeWidth="3" />
                            <rect x="720" y="150" width="200" height="150" fill="none" stroke="#000" strokeWidth="3" />

                            <line x1="300" y1="160" x2="420" y2="180" stroke="#000" strokeWidth="2" strokeDasharray="8 4" />
                            <line x1="580" y1="200" x2="720" y2="225" stroke="#000" strokeWidth="2" />

                            <text x="120" y="90" fontFamily="var(--font-space-mono), monospace" fontSize="12" fontWeight="700" fill="#000" opacity="0.5">
                                NODE_01
                            </text>
                            <text x="720" y="140" fontFamily="var(--font-space-mono), monospace" fontSize="12" fontWeight="700" fill="#000" opacity="0.5">
                                PROTOTYPE_V2
                            </text>

                            <line x1="120" y1="235" x2="300" y2="235" stroke="#000" strokeWidth="1" opacity="0.3" />
                            <path d="M120 230 V240 M300 230 V240" stroke="#000" strokeWidth="1" opacity="0.3" />
                            <text x="210" y="255" fontFamily="var(--font-space-mono), monospace" fontSize="10" fill="#000" opacity="0.3" textAnchor="middle">
                                180px
                            </text>
                        </svg>

                        <div className="absolute top-[35%] left-[42%] z-10 flex -rotate-6 transform flex-col items-start transition-transform duration-300">
                            <svg className="h-7 w-7 fill-current text-acid drop-shadow-[2px_2px_0_#000]" viewBox="0 0 24 24">
                                <path d="M5 3l16 9-7 2 2 7-3 1.5-2-7-6 2V3z" stroke="#000" strokeWidth="1.5" />
                            </svg>

                            <div className="shadow-brutal-sm mt-1 border-2 border-ink bg-acid px-2 py-0.5 font-[family:var(--font-mono)] text-[9px] font-bold tracking-wider uppercase">
                                Designer
                            </div>
                        </div>

                        <div className="absolute right-[25%] bottom-[30%] z-10 flex rotate-12 transform flex-col items-start transition-transform duration-300">
                            <svg className="h-7 w-7 fill-current text-ink" viewBox="0 0 24 24">
                                <path d="M5 3l16 9-7 2 2 7-3 1.5-2-7-6 2V3z" />
                            </svg>

                            <div className="shadow-brutal-sm mt-1 border-2 border-ink bg-ink px-2 py-0.5 font-[family:var(--font-mono)] text-[9px] font-bold tracking-wider text-paper uppercase">
                                Developer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}