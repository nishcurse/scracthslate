"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth-store";

type AuthGuardProps = {
    children: React.ReactNode;
};

export function AuthGuard({
    children,
}: AuthGuardProps) {
    const router = useRouter();

    const {
        user,
        loading,
    } = useAuthStore();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/");
        }
    }, [loading, user, router]);

    if (loading) {
        return null;
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}