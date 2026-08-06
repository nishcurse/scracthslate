"use client";

import { Icon } from "@iconify/react";

import {useGoogleAuth} from "@/auth/useGoogleAuth"

interface GoogleSignInButtonProps {
    className?: string;
    variant?: "navbar" | "hero";
}

export function GoogleSignInButton({
    className,
    variant = "navbar",
}: GoogleSignInButtonProps) {
    const isHero = variant === "hero";
    const { signIn } = useGoogleAuth();

    return (
        <button
            className={`
                ${isHero ? "shadow-brutal border-[3px] px-8 py-4 text-sm tracking-wide" : "shadow-brutal-sm border-2 px-4 py-2.5 text-xs tracking-wider"}
                btn-brutal
                border-ink
                bg-ink
                font-display
                uppercase
                text-paper
                ${isHero ? "inline-flex items-center gap-2" : ""}
                ${className ?? ""}
            `}
            onClick={signIn}
        >
            {isHero && (
                <Icon
                    icon="logos:google-icon"
                    className="text-lg"
                />
            )}
            {isHero ? "Sign in with Google" : "Sign In"}
        </button>
    );
}