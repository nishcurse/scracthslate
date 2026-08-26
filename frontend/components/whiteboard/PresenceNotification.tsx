"use client";

import { Icon } from "@iconify/react";

import { usePresenceStore } from "@/stores/presence-store";

export function PresenceNotifications() {
    const notifications =
        usePresenceStore(
            (state) => state.notifications
        );

    const removeNotification =
        usePresenceStore(
            (state) => state.removeNotification
        );

    return (
        <div
            className="
                fixed
                right-6
                top-[92px]
                z-[9999]
                flex
                flex-col
                gap-4
                pointer-events-none
            "
        >
            {notifications.map((notification) => {
                const isJoin =
                    notification.type === "join";

                return (
                    <div
                        key={notification.id}
                        className="
                            pointer-events-auto
                            w-[340px]
                            border-[3px]
                            border-ink
                            bg-paper
                            p-4
                            shadow-brutal
                            animate-slide-in
                        "
                    >
                        <div className="flex items-center gap-3">

                            {/* Event icon */}
                            <div
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    border-[3px]
                                    border-ink
                                    ${isJoin
                                        ? "bg-acid"
                                        : "bg-paper"
                                    }
                                `}
                            >
                                <Icon
                                    icon={
                                        isJoin
                                            ? "ph:user-plus-bold"
                                            : "ph:user-minus-bold"
                                    }
                                    className="text-xl"
                                />
                            </div>

                            {/* Text */}
                            <div className="min-w-0 flex-1">
                                <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/40">
                                    BOARD ACTIVITY
                                </div>

                                <div className="mt-1 font-display text-sm font-black uppercase tracking-tight">
                                    {notification.userName}
                                    {" "}
                                    {isJoin
                                        ? "joined"
                                        : "left"}
                                </div>

                                <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-wider text-ink/40">
                                    {isJoin
                                        ? "Started editing"
                                        : "Stopped editing"}
                                </div>
                            </div>

                            {/* Close */}
                            <button
                                type="button"
                                onClick={() =>
                                    removeNotification(
                                        notification.id
                                    )
                                }
                                className="
                                    flex
                                    h-7
                                    w-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    border-2
                                    border-transparent
                                    hover:border-ink
                                    hover:bg-acid
                                "
                            >
                                <Icon
                                    icon="ph:x-bold"
                                    className="text-sm"
                                />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}