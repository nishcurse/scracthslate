"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { useAuthStore } from "@/stores/auth-store";
import { useSharedBoards } from "@/board/useSharedBoards";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SharedBoardList } from "@/components/dashboard/SharedBoardList";

export default function SharedBoardsPage() {
    const { user } = useAuthStore();

    const {
        boards,
        loading,
    } = useSharedBoards();

    const [searchValue, setSearchValue] =
        useState("");

    const filteredBoards = useMemo(() => {
        const query =
            searchValue.trim().toLowerCase();

        if (!query) {
            return boards;
        }

        return boards.filter((board) =>
            board.title
                .toLowerCase()
                .includes(query)
        );
    }, [boards, searchValue]);

    if (user === null) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col bg-paper">
            <DashboardHeader user={user} />

            <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 py-6 sm:px-10 sm:py-10">
                <section className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div className="flex-1">
                        <div className="mb-4 flex items-center gap-3">
                            

                            <h1 className="font-black uppercase text-4xl leading-[0.9] tracking-tight sm:text-6xl">
                                Shared With Me
                            </h1>
                        </div>

                        <div className="group relative max-w-xl">
                            <label
                                htmlFor="search-shared-boards"
                                className="
                                    absolute
                                    -top-3
                                    left-4
                                    bg-paper
                                    px-2
                                    font-mono
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-ink/50
                                    group-focus-within:text-ink
                                "
                            >
                                Search / Shared Boards
                            </label>

                            <input
                                id="search-shared-boards"
                                type="text"
                                placeholder="FIND A SHARED PROJECT..."
                                value={searchValue}
                                onChange={(event) =>
                                    setSearchValue(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    border-[3px]
                                    border-ink
                                    bg-paper
                                    p-4
                                    font-mono
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    shadow-brutal-sm
                                    transition-colors
                                    focus:bg-white
                                    focus:outline-none
                                "
                            />
                        </div>
                    </div>

                    <div className="flex shrink-0">
                        <Link
                            href="/dashboard"
                            className="
                                btn-brutal
                                flex
                                items-center
                                gap-3
                                whitespace-nowrap
                                border-[3px]
                                border-ink
                                bg-acid
                                px-6
                                py-4
                                font-black
                                uppercase
                                tracking-wide
                                text-base
                                text-ink
                                shadow-brutal
                                transition-all
                                hover:translate-x-[2px]
                                hover:translate-y-[2px]
                                hover:shadow-none
                            "
                        >
                            <Icon
                                icon="ph:layout-bold"
                                className="text-xl"
                            />
                            My Boards
                        </Link>
                    </div>
                </section>

                <section
                    id="shared-boards-container"
                    className="flex-1"
                >
                    {loading ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[1, 2, 3, 4].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="
                                            h-[300px]
                                            animate-pulse
                                            border-[3px]
                                            border-ink/20
                                            bg-ink/5
                                        "
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <SharedBoardList
                            boards={filteredBoards}
                        />
                    )}
                </section>
            </main>

            <footer className="mt-auto border-t-[3px] border-ink bg-paper px-6 py-8">
                <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <div className="grid h-6 w-6 place-items-center bg-ink text-[10px] font-black text-acid shadow-brutal-sm">
                            S
                        </div>

                        <span className="font-black uppercase text-xs tracking-tight">
                            ScratchSlate Dashboard
                        </span>
                    </div>

                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/30">
                        Status: Syncing Live / v1.0.42
                    </div>
                </div>
            </footer>
        </div>
    );
}