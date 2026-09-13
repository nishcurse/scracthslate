"use client";

import { Text as KonvaText } from "react-konva";
import type { Text } from "@/types/board";

type Props = {
    object: Text;
    draggable: boolean;

    onMove: (
        id: string,
        x: number,
        y: number,
    ) => void;

    onSelect: (id: string) => void;

    onEdit: (id: string) => void;

    editing: boolean;
};

export default function TextObject({
    object,
    draggable,
    onMove,
    onSelect,
    onEdit,
    editing,
}: Props) {
    if (editing) {
        return null;
    }

    return (
        <KonvaText
            id={object.id}
            x={object.x}
            y={object.y}
            text={object.text}
            fontSize={object.fontSize}
            fontFamily={object.fontFamily}
            fill={object.fill}
            rotation={object.rotation ?? 0}
            draggable={draggable}
            onDragMove={(event) => {
                onMove(
                    object.id,
                    event.target.x(),
                    event.target.y(),
                );
            }}
            onClick={() =>
                onSelect(object.id)
            }
            onTap={() =>
                onSelect(object.id)
            }
            onDblClick={() =>
                onEdit(object.id)
            }
            onDblTap={() =>
                onEdit(object.id)
            }
        />
    );
}