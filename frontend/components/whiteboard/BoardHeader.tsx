"use client";

import { Icon } from "@iconify/react";

type Props = {
    boardTitle?: string;
};

export default function BoardHeader({
    boardTitle = "Product Roadmap",
}: Props) {
    return (
        <header className="absolute inset-x-0 top-0 z-50 h-[68px] border-b-[3px] border-ink bg-paper">
            <div className="flex h-full items-center justify-between px-6">
                {/* Left */}
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <div className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-xl font-black text-acid shadow-brutal-sm">
                        S
                    </div>

                    {/* Board identity */}
                    <div className="flex items-center gap-3">
                        <span className="font-black uppercase tracking-tight">
                            ScratchSlate
                        </span>

                        <span className="font-mono text-xs font-bold text-ink/30">
                            /
                        </span>

                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em]">
                            {boardTitle}
                        </span>

                        <button
                            type="button"
                            aria-label="Rename board"
                            className="grid h-7 w-7 place-items-center border-2 border-transparent transition-colors hover:border-ink hover:bg-acid"
                        >
                            <Icon
                                icon="ph:pencil-simple-bold"
                                className="text-sm"
                            />
                        </button>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                    {/* Live status */}
                    <div className="hidden items-center gap-2 sm:flex">
                        <span className="h-2 w-2 rounded-full bg-acid ring-2 ring-ink" />

                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                            Live
                        </span>
                    </div>

                    {/* Collaborators */}
                    <div className="hidden items-center sm:flex">
                        <div className="flex -space-x-2">
                            <div className="grid h-8 w-8 place-items-center border-[2px] border-ink bg-acid text-[10px] font-black">
                                U
                            </div>

                            <div className="grid h-8 w-8 place-items-center border-[2px] border-ink bg-paper text-[10px] font-black">
                                A
                            </div>

                            <div className="grid h-8 w-8 place-items-center border-[2px] border-ink bg-paper text-[10px] font-black">
                                R
                            </div>
                        </div>

                        <span className="ml-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50">
                            +3
                        </span>
                    </div>

                    {/* Share */}
                    <button
                        type="button"
                        className="btn-brutal flex h-10 items-center gap-2 border-[3px] border-ink bg-acid px-4 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink shadow-brutal-sm transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                        <Icon icon="ph:share-network-bold" className="text-base" />
                        Share
                    </button>

                    {/* Board menu */}
                    <button
                        type="button"
                        aria-label="Board options"
                        className="grid h-10 w-10 place-items-center border-[3px] border-transparent transition-colors hover:border-ink hover:bg-acid"
                    >
                        <Icon icon="ph:dots-three-bold" className="text-xl" />
                    </button>
                </div>
            </div>
        </header>
    );
}