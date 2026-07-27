"use client";

import { useRef } from "react";
import Konva from "konva";
import { Layer, Stage } from "react-konva";

import FreehandObject from "./objects/freehand";
import RectangleObject from "./objects/rectangle";

import { useBoardStore } from "@/stores/board-store";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { serverEvent } from "@/types/socket";
import {useDrawingTools} from "@/hooks/useDrawingTools"


type Props = {
    send: (message: serverEvent) => void;
};

export default function WhiteboardCanvas({ send }: Props) {
    const stageRef = useRef<Konva.Stage | null>(null);
    const { width, height } = useWindowSize();

    const objects = useBoardStore((state) => state.objects);
    const activetool = useBoardStore((state) => state.activetool);

    const updateObject = useBoardStore((state) => state.updateObject);
    const removeObject = useBoardStore((state) => state.removeObject);
    const {handlePointerDown, handlePointerMove , handlePointerUp} = useDrawingTools({stageRef , send}); 


    const moveObject = (id: string, x: number, y: number) => {
        const changes = { x, y };
        updateObject(id, changes);
        send({
            type: "object:update",
            id,
            changes
        })
    };
    const deleteObject = (id: string) => {
        removeObject(id);

        send({
            type: "object:delete",
            id,
        });
    };

   
    

    

    



    return (
        <Stage
            ref={stageRef}
            width={width}
            height={height}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <Layer>
                {Object.values(objects).map((object) => {
                    switch (object.type) {
                        case "rectangle":
                            return (
                                <RectangleObject
                                    key={object.id}
                                    object={object}
                                    draggable={activetool === "select"}
                                    onMove={moveObject}
                                    onDelete={deleteObject}
                                />
                            );

                        case "freehand":
                            return (
                                <FreehandObject
                                    key={object.id}
                                    object={object}
                                />
                            );
                    }
                })}
            </Layer>
        </Stage>
    );
}