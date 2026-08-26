"use client";

import { Icon } from "@iconify/react";

type DashboardBtnProps = {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
};

export function DashboardBtn({
    children,
    onClick,
    href,
    className,
}: DashboardBtnProps) {
    const classes = `
        shadow-brutal
        border-[3px]
        px-8
        py-4
        text-sm
        tracking-wide
        btn-brutal
        border-ink
        bg-ink
        font-display
        uppercase
        text-paper
        inline-flex
        items-center
        gap-2
        ${className ?? ""}
    `;

    const content = (
        <>
            <Icon
                icon="ph:squares-four-bold"
                className="text-lg"
            />

            <span>{children}</span>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className={classes}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={classes}
        >
            {content}
        </button>
    );
}