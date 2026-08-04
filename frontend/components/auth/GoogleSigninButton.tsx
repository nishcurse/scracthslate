interface GoogleSignInButtonProps {
    className?: string;
}

export function GoogleSignInButton({
    className,
}: GoogleSignInButtonProps) {
    return (
        <button
            className={`
                shadow-brutal-sm
                btn-brutal
                border-2
                border-ink
                bg-ink
                px-4
                py-2.5
                text-xs
                font-black
                uppercase
                tracking-wider
                text-paper
                ${className ?? ""}
            `}
        >
            Sign In
        </button>
    );
}