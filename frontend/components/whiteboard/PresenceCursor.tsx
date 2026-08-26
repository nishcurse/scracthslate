"use client";

import { Group, Path, Rect, Text } from "react-konva";

import { useBoardStore } from "@/stores/board-store";

type Props = {
    userId: string;
};

const PRESENCE_COLORS = [
    "#F0FF00",
    "#00D9FF",
    "#FF00FF",
    "#FF6600",
];

function getPresenceColor(id: string) {
    let hash = 0;

    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    return PRESENCE_COLORS[
        Math.abs(hash) % PRESENCE_COLORS.length
    ];
}

export function PresenceCursor({
    userId,
}: Props) {
    const user = useBoardStore(
        (state) => state.liveUsers[userId]
    );

    if (!user || !user.cursor) {
        return null;
    }

    const { x, y } = user.cursor;

    const name = user.name.split(" ")[0];
    const color = getPresenceColor(user.id);

    const labelWidth = Math.max(
        42,
        name.length * 6.5 + 16
    );

    return (
        <Group
            x={x}
            y={y}
            listening={false}
        >
            <Path
                data="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={color}
                stroke="#2A2A2A"
                strokeWidth={1.5}
                shadowColor="#000"
                shadowBlur={2}
                shadowOpacity={0.12}
                shadowOffsetX={1}
                shadowOffsetY={1}
            />

            <Rect
                x={0}
                y={20}
                width={labelWidth}
                height={20}
                fill="#FAF9F6"
                stroke="#5A5A5A"
                strokeWidth={2}
                shadowColor="#000"
                shadowBlur={0}
                shadowOpacity={0.08}
                shadowOffsetX={3}
                shadowOffsetY={3}
            />

            <Text
                x={8}
                y={25}
                text={name.toUpperCase()}
                fontFamily="Space Mono"
                fontSize={9}
                fontStyle="bold"
                fill="#2A2A2A"
                listening={false}
            />
        </Group>
    );
}