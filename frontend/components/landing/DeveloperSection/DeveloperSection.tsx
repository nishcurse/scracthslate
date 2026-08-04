import { Icon } from "@iconify/react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { DEVELOPER_SECTION } from "@/constants/landing";

import { CodeWindow } from "./CodeWindow";

export function DeveloperSection() {
    return (
        <section
            id="integration"
            className="border-b-[3px] border-ink bg-paper py-16 sm:py-24"
        >
            <div className="mx-auto max-w-310 px-5 sm:px-8">
                <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <SectionHeading
                            badge={DEVELOPER_SECTION.section}
                            title={DEVELOPER_SECTION.title}
                            description={DEVELOPER_SECTION.description}
                        />

                        <a
                            href="#"
                            className="shadow-brutal btn-brutal mt-10 inline-flex items-center gap-3 border-[3px] border-ink bg-ink px-8 py-4 text-sm font-black uppercase tracking-wide text-paper"
                        >
                            <Icon
                                icon="ph:code-bold"
                                className="text-lg text-acid"
                            />

                            {DEVELOPER_SECTION.button}
                        </a>
                    </div>

                    <CodeWindow
                        filename={DEVELOPER_SECTION.filename}
                        code={DEVELOPER_SECTION.code}
                    />
                </div>
            </div>
        </section>
    );
}