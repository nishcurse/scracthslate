import { Icon } from "@iconify/react";
import { ReactNode } from "react";

interface HeroFeatureProps {
    icon: string;
    children: ReactNode;
}

export function HeroFeature({
    icon,
    children,
}: HeroFeatureProps) {
    return (
        <div className="flex items-center gap-2">
            <Icon
                icon={icon}
                className="text-lg text-ink"
            />

            <span className="font-mono text-xs font-bold uppercase tracking-wide text-ink/70">
                {children}
            </span>
        </div>
    );
}