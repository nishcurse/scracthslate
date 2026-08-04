import { MARQUEE_ITEMS } from "@/constants/landing";

export function Marquee() {
    return (
        <section className="overflow-hidden border-b-[3px] border-ink bg-ink py-4">
            <div className="marquee-track flex whitespace-nowrap font-[family:var(--font-black)] text-lg uppercase tracking-tight text-acid sm:text-xl">
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        className="flex shrink-0 px-4"
                        aria-hidden={copy === 1}
                    >
                        {MARQUEE_ITEMS.map((item) => (
                            <div
                                key={`${copy}-${item}`}
                                className="flex items-center"
                            >
                                <span className="px-6">
                                    {item}
                                </span>

                                <span className="text-paper/30">
                                    /
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}