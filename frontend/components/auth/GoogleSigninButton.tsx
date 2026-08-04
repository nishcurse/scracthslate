import { Icon } from "@iconify/react";

interface GoogleSignInButtonProps {
    className?: string;
    variant?: "navbar" | "hero";
}

export function GoogleSignInButton({
    className,
    variant = "navbar",
}: GoogleSignInButtonProps) {
    const isHero = variant === "hero";

    return (
        <button
            className={`
                ${isHero ? "shadow-brutal border-[3px] px-8 py-4 text-sm tracking-wide" : "shadow-brutal-sm border-2 px-4 py-2.5 text-xs tracking-wider"}
                btn-brutal
                border-ink
                bg-ink
                font-[family:var(--font-black)]
                uppercase
                text-paper
                ${isHero ? "inline-flex items-center gap-2" : ""}
                ${className ?? ""}
            `}
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