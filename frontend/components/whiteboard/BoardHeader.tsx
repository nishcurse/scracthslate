"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { ShareBoardModal } from "./ShareBoardModal";
import { useBoardStore } from "@/stores/board-store";
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
    const router = useRouter();

    const [shareOpen, setShareOpen] = useState(false);

    // Users currently connected to this board
    const liveUsers = useBoardStore(
        (state) => state.liveUsers
    );

    // Used by the Share modal
    const { addMember } = useBoardMembers(boardId);

    const liveUserList = Object.values(liveUsers);

    const visibleUsers = liveUserList.slice(0, 3);

    const remainingUsers = Math.max(
        liveUserList.length - 3,
        0
    );

    return (
        <>
            <header className="h-[68px] shrink-0 border-b-[3px] border-ink bg-paper px-6">
                <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between">

                    {/* LEFT — BACK + BRAND + BOARD */}
                    <div className="flex items-center gap-4">

                        {/* Back to Dashboard */}
                        <button
                            type="button"
                            onClick={() =>
                                router.push("/dashboard")
                            }
                            aria-label="Back to dashboard"
                            className="
                                group
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                border-[3px]
                                border-ink
                                bg-paper
                                transition-colors
                                hover:bg-ink
                                hover:text-acid
                            "
                        >
                            <Icon
                                icon="ph:arrow-left-bold"
                                className="
                                    text-lg
                                    transition-transform
                                    group-hover:-translate-x-0.5
                                "
                            />
                        </button>

                        {/* Logo */}
                        <div className="flex h-9 w-9 items-center justify-center border-[3px] border-ink bg-ink">
                            <span className="text-lg font-black text-acid">
                                S
                            </span>
                        </div>

                        {/* Board identity */}
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black uppercase tracking-tight">
                                SCRATCHSLATE
                            </span>

                            <span className="font-bold text-ink/30">
                                /
                            </span>

                            <button
                                type="button"
                                className="group flex cursor-pointer items-center gap-2"
                            >
                                <span className="text-lg font-black uppercase tracking-tight">
                                    {boardTitle}
                                </span>

                                <Icon
                                    icon="ph:pencil-simple-bold"
                                    className="
                                        text-ink/40
                                        transition-colors
                                        group-hover:text-ink
                                    "
                                />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6">

                        {/* Collaborators + Live */}
                        <div className="flex items-center gap-4">

                            {/* Live collaborator avatars */}
                            <div className="flex items-center">
                                {visibleUsers.map(
                                    (member, index) => {
                                        const fallbackAvatar =
                                            `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(
                                                member.id
                                            )}`;

                                        return (
                                            <div
                                                key={member.id}
                                                className={`
                                                    relative
                                                    h-8
                                                    w-8
                                                    overflow-hidden
                                                    border-[3px]
                                                    border-ink
                                                    bg-paper
                                                    ${index > 0
                                                        ? "-ml-2"
                                                        : ""
                                                    }
                                                `}
                                                title={member.name}
                                            >
                                                <Image
                                                    src={
                                                        member.picture ||
                                                        fallbackAvatar
                                                    }
                                                    alt={member.name}
                                                    width={32}
                                                    height={32}
                                                    unoptimized
                                                    className="h-full w-full object-cover"
                                                    onError={(
                                                        event
                                                    ) => {
                                                        if (
                                                            event
                                                                .currentTarget
                                                                .src !==
                                                            fallbackAvatar
                                                        ) {
                                                            event.currentTarget.src =
                                                                fallbackAvatar;
                                                        }
                                                    }}
                                                />
                                            </div>
                                        );
                                    }
                                )}

                                {/* Remaining users */}
                                {remainingUsers > 0 && (
                                    <div
                                        className="
                                            relative
                                            -ml-2
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            border-[3px]
                                            border-ink
                                            bg-ink
                                            font-mono
                                            text-[10px]
                                            font-bold
                                            text-acid
                                        "
                                        title={`${remainingUsers} more users online`}
                                    >
                                        +{remainingUsers}
                                    </div>
                                )}
                            </div>

                            {/* Live count */}
                            <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                                <span className="animate-pulse text-acid">
                                    ●
                                </span>

                                <span className="uppercase tracking-widest">
                                    {liveUserList.length} LIVE
                                </span>
                            </div>
                        </div>

                        {/* Share + Menu */}
                        <div className="flex items-center gap-3">

                            {/* Share */}
                            <button
                                type="button"
                                onClick={() =>
                                    setShareOpen(true)
                                }
                                className="
                                    border-[3px]
                                    border-ink
                                    bg-acid
                                    px-5
                                    py-2.5
                                    text-xs
                                    font-black
                                    uppercase
                                    tracking-widest
                                    text-ink
                                    shadow-brutal-sm
                                    transition-all
                                    hover:translate-x-[2px]
                                    hover:translate-y-[2px]
                                    hover:shadow-none
                                "
                            >
                                SHARE
                            </button>

                            {/* Menu */}
                            <button
                                type="button"
                                aria-label="Board menu"
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    border-[3px]
                                    border-ink
                                    transition-colors
                                    hover:bg-ink
                                    hover:text-acid
                                "
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
                onClose={() =>
                    setShareOpen(false)
                }
            />
        </>
    );
}