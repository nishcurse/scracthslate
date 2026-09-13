"use client";

import React from "react";
import type { SharedBoard } from "@/types/boardTypes";
import { SharedBoardCard } from "./sharedBoardCard";

type Props = {
    boards: SharedBoard[];
};

export function SharedBoardList({
    boards,
}: Props) {
    if (boards.length === 0) {
        return (
            <div className="flex min-h-[300px] items-center justify-center border-[3px] border-dashed border-ink/30">
                <div className="text-center">
                    <p className="font-black uppercase text-2xl">
                        No Shared Boards
                    </p>

                    <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
                        Boards shared with you will appear here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {boards.map((board) => (
                <SharedBoardCard
                    key={board.id}
                    board={board}
                />
            ))}
        </div>
    );
}