import Link from "next/link";

interface LogoProps {
    href?: string;
    showSubtitle?: boolean;
    compact?: boolean;
}

export function Logo({
    href = "/",
    showSubtitle = true,
    compact = false,
}: LogoProps) {
    const containerSize = compact
        ? "h-8 w-8"
        : "h-9 w-9";

    const textSize = compact
        ? "text-sm"
        : "text-lg";

    return (
        <Link
            href={href}
            className="flex items-center gap-3"
        >
            <div
                className={`shadow-brutal-sm grid place-items-center bg-ink text-acid ${containerSize}`}
            >
                <span
                    className={`font-[family:var(--font-black)] ${textSize}`}
                >
                    S
                </span>
            </div>

            <div
                className={`font-[family:var(--font-black)] uppercase tracking-tight ${compact ? "text-sm" : "text-lg"
                    }`}
            >
                ScratchSlate

                {showSubtitle && (
                    <>
                        <span className="mx-1 hidden text-ink/40 xs:inline">
                            /
                        </span>

                        <span className="hidden text-ink/60 xs:inline">
                            Whiteboard
                        </span>
                    </>
                )}
            </div>
        </Link>
    );
}