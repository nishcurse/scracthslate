"use client";

import { useCallback, useEffect, useState } from "react";

import { boardClient } from "./board-client";
import { Board } from "@/types/boardTypes";

export function useBoards() {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBoards = useCallback(async () => {
        setLoading(true);

        try {
            const data = await boardClient.getBoards();
            setBoards(data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoards();
    }, [fetchBoards]);

    async function createBoard(title: string) {
        const board = await boardClient.createBoard(title);

        setBoards((current) => [
            ...current,
            board,
        ]);

        return board;
    }

    async function renameBoard(
        id: string,
        title: string,
    ) {
        const updatedBoard =
            await boardClient.renameBoard(id, title);

        setBoards((current) =>
            current.map((board) =>
                board.id === id
                    ? updatedBoard
                    : board,
            ),
        );

        return updatedBoard;
    }

    async function deleteBoard(id: string) {
        await boardClient.deleteBoard(id);

        setBoards((current) =>
            current.filter(
                (board) => board.id !== id,
            ),
        );
    }

    return {
        boards,
        loading,
        fetchBoards,
        createBoard,
        renameBoard,
        deleteBoard,
    };
}