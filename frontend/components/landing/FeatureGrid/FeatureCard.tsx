import { Icon } from "@iconify/react";

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    variant: "paper" | "ink" | "acid";
}

const variants = {
    paper: {
        container: "bg-paper text-ink",
        iconContainer: "bg-acid text-ink",
        title: "text-ink",
        description: "text-ink/70",
    },

    ink: {
        container: "bg-ink text-paper",
        iconContainer: "bg-acid text-ink",
        title: "text-acid",
        description: "text-paper/70",
    },

    acid: {
        container: "bg-acid text-ink",
        iconContainer: "bg-ink text-acid",
        title: "text-ink",
        description: "text-ink/70",
    },
} as const;

export function FeatureCard({
    icon,
    title,
    description,
    variant,
}: FeatureCardProps) {
    const style = variants[variant];

    return (
        <div
            className={`
                shadow-brutal
                border-[3px]
                border-ink
                p-7
                transition-all
                duration-150
                hover:-translate-y-1
                ${style.container}
            `}
        >
            <div
                className={`
                    mb-5
                    grid
                    h-12
                    w-12
                    place-items-center
                    border-[3px]
                    border-ink
                    ${style.iconContainer}
                `}
            >
                <Icon
                    icon={icon}
                    className="text-2xl"
                />
            </div>

            <h3
                className={`
                    mb-2
                    font-[family:var(--font-black)]
                    text-lg
                    uppercase
                    tracking-tight
                    ${style.title}
                `}
            >
                {title}
            </h3>

            <p
                className={`
                    text-sm
                    leading-relaxed
                    ${style.description}
                `}
            >
                {description}
            </p>
        </div>
    );
}