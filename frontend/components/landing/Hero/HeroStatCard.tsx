type HeroStatCardVariant = "paper" | "ink" | "acid";

interface HeroStatCardProps {
    value: string;
    label: string;
    variant: HeroStatCardVariant;
}

const variantStyles: Record<HeroStatCardVariant, string> = {
    paper: "bg-paper text-ink",

    ink: "bg-ink text-paper",

    acid: "bg-acid text-ink",
};

const valueStyles: Record<HeroStatCardVariant, string> = {
    paper: "text-ink",

    ink: "text-acid",

    acid: "text-ink",
};

export function HeroStatCard({
    value,
    label,
    variant,
}: HeroStatCardProps) {
    return (
        <div
            className={`
                shadow-brutal
                border-[3px]
                border-ink
                p-5
                ${variantStyles[variant]}
            `}
        >
            <div
                className={`
                    font-display
                    text-4xl
                    tracking-tight
                    ${valueStyles[variant]}
                `}
            >
                {value}
            </div>

            <div className="mt-2 font-mono text-[11px] font-bold uppercase tracking-wide">
                {label}
            </div>
        </div>
    );
}