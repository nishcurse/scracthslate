"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"; 
import React from "react";

export default function GoogleProvider({
    children, 
} : {
    children : React.ReactNode
}) {
    console.log({
    env: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
});
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            {children}
        </GoogleOAuthProvider>
    )
}