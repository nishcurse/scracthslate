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
                p-6
                transition-transform
                duration-150
                hover:-translate-y-1
                ${variants[variant].container}
            `}
        >
            <div
                className={`
                    font-[family:var(--font-black)]
                    text-5xl
                    leading-none
                    tracking-tight
                    ${variants[variant].value}
                `}
            >
                {value}
            </div>

            <div className="mt-4 font-[family:var(--font-mono)] text-xs font-bold uppercase tracking-[0.18em] opacity-80">
                {label}
            </div>
        </div>
    );
}