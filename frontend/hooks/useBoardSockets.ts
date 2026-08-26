"use client";

import { useEffect, useRef } from "react";

import { useBoardStore } from "@/stores/board-store";
import type { serverEvent } from "@/types/socket";
import { getAccessToken } from "@/auth/token";

export function useBoardSocket(boardId: string) {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const token = getAccessToken();

        if (!token) {
            console.log("No access token");
            return;
        }

        const socket = new WebSocket(
            `ws://localhost:8000/ws/boards/${boardId}?token=${encodeURIComponent(token)}`
        );

        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket OPEN:", boardId);
        };

        socket.onmessage = (event) => {
            const message: serverEvent = JSON.parse(event.data);
            console.log("WebSocket RECEIVED:", message);

            const store = useBoardStore.getState();

            switch (message.type) {
                case "board:snapshot":
                    store.setObject(message.objects);
                    break;

                case "object:create":
                    store.addObject(message.object);
                    break;

                case "object:update":
                    store.updateObject(
                        message.id,
                        message.changes,
                    );
                    break;

                case "object:delete":
                    store.removeObject(message.id);
                    break;

                case "stroke:append":
                    store.appendPoints(
                        message.id,
                        message.points,
                    );
                    break;
                case "presence:snapshot":
                    store.setLiveUsers(message.users);
                    break;

                case "presence:join":
                    store.addLiveUser(message.user);
                    break;

                case "presence:leave":
                    store.removeLiveUser(message.user.id);
                    break;

                case "presence:cursor":
                    if(!message.user){
                        return;
                    }
                    store.updateCursor(
                        message.user.id,
                        message.x,
                        message.y,
                    );
                    break;
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket ERROR:", error);
        };

        socket.onclose = (event) => {
            console.log("WebSocket CLOSED:", {
                code: event.code,
                reason: event.reason,
                wasClean: event.wasClean,
            });
        };

        return () => {
            socket.close();
            socketRef.current = null;
        };
    }, [boardId]);

    const send = (message: serverEvent) => {
        const socket = socketRef.current;

        if (!socket) {
            return;
        }

        if (socket.readyState !== WebSocket.OPEN) {
            return;
        }

        socket.send(JSON.stringify(message));
    };

    return { send };
}