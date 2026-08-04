import Link from "next/link";

import { FOOTER } from "@/constants/landing";
import { NAVIGATION } from "@/constants/navigation";

export function Footer() {
    return (
        <footer
            id="contact"
            className="bg-paper py-12"
        >
            <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
                <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <div className="shadow-brutal-sm grid h-8 w-8 place-items-center bg-ink text-sm text-acid">
                            <span className="font-[family:var(--font-black)]">S</span>
                        </div>
                        <div className="font-[family:var(--font-black)] text-sm uppercase tracking-tight">
                            {FOOTER.brand} <span className="text-ink/30">/</span>{" "}
                            <span className="text-ink/60">{FOOTER.subtitle}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 font-[family:var(--font-mono)] text-[11px] font-bold tracking-wide text-ink/60 uppercase">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="transition-colors hover:text-ink"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="font-[family:var(--font-mono)] text-[10px] font-bold tracking-widest text-ink/40 uppercase">
                        {FOOTER.copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
}