"use client";

import { act, useRef } from "react";
import Konva from "konva";
import { Layer, Stage } from "react-konva";

import FreehandObject from "./objects/freehand";
import RectangleObject from "./objects/rectangle";
import EllipseObject from "./objects/ellips"
import LineObject from "./objects/line"

import { useBoardStore } from "@/stores/board-store";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { serverEvent } from "@/types/socket";
import { useDrawingTools } from "@/hooks/useDrawingTools"


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
    const { handlePointerDown, handlePointerMove, handlePointerUp } = useDrawingTools({ stageRef, send });
    const selectObjectId = useBoardStore((st) => st.selectObjectId);
    const selectObject = useBoardStore((st) => st.selectObject);
    const clearSelection = useBoardStore((st) => st.clearSelection );

    const handleSelectObject = (id : string) => {
        if(activetool !== "select"){
            return;
        }
        selectObject(id);
    }; 
    const handleStagePointerDown = (event : Konva.KonvaEventObject<PointerEvent>) =>{
        if(activetool === "select" && event.target.getStage()){
            clearSelection();
        }
        handlePointerDown();
    }; 

    


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
            onPointerDown={handleStagePointerDown}
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
                                    onSelect={handleSelectObject}
                                    selected = {selectObjectId === object.id}
                                />
                            );

                        case "freehand":
                            return (
                                <FreehandObject
                                    key={object.id}
                                    object={object}
                                    onSelect={handleSelectObject}
                                />
                            );
                        case "ellipse":
                            return (
                                <EllipseObject
                                    key={object.id}
                                    object={object}
                                    onSelect={handleSelectObject}
                                />
                            );
                        case "line":
                            return (
                                <LineObject
                                    key={object.id}
                                    object={object}
                                    onSelect={handleSelectObject}
                                />
                            );
                    }
                })}
            </Layer>
        </Stage>
    );
}