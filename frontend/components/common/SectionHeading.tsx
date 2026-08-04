interface SectionHeadingProps {
    badge?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}

export function SectionHeading({
    badge,
    title,
    description,
    align = "left",
}: SectionHeadingProps) {
    return (
        <div
            className={
                align === "center"
                    ? "mx-auto max-w-3xl text-center"
                    : "max-w-3xl"
            }
        >
            {badge && (
                <div className="mb-5">
                    <span className="shadow-brutal-sm inline-flex border-[3px] border-ink bg-acid px-3 py-1 font-[family:var(--font-mono)] text-xs font-bold uppercase tracking-[0.18em]">
                        {badge}
                    </span>
                </div>
            )}

            <h2 className="font-[family:var(--font-black)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] uppercase tracking-[-0.03em]">
                {title}
            </h2>

            {description && (
                <p className="mt-6 text-lg leading-relaxed text-ink/75">
                    {description}
                </p>
            )}
        </div>
    );
}