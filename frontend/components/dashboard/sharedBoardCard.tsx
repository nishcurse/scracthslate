"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import type { SharedBoard } from "@/types/boardTypes";

type Props = {
    board: SharedBoard;
};

export function SharedBoardCard({ board }: Props) {
    return (
        <Link
            href={`/board/${board.id}`}
            className="
                group
                block
                border-[3px]
                border-ink
                bg-white
                shadow-brutal
                btn-brutal
                transition-all
                duration-200
            "
        >
            <div className="grid-bg relative aspect-[16/10] overflow-hidden border-b-[3px] border-ink">
                <div className="absolute inset-0 p-4 opacity-40">
                    <div className="h-full w-full border-[2px] border-ink/20" />
                </div>

                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1">
                    <div className="h-4 w-4 rounded-full border-2 border-ink bg-red-500 animate-pulse" />
                    <div className="h-4 w-4 rounded-full bg-ink/20" />
                </div>
            </div>

            <div className="bg-white p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="font-black uppercase text-lg leading-tight tracking-tight">
                        {board.title}
                    </h3>

                    <span className="shrink-0 border-2 border-ink bg-acid px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider">
                        {board.role}
                    </span>
                </div>

                <div className="flex items-end justify-between gap-3">
                    <div>
                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
                            Shared By
                        </p>

                        <p className="mt-1 font-black uppercase text-sm">
                            {board.owner.name}
                        </p>
                    </div>

                    <Icon
                        icon="ph:arrow-right-bold"
                        className="
                            -translate-x-4
                            text-xl
                            text-red-500
                            opacity-0
                            transition-all
                            group-hover:translate-x-0
                            group-hover:opacity-100
                        "
                    />
                </div>
            </div>
        </Link>
    );
}