"use client";
import React, { useRef } from "react";
import type konva from "konva";

import { useBoardStore } from "@/stores/board-store"
import { serverEvent } from "@/types/socket"
import { BoardObject } from "@/types/board"


type props = {
    stageRef: React.RefObject<konva.Stage | null>;
    send: (message: serverEvent) => void;
    spacePressed : boolean,
};

export function useDrawingTools({
    stageRef,
    send,
    spacePressed,
}: props) {
    const activetool = useBoardStore((st) => st.activetool)
    const addObject = useBoardStore((state) => state.addObject);
    const updateObject = useBoardStore((state) => state.updateObject);
    const appendPoints = useBoardStore((state) => state.appendPoints);

    // refss 
    const shapeIdRef = useRef<string | null>(null);
    const shapeStartRef = useRef<{ x: number; y: number; } | null>(null);
    const drawingIdRef = useRef<string | null>(null);

    const pendingPointsRef = useRef<number[]>([]);
    const lastSendTimeRef = useRef(0);

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
    const getPointerPosition = () => {
        const stage = stageRef.current;
        if(!stage) return null; 
        const pointer = stage.getPointerPosition(); 
        if(!pointer) return null;

        const transform = stage.getAbsoluteTransform().copy().invert()
        return transform.point(pointer);
    }

    const startFreehand = (
        x: number,
        y: number
    ) => {
        const object: BoardObject = {
            id: crypto.randomUUID(),
            type: "freehand",
            rotation: 0,
            x,
            y,
            points: [0, 0],
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

    const startRectangle = (x: number, y: number) => {
        const object: BoardObject = {
            id: crypto.randomUUID(),
            type: "rectangle",
            x,
            y,
            width: 0,
            height: 0,
            rotation: 0,
        };
        shapeIdRef.current = object.id;

        shapeStartRef.current = {
            x, y
        }
        addObject(object)
        send({
            type: "object:create",
            object
        })
    }
    const continueFreehand = (x: number, y: number) => {
        const drawingId = drawingIdRef.current;
        if (!drawingId) {
            return;
        }
        const object = useBoardStore.getState().objects[drawingId];
        if (!object || object.type !== "freehand") {
            return;
        }

        const points = [x - object.x, y - object.y];
        appendPoints(drawingId, points);
        pendingPointsRef.current.push(...points);
        const now = performance.now();
        if (now - lastSendTimeRef.current >= 33) {
            flushPendingPoints();
        }
    }
    const resizeRectangle = (x: number, y: number) => {
        const shapeId = shapeIdRef.current;
        const shapeStart = shapeStartRef.current;
        if (!shapeId || !shapeStart) {
            return;
        }
        const changes = {
            x: Math.min(x, shapeStart.x),
            y: Math.min(y, shapeStart.y),
            width: Math.abs(x - shapeStart.x),
            height: Math.abs(y - shapeStart.y)
        }
        updateObject(shapeId, changes);
        send({
            type: "object:update",
            id: shapeId,
            changes
        });
    };
    const startEllipse = (x: number, y: number) => {
        const object: BoardObject = {
            id: crypto.randomUUID(),
            type: "ellipse",
            x,
            y,
            radiusX: 0,
            radiusY: 0,
            rotation: 0,
        };
        shapeIdRef.current = object.id;
        shapeStartRef.current = { x, y };

        addObject(object);
        send({
            type: "object:create",
            object,
        })
    };
    const resizeEllipse = (currX: number, currY: number) => {
        const id = shapeIdRef.current;
        const start = shapeStartRef.current;
        if (!id || !start) {
            return;
        }
        const width = Math.abs(currX - start.x);
        const height = Math.abs(currY - start.y);
        const changes = {
            x: Math.min(currX, start.x) + width / 2,
            y: Math.min(currY, start.y) + height / 2,
            radiusX: width / 2,
            radiusY: height / 2,
        }
        updateObject(id, changes);
        send({
            type: "object:update",
            id,
            changes,
        });
    };
    // line  
    const startLine = (x: number, y: number) => {
        const object: BoardObject = {
            id: crypto.randomUUID(),
            type: "line",
            x,
            y,
            rotation: 0,
            points: [0, 0, 0, 0],
        };
        shapeIdRef.current = object.id;
        addObject(object);

        send({
            type: "object:create",
            object
        });

    };
    const resizeLine = (currX: number, currY: number) => {
        const id = shapeIdRef.current;
        if (!id) {
            return;
        }
        const object = useBoardStore.getState().objects[id];
        if (!object || object["type"] !== "line") {
            return;
        }
        const changes = {
            points: [
                0,
                0,
                currX - object.x,
                currY - object.y,
            ]
        };
        updateObject(id, changes);
        send({
            type: "object:update",
            id,
            changes
        });
    };
    const handlePointerDown = () => {
        if(spacePressed) return;

        const stage = stageRef.current;
        if (!stage) {
            return;
        }
        const position = getPointerPosition();

        if (!position) {
            return;
        }

        switch (activetool) {
            case "pen":
                startFreehand(position.x, position.y);
                break;
            case "rectangle":
                startRectangle(position.x, position.y);
                break;
            case "ellipse":
                startEllipse(position.x, position.y);
                break;
            case "line":
                startLine(position.x, position.y);
                break;
            default:
                break;
        }
    };


    const handlePointerMove = () => {
        const stage = stageRef.current;
        if (!stage) {
            return;
        }
        const position = getPointerPosition();
        if (!position) {
            return;
        }
        switch (activetool) {
            case "pen":
                continueFreehand(position.x, position.y);
                break;
            case "rectangle":
                resizeRectangle(position.x, position.y);
                break;
            case "ellipse":
                resizeEllipse(position.x, position.y);
                break;
            case "line":
                resizeLine(position.x, position.y);
                break;
            default:
                break;
        }

        // throttling the points push

    };
    const handlePointerUp = () => {
        switch (activetool) {
            case "pen":
                flushPendingPoints()
                drawingIdRef.current = null;
                break;
            case "rectangle":
                shapeIdRef.current = null;
                shapeStartRef.current = null;
                break;
            case "ellipse":
                shapeIdRef.current = null;
                shapeStartRef.current = null;
                break;
            case "line":
                shapeIdRef.current = null;
                break;
        }
    };


    return {
        handlePointerDown,
        handlePointerUp,
        handlePointerMove,
    };
}