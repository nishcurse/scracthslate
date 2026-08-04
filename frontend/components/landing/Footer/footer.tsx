import Link from "next/link";

import { Logo } from "@/components/common/Logo";
import { FOOTER } from "@/constants/landing";
import { NAVIGATION } from "@/constants/navigation";

export function Footer() {
    return (
        <footer className="bg-paper py-12">
            <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
                <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
                    <Logo showSubtitle />

                    <div className="flex flex-wrap justify-center gap-6 font-[family:var(--font-mono)] text-[11px] font-bold uppercase tracking-wide text-ink/60">
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

                    <div className="font-[family:var(--font-mono)] text-[10px] font-bold uppercase tracking-widest text-ink/40">
                        {FOOTER.copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
}