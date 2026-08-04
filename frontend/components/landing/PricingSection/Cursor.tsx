
interface CursorProps {
    name: string;
    variant: "designer" | "developer";
    className?: string;
}

export function Cursor({
    name,
    variant,
    className,
}: CursorProps) {
    const designer = variant === "designer";

    return (
        <div
            className={`absolute flex flex-col items-start z-10 ${className}`}
        >
            <svg
                className={`w-7 h-7 ${designer
                        ? "fill-acid"
                        : "fill-ink"
                    }`}
                viewBox="0 0 24 24"
            >
                <path d="M5 3l16 9-7 2 2 7-3 1.5-2-7-6 2V3z" />
            </svg>

            <div
                className={`
                    mt-1
                    px-2
                    py-0.5
                    border-2
                    border-ink
                    shadow-brutal-sm
                    font-[family:var(--font-mono)]
                    text-[9px]
                    uppercase
                    font-bold
                    ${designer
                        ? "bg-acid text-ink"
                        : "bg-ink text-paper"
                    }
                `}
            >
                {name}
            </div>
        </div>
    );
}