import Link from "next/link";
import { Icon } from "@iconify/react";

interface HeroActionButtonProps {
    href: string;
    children: React.ReactNode;
    icon: string;
    variant?: "primary" | "secondary";
}

export function HeroActionButton({
    href,
    children,
    icon,
    variant = "primary",
}: HeroActionButtonProps) {
    return (
        <Link
            href={href}
            className={`
                shadow-brutal
                btn-brutal
                inline-flex
                items-center
                gap-2
                border-[3px]
                border-ink
                px-8
                py-4
                text-sm
                font-display
                uppercase
                tracking-wide
                ${variant === "primary"
                    ? "bg-ink text-paper"
                    : "bg-paper text-ink"
                }
            `}
        >
            <Icon icon={icon} className="text-xl" />

            {children}
        </Link>
    );
}