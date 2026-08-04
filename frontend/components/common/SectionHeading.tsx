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
                    <span className="block font-mono text-xs uppercase tracking-widest text-ink/65">
                        {badge}
                    </span>
                </div>
            )}

            <h2 className="font-black text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] uppercase tracking-tight">
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