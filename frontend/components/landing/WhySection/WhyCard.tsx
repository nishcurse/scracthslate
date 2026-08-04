import { Icon } from "@iconify/react";

interface WhyCardProps {
    icon: string;
    title: string;
    description: string;
    variant: "paper" | "acid" | "ink";
}

const variants = {
    paper: {
        container: "bg-paper text-ink",
        icon: "bg-acid text-ink",
        title: "text-ink",
        description: "text-ink",
    },

    acid: {
        container: "bg-acid text-ink",
        icon: "bg-ink text-acid",
        title: "text-ink",
        description: "text-ink",
    },

    ink: {
        container: "bg-ink text-paper",
        icon: "bg-acid text-ink",
        title: "text-acid",
        description: "text-paper/80",
    },
} as const;

export function WhyCard({
    icon,
    title,
    description,
    variant,
}: WhyCardProps) {
    const style = variants[variant];

    return (
        <div
            className={`shadow-brutal flex flex-col border-[3px] border-ink p-8 ${style.container}`}
        >
            <div
                className={`mb-6 grid h-12 w-12 place-items-center border-[3px] border-ink ${style.icon}`}
            >
                <Icon
                    icon={icon}
                    className="text-2xl"
                />
            </div>

            <h3
                className={`mb-3 font-black text-xl uppercase tracking-tight ${style.title}`}
            >
                {title}
            </h3>

            <p
                className={`text-sm font-medium leading-relaxed ${style.description}`}
            >
                {description}
            </p>
        </div>
    );
}