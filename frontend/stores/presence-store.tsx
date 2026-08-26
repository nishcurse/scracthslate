import { create } from "zustand";

export type PresenceNotification = {
    id: string;
    type: "join" | "leave";
    userName: string;
};

type PresenceStore = {
    notifications: PresenceNotification[];

    addNotification: (
        type: "join" | "leave",
        userName: string,
    ) => void;

    removeNotification: (
        id: string,
    ) => void;
};

export const usePresenceStore = create<PresenceStore>(
    (set) => ({
        notifications: [],

        addNotification: (type, userName) => {
            const id = crypto.randomUUID();

            set((state) => ({
                notifications: [
                    ...state.notifications,
                    {
                        id,
                        type,
                        userName,
                    },
                ],
            }));

            setTimeout(() => {
                set((state) => ({
                    notifications:
                        state.notifications.filter(
                            (notification) =>
                                notification.id !== id,
                        ),
                }));
            }, 3500);
        },

        removeNotification: (id) =>
            set((state) => ({
                notifications:
                    state.notifications.filter(
                        (notification) =>
                            notification.id !== id,
                    ),
            })),
    }),
);