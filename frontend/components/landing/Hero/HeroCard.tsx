interface HeroCardProps {
    value: string;
    label: string;
    variant: "paper" | "ink" | "acid";
}

const variants = {
    paper: {
        container: "bg-paper text-ink",
        value: "text-ink",
    },
    ink: {
        container: "bg-ink text-paper",
        value: "text-acid",
    },
    acid: {
        container: "bg-acid text-ink",
        value: "text-ink",
    },
} as const;

export function HeroCard({
    value,
    label,
    variant,
}: HeroCardProps) {
    return (
        <div
            className={`
                shadow-brutal
                border-[3px]
                border-ink
                p-5
                ${variants[variant].container}
            `}
        >
            <div
                className={`
                    font-[family:var(--font-black)]
                    text-4xl
                    tracking-tight
                    ${variants[variant].value}
                `}
            >
                {value}
            </div>

            <div className="mt-2 font-[family:var(--font-mono)] text-[11px] font-bold uppercase tracking-wide opacity-80">
                {label}
            </div>
        </div>
    );
}