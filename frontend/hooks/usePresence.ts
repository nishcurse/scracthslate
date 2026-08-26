"use client"

import {useRef} from "react"
import type {serverEvent} from "@/types/socket"

type Props = {
    send : (message : serverEvent) => void,
};

export function usePresence({send} : Props){
    const lastSendTimeRef = useRef(0);

    const sendCursorPosition = (x: number, y : number) => {
        const now = performance.now(); 

        if(now - lastSendTimeRef.current < 33){
            return;
        }
        lastSendTimeRef.current = now; 
        send({
            type : "presence:cursor", 
            x, 
            y, 
        }); 
    }; 
    return {
        sendCursorPosition
    }
}