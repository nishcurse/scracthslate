import { Icon } from "@iconify/react";

import { DEVELOPER_SECTION } from "@/constants/landing";

export function DeveloperSection() {
    return (
        <section
            id="docs"
            className="border-b-[3px] border-ink bg-paper py-16 sm:py-24"
        >
            <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
                <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <span className="mb-2 block font-[family:var(--font-mono)] text-xs font-bold uppercase tracking-widest text-ink/65">
                            {DEVELOPER_SECTION.section}
                        </span>

                        <h2 className="font-[family:var(--font-black)] text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] tracking-tight uppercase">
                            {DEVELOPER_SECTION.title}
                        </h2>

                        <p className="mt-6 text-base font-medium leading-relaxed text-ink/70 sm:text-lg">
                            {DEVELOPER_SECTION.description}
                        </p>

                        <a
                            href="#"
                            className="shadow-brutal btn-brutal mt-10 inline-flex items-center gap-3 border-[3px] border-ink bg-ink px-8 py-4 font-[family:var(--font-black)] text-sm tracking-wide text-paper uppercase"
                        >
                            <Icon
                                icon="ph:code-bold"
                                className="text-lg text-acid"
                            />
                            {DEVELOPER_SECTION.button}
                        </a>
                    </div>

                    <div className="shadow-brutal-lg flex flex-col overflow-hidden border-[3px] border-ink">
                        <div className="flex items-center justify-between bg-ink px-4 py-3">
                            <div className="font-[family:var(--font-mono)] text-[11px] font-bold tracking-wider text-acid">
                                {DEVELOPER_SECTION.filename}
                            </div>

                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 bg-acid" />
                                <div className="h-3 w-3 bg-paper/30" />
                                <div className="h-3 w-3 bg-paper/30" />
                            </div>
                        </div>

                        <div className="overflow-x-auto bg-paper p-6">
                            <pre className="font-[family:var(--font-mono)] text-[13px] leading-relaxed text-ink">
                                {DEVELOPER_SECTION.code}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}