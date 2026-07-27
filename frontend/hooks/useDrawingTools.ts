"use client"; 
import React, { useRef } from "react";
import type konva from "konva"; 

import {useBoardStore} from "@/stores/board-store"
import {serverEvent} from "@/types/socket"
import {BoardObject} from "@/types/board"

type props = {
    stageRef : React.RefObject<konva.Stage | null>; 
    send: (message: serverEvent) => void;
};

export function useDrawingTools({
    stageRef, 
    send,
}: props){
    const activetool = useBoardStore((st) => st.activetool)
    const addObject = useBoardStore((state) => state.addObject);
    const updateObject = useBoardStore((state) => state.updateObject);
    const appendPoints = useBoardStore((state) => state.appendPoints); 

    // refss 
    const shapeIdRef = useRef<string | null>(null);
    const shapeStartRef = useRef<{x : number;  y : number;} | null>(null);
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

     const startFreehand = (
        x : number, 
        y : number
    ) => {
        const object: BoardObject = {
            id: crypto.randomUUID(),
            type: "freehand",
            points: [x, y],
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

    const startRectangle = (x : number , y : number) => {
        const object : BoardObject = {
            id : crypto.randomUUID(), 
            type : "rectangle", 
            x, 
            y, 
            width : 0, 
            height : 0, 
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
    const continueFreehand = (x : number, y : number) => {
        const drawingId = drawingIdRef.current; 
        if(!drawingId){
            return;
        }
        const points = [x, y];
        appendPoints(drawingId, points); 
        pendingPointsRef.current.push(...points);
        const now = performance.now();
        if (now - lastSendTimeRef.current >= 33) {
            flushPendingPoints();
        }
    }
    const resizeRectangle = (x:number, y:number) =>{
        const shapeId = shapeIdRef.current;
        const shapeStart = shapeStartRef.current;
        if(!shapeId || !shapeStart){
            return;
        }
        const changes = {
            x : Math.min(x , shapeStart.x),
            y : Math.min(y , shapeStart.y),
            width : Math.abs(x - shapeStart.x), 
            height : Math.abs(y - shapeStart.y)
        }
        updateObject(shapeId, changes);
        send({
            type : "object:update", 
            id : shapeId, 
            changes
        });
    };
    const handlePointerDown = () => {

        const stage = stageRef.current;
        if (!stage) {
            return;
        }
        const position = stage.getPointerPosition();

        if (!position) {
            return;
        }

        switch(activetool){
            case "pen": 
                startFreehand(position.x, position.y);
                break;
            case "rectangle": 
                startRectangle(position.x, position.y);
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
        const position = stage.getPointerPosition();
        if (!position) {
            return;
        }
        switch(activetool){
            case "pen":
                continueFreehand(position.x , position.y);
                break;
            case "rectangle": 
                resizeRectangle(position.x , position.y);
                break;
            default: 
                break;
        }
        
        // throttling the points push
        
    };
    const handlePointerUp = () => {
        switch(activetool){
            case "pen": 
                flushPendingPoints()
                drawingIdRef.current = null;
                break;
            case "rectangle": 
                shapeIdRef.current = null; 
                shapeStartRef.current = null;
        }
    };


    return {
        handlePointerDown, 
        handlePointerUp, 
        handlePointerMove,
    }; 
}