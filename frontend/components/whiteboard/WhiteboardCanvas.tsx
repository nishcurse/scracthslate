"use client";

import { useRef } from "react";
import Konva from "konva";
import { Layer, Stage } from "react-konva";

import FreehandObject from "./objects/freehand";
import RectangleObject from "./objects/rectangle";

import { useBoardStore } from "@/stores/board-store";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { BoardObject } from "@/types/board";
import type { serverEvent } from "@/types/socket";

type Props = {
    send: (message: serverEvent) => void;
};

export default function WhiteboardCanvas({ send }: Props) {
    const { width, height } = useWindowSize();

    const objects = useBoardStore((state) => state.objects);
    const activetool = useBoardStore((state) => state.activetool);

    const addObject = useBoardStore((state) => state.addObject);
    const updateObject = useBoardStore((state) => state.updateObject);
    const removeObject = useBoardStore((state) => state.removeObject);
    const appendPoints = useBoardStore((state) => state.appendPoints)

    const stageRef = useRef<Konva.Stage | null>(null);
    const drawingIdRef = useRef<string | null>(null);

    const pendingPointsRef = useRef<number[]>([]);
    const lastSendTimeRef = useRef(0);

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


    const flushPendingPoints = () => {
        const drawingId = drawingIdRef.current;
        const points = pendingPointsRef.current;
        if (!drawingId || points == null || points?.length === 0) {
            return;
        }
        console.log({
            type: "flushing points",
            points: points
        });
        send({
            type: "stroke:append",
            id: drawingId,
            points,
        });
        pendingPointsRef.current = [];
        lastSendTimeRef.current = performance.now();
    };

    const handlePointerDown = () => {
        if (activetool != "pen")
            return;

        const stage = stageRef.current;
        if (!stage) {
            return;
        }
        const position = stage.getPointerPosition();

        if (!position) {
            return;
        }

        const object: BoardObject = {
            id: crypto.randomUUID(),
            type: "freehand",
            points: [position.x, position.y],
        };
        drawingIdRef.current = object.id;
        pendingPointsRef.current = [];
        lastSendTimeRef.current = performance.now();
        addObject(object);
        send({
            type: "object:create",
            object
        });
    };
    const handlePointerMove = () => {
        if (activetool != "pen") {
            return;
        }
        const drawingId = drawingIdRef.current;
        if (!drawingId) {
            return;
        }

        const stage = stageRef.current;
        if (!stage) {
            return;
        }
        const position = stage.getPointerPosition();
        if (!position) {
            return;
        }
        const object = objects[drawingId];
        if (!object || object["type"] != "freehand") {
            return;
        }
        const points = [
            position.x,
            position.y,
        ];
        appendPoints(drawingId, points);
        // throttling the points push
        pendingPointsRef.current.push(...points);
        const now = performance.now();
        if (now - lastSendTimeRef.current >= 33) {
            flushPendingPoints();
        }
    };
    const handlePointerUp = () => {
        if (activetool !== "pen") {
            return;
        }
        flushPendingPoints();
        drawingIdRef.current = null;
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