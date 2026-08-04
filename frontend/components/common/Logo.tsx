import Link from "next/link";

interface LogoProps {
    href?: string;
    showSubtitle?: boolean;
}

export function Logo({
    href = "/",
    showSubtitle = true,
}: LogoProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3"
        >
            <div className="shadow-brutal-sm grid h-9 w-9 place-items-center bg-ink text-acid">
                <span className="font-[family:var(--font-black)] text-lg">
                    S
                </span>
            </div>

            <div className="font-[family:var(--font-black)] text-lg uppercase tracking-tight">
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