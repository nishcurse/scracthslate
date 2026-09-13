"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { boardClient } from "./board-client";
import { SharedBoard } from "@/types/boardTypes";

export function useSharedBoards() {
    const [boards, setBoards] =
        useState<SharedBoard[]>([]);

    const [loading, setLoading] =
        useState(true);

    const fetchSharedBoards =
        useCallback(async () => {
            setLoading(true);

            try {
                const data =
                    await boardClient.getSharedBoards();

                setBoards(data);
            } finally {
                setLoading(false);
            }
        }, []);

    useEffect(() => {
        fetchSharedBoards();
    }, [fetchSharedBoards]);

    return {
        boards,
        loading,
        fetchSharedBoards,
    };
}