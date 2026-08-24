"use client";

import { useCallback, useEffect, useState } from "react";

import { boardClient } from "@/board/board-client";
import { BoardMember } from "@/types/boardTypes";

export function useBoardMembers(boardId: string) {
    const [members, setMembers] = useState<BoardMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    const fetchMembers = useCallback(async () => {
        try {
            const data = await boardClient.getMembers(boardId);
            setMembers(data);
        } finally {
            setLoading(false);
        }
    }, [boardId]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    const addMember = useCallback(
        async (
            email: string,
            role: "editor" | "viewer" = "editor",
        ) => {
            setAdding(true);

            try {
                const member = await boardClient.addMember(
                    boardId,
                    email,
                    role,
                );

                setMembers((current) => [
                    ...current,
                    member,
                ]);

                return member;
            } finally {
                setAdding(false);
            }
        },
        [boardId],
    );

    return {
        members,
        loading,
        adding,
        fetchMembers,
        addMember,
    };
}