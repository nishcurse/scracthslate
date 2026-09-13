"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";

type Props = {
    children: React.ReactNode;
};

export default function InitialLoader({
    children,
}: Props) {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const hasSeenLoader =
            sessionStorage.getItem(
                "scratchslate-initial-loader"
            );

        if (hasSeenLoader) {
            setShowLoader(false);
            return;
        }

        const timer = window.setTimeout(() => {
            sessionStorage.setItem(
                "scratchslate-initial-loader",
                "true"
            );

            setShowLoader(false);
        }, 3800);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    if (showLoader) {
        return <Loading />;
    }

    return <>{children}</>;
}