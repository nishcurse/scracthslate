import Link from "next/link";

import { GoogleSignInButton } from "@/components/auth/GoogleSigninButton";
import { Logo } from "@/components/common/Logo";
import { NAVIGATION } from "@/constants/navigation";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper">
            <nav className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
                <Logo />

                <div className="hidden gap-1 md:flex">
                    {NAVIGATION.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="border-2 border-transparent px-3 py-2 text-[13px] font-bold uppercase tracking-wide transition-colors hover:border-ink hover:bg-acid"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <GoogleSignInButton />
            </nav>
        </header>
    );
}