"use client"

import React, { useEffect } from "react"
import  {authClient}  from "./auth-client"
import {
    getAccessToken,
    removeAccessToken,
} from "./token"

import { useAuthStore } from "@/stores/auth-store"

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const {
        setUser,
        setLoading,
        clear,
    } = useAuthStore();

    useEffect(() => {
        async function intialize() {
            const token = getAccessToken(); 
            if(!token){
                setLoading(false); 
                return;
            }
            try{
                const user = await authClient.getCurrentUser();
                setUser(user);
                console.log("user is logged in!" , user);
            }catch{
                removeAccessToken(); 
                clear();
            }finally{
                setLoading(false);
            }
        }
        intialize()
    },[setUser , setLoading , clear]);
    return children;
}