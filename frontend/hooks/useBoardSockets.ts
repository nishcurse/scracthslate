"use client"; 

import {useEffect, useRef} from "react"

import {useBoardStore} from "@/stores/board-store"
import type { BoardObject } from "@/types/board"

type serverEvent = 
{
    type: "object:create";   
    object: BoardObject ; 
}
    |
{
    type : "object:update"; 
    id : string; 
    changes: Partial<BoardObject>;
}; 

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
                case "object:create": 
                    store.addObject(message.object); 
                    break;
                case "object:update": 
                    store.updateObject(message.id,message.changes);
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
        console.log("sending" , message);
        socket.send(JSON.stringify(message));
    }; 
    return { send };
}

