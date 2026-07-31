"use client"; 

import {useEffect, useRef} from "react"

import {useBoardStore} from "@/stores/board-store"
import type {serverEvent} from "@/types/socket"



export function useBoardSocket(boardId: string){
    const socketRef = useRef<WebSocket | null>(null); 
    useEffect(()=>{
        const socket = new WebSocket(
            `ws://localhost:8000/ws/boards/${boardId}`
        ); 
        socketRef.current = socket; 
        
        socket.onmessage = (event) =>{
            const message: serverEvent = JSON.parse(event.data);
            console.log("receieved" , message);
            const store = useBoardStore.getState();
            switch(message.type){
                case "board:snapshot":
                    store.setObject(message.objects); 
                    break;
                case "object:create": 
                    store.addObject(message.object); 
                    break;
                case "object:update": 
                    store.updateObject(message.id,message.changes);
                    break;
                case "object:delete": 
                    store.removeObject(message.id); 
                    break;
                case "stroke:append": 
                    store.appendPoints(message.id, message.points)
                    break;
                default: 
                    break;
            }
        }; 
        return () => {
            socket.close(); 
            socketRef.current = null;
        }

    } ,[boardId]);

    const send = (message: serverEvent) => {
        const socket = socketRef.current; 

        if(!socket || socket.readyState !== WebSocket.OPEN){
            console.log("socket not open for sending");
            return; 
        }
        socket.send(JSON.stringify(message));
    }; 
    return { send };
}

