"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

import { authClient } from "./auth-client";
import { saveAccessToken } from "./token";

import { useAuthStore } from "@/stores/auth-store";

export function useGoogleAuth() {
    const router = useRouter();
    const { setUser } = useAuthStore();

    const signIn = useGoogleLogin({
        flow: "auth-code",

        onSuccess: async ({ code }) => {
            const response = await authClient.loginWithGoogle(code);

            saveAccessToken(response.access_token);

            const user = await authClient.getCurrentUser();

            setUser(user);

            router.push("/dashboard");
        },
    });

    return {
        signIn,
    };
}