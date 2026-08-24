"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

import { ShareBoardModal } from "./ShareBoardModal";
import { useBoardMembers } from "@/hooks/useBoardMembers";
import { User } from "@/types/user";

type Props = {
    user: User;
    boardTitle: string;
    boardId: string;
};

export function BoardHeader({
    user,
    boardTitle,
    boardId,
}: Props) {
    const [shareOpen, setShareOpen] = useState(false);

    const {
        members,
        addMember,
    } = useBoardMembers(boardId);

    return (
        <>
            <header className="h-[68px] shrink-0 border-b-[3px] border-ink bg-paper px-6">
                <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between">

                    {/* LEFT — BRAND + BOARD */}
                    <div className="flex items-center gap-4">

                        {/* Logo */}
                        <div className="flex h-9 w-9 items-center justify-center border-[3px] border-ink bg-ink">
                            <span className="font-black text-lg text-acid">
                                S
                            </span>
                        </div>

                        {/* Board identity */}
                        <div className="flex items-center gap-2">
                            <span className="font-black text-lg uppercase tracking-tight">
                                SCRATCHSLATE
                            </span>

                            <span className="font-bold text-ink/30">
                                /
                            </span>

                            <button
                                type="button"
                                className="group flex cursor-pointer items-center gap-2"
                            >
                                <span className="font-black text-lg uppercase tracking-tight">
                                    {boardTitle}
                                </span>

                                <Icon
                                    icon="ph:pencil-simple-bold"
                                    className="text-ink/40 transition-colors group-hover:text-ink"
                                />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6">

                        {/* Collaborators + Live */}
                        <div className="flex items-center gap-4">

                            {/* Collaborator avatars */}
                            <div className="flex items-center">

                                {/* Current user */}
                                <div className="relative z-20 -mr-2 h-8 w-8 overflow-hidden border-[3px] border-ink bg-acid">
                                    <Image
                                        src={
                                            user.picture
                                        }
                                        alt={user.name}
                                        width={32}
                                        height={32}
                                        unoptimized
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* First collaborator */}
                                {members.slice(0, 1).map((member) => (
                                    <div
                                        key={member.user_id}
                                        className="relative z-10 -mr-2 h-8 w-8 overflow-hidden border-[3px] border-ink bg-paper"
                                        title={member.name}
                                    >
                                        {member.picture ? (
                                            <Image
                                                src={member.picture}
                                                alt={member.name}
                                                width={32}
                                                height={32}
                                                unoptimized
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center font-mono text-[10px] font-bold">
                                                {member.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Remaining collaborators */}
                                {members.length > 1 && (
                                    <div className="relative z-0 h-8 w-8 flex items-center justify-center border-[3px] border-ink bg-ink font-mono text-[10px] font-bold text-acid">
                                        +{members.length - 1}
                                    </div>
                                )}
                            </div>

                            {/* Live */}
                            <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                                <span className="animate-pulse text-acid">
                                    ●
                                </span>

                                <span className="uppercase tracking-widest">
                                    LIVE
                                </span>
                            </div>
                        </div>

                        {/* Share + Menu */}
                        <div className="flex items-center gap-3">

                            {/* Share */}
                            <button
                                type="button"
                                onClick={() => setShareOpen(true)}
                                className="border-[3px] border-ink bg-acid px-5 py-2.5 text-xs font-black uppercase tracking-widest text-ink shadow-brutal-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                            >
                                SHARE
                            </button>

                            {/* Menu */}
                            <button
                                type="button"
                                aria-label="Board menu"
                                className="flex h-10 w-10 items-center justify-center border-[3px] border-ink transition-colors hover:bg-ink hover:text-acid"
                            >
                                <Icon
                                    icon="ph:dots-three-outline-vertical-fill"
                                    className="text-xl"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Share Modal */}
            <ShareBoardModal
                open={shareOpen}
                onInvite={async (email, role) => {
                    await addMember(email, role);
                }}
                onClose={() => setShareOpen(false)}
            />
        </>
    );
}