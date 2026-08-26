"use client";

import { useEffect, useRef , useState } from "react";
import Konva from "konva";
import { Layer, Stage , Transformer , Circle} from "react-konva";

import FreehandObject from "./objects/freehand";
import RectangleObject from "./objects/rectangle";
import EllipseObject from "./objects/ellips"
import LineObject from "./objects/line"

import { useBoardStore } from "@/stores/board-store";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { serverEvent } from "@/types/socket";
import { useDrawingTools } from "@/hooks/useDrawingTools"
import {usePresence} from "@/hooks/usePresence"
import { BoardObject } from "@/types/board";
import { DEV_TOOLS_INFO_USER_PREFERENCES_STYLES } from "next/dist/next-devtools/dev-overlay/components/errors/dev-tools-indicator/dev-tools-info/user-preferences";





type Props = {
    send: (message: serverEvent) => void;
    scale: number;

    position: {
        x: number;
        y: number;
    };

    setScale: React.Dispatch<React.SetStateAction<number>>;

    setPosition: React.Dispatch<
        React.SetStateAction<{
            x: number;
            y: number;
        }>
    >;
};

function DotGrid({
    width,
    height,
    scale,
    position,
}: {
    width: number;
    height: number;
    scale: number;
    position: {
        x: number;
        y: number;
    };
}) {
    const spacing = 24;

    // Convert viewport bounds into world coordinates.
    const worldLeft = -position.x / scale;
    const worldTop = -position.y / scale;

    const worldRight =
        worldLeft + width / scale;

    const worldBottom =
        worldTop + height / scale;

    // Start/end slightly outside the viewport
    // so there are no visible gaps while moving.
    const startX =
        Math.floor(worldLeft / spacing) * spacing - spacing;

    const endX =
        Math.ceil(worldRight / spacing) * spacing + spacing;

    const startY =
        Math.floor(worldTop / spacing) * spacing - spacing;

    const endY =
        Math.ceil(worldBottom / spacing) * spacing + spacing;

    const dots = [];

    for (let x = startX; x <= endX; x += spacing) {
        for (let y = startY; y <= endY; y += spacing) {
            dots.push(
                <Circle
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    radius={1}
                    fill="rgba(0, 0, 0, 0.20)"
                    listening={false}
                />
            );
        }
    }

    return <>{dots}</>;
}


export default function WhiteboardCanvas({ send,
    scale,
    position,
    setScale,
    setPosition,
} : Props) {
    const stageRef = useRef<Konva.Stage | null>(null);
    const { width, height } = useWindowSize();


    const objects = useBoardStore((state) => state.objects);
    const activetool = useBoardStore((state) => state.activetool);

    const [spacePressed , setSpacePressed] = useState(false);

    const updateObject = useBoardStore((state) => state.updateObject);
    const removeObject = useBoardStore((state) => state.removeObject);
    const { handlePointerDown, handlePointerMove, handlePointerUp } = useDrawingTools({ stageRef, send , spacePressed });
    const {sendCursorPosition} = usePresence({send});
    const selectObjectId = useBoardStore((st) => st.selectObjectId);
    const selectObject = useBoardStore((st) => st.selectObject);
    const clearSelection = useBoardStore((st) => st.clearSelection );
    const transformerRef = useRef<Konva.Transformer | null>(null);




    useEffect(() => {
        const handleKeyDown = (e : KeyboardEvent)=>{
            if(e.code === "Space"){
                e.preventDefault(); 
                setSpacePressed(true);
            }
        }; 
        const handleKeyUp = (e: KeyboardEvent)=>{
            if(e.code === "Space"){
                e.preventDefault(); 
                setSpacePressed(false);
            }
        };
        window.addEventListener("keydown" , handleKeyDown); 
        window.addEventListener("keyup" , handleKeyUp); 
        return () => {
            window.removeEventListener("keydown", handleKeyDown); 
            window.removeEventListener("keyup", handleKeyUp);
        };
    },[])

    


    const handleSelectObject = (id : string) => {
        if(activetool !== "select"){
            return;
        }
        selectObject(id);
    }; 
    const handleStagePointerDown = (
        e: Konva.KonvaEventObject<PointerEvent>,
    ) => {
        const target = e.target;

        if (
            target.getParent()?.className === "Transformer" ||
            target.className === "Transformer"
        ) {
            return;
        }

        if (activetool === "select") {
            if (target === target.getStage()) {
                clearSelection();
            }

            return;
        }

        handlePointerDown();
    };

    const TransformObject = (id : string , changes : Partial<BoardObject>) => {
        updateObject(id, changes); 
        send({
            type : "object:update", 
            id,
            changes,
        })
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
    const getPointerCoordinates = () => {
        const stage = stageRef.current; 
        if(!stage){
            return;
        }
        const pointer = stage.getPointerPosition(); 
        if(!pointer){
            return;
        }
        const transform = stage.getAbsoluteTransform().copy().invert(); 
        return transform.point(pointer);
    };


    // applying transformer over the object 
    useEffect(() => {
        const transformer = transformerRef.current;
        const stage = stageRef.current;

        if (!transformer || !stage) {
            return;
        }

        if (!selectObjectId) {
            transformer.nodes([]);
            return;
        }

        
        
        const node = stage.findOne(`#${selectObjectId}`);
        
        if (!node) {
            transformer.nodes([]);
            return;
        }

        transformer.nodes([node]);
    }, [selectObjectId]);

    useEffect(() => {
        const handleKeyDown = (event : KeyboardEvent) => {
            if(!selectObjectId){
                return; 
            }
            if(event.key === "Escape"){
                clearSelection(); 
                return;
            }
            if(event.key === "Delete"){
                event.preventDefault(); 
                clearSelection();
                deleteObject(selectObjectId);
            }
        }; 
        window.addEventListener("keydown" , handleKeyDown); 
        return () => {
            window.removeEventListener("keydown" , handleKeyDown);

        }
    },[selectObjectId]);

    const handleWheel = (e : Konva.KonvaEventObject<WheelEvent>) =>{
        e.evt.preventDefault();
        const stage = stageRef.current; 
        if(!stage) return; 
        const pointer = stage.getPointerPosition(); 
        if(!pointer) return;
        const oldScale = stage.scaleX(); 
        const scaleBy = 1.05; 
        const mousePointTo = {
            x : (pointer.x - stage.x()) / oldScale,
            y : (pointer.y - stage.y()) / oldScale, 
        }; 
        const direction = e.evt.deltaY > 0 ? -1 : 1; 
        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        const clampedScale = Math.min(5, Math.max(0.2, newScale)); 
        const newPosition = {
            x : pointer.x - mousePointTo.x * clampedScale, 
            y : pointer.y - mousePointTo.y * clampedScale,
        }
        setScale(clampedScale); 
        setPosition(newPosition);
    }




    return (
        <div className="absolute inset-x-0 bottom-0 top-[68px] bg-[#F7F7F5]">
        <Stage
            ref={stageRef}
            width={width}
            height={height - 68}
            x={position.x}
            y={position.y}
            scaleX={scale}
            scaleY={scale}
            draggable={spacePressed}
            onWheel={handleWheel}
            onPointerDown={handleStagePointerDown}
            onPointerMove={() => {
                handlePointerMove();

                if (spacePressed) {
                    return;
                }

                const position = getPointerCoordinates();

                if (!position) {
                    return;
                }

                sendCursorPosition(
                    position.x,
                    position.y,
                );
            }}
            onPointerUp={handlePointerUp}
            onDragEnd={(e) => {
                if (!spacePressed) return;

                setPosition({
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}
            style={{
                cursor: spacePressed
                    ? "grab"
                    : activetool === "select"
                        ? "default"
                        : "crosshair",
            }}
            onDragMove={(e) => {
                if (!spacePressed) return;

                setPosition({
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}
        >
                <Layer listening={false}>
                    <DotGrid
                        width={width}
                        height={height - 68}
                        scale={scale}
                        position={position}
                    />
                </Layer>

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
                                    onTransform={TransformObject}
                                />
                            );

                        case "freehand":
                            return (
                                <FreehandObject
                                    key={object.id}
                                    object={object}
                                    onSelect={handleSelectObject}
                                    draggable = {activetool === "select"}
                                    onMove={moveObject}
                                    onTransform={TransformObject}
                                />
                            );
                        case "ellipse":
                            return (
                                <EllipseObject
                                    key={object.id}
                                    object={object}
                                    onSelect={handleSelectObject}
                                    draggable = {activetool == "select"}
                                    onMove={moveObject}
                                    onTransform={TransformObject}
                                />
                            );
                        case "line":
                            return (
                                <LineObject
                                    key={object.id}
                                    object={object}
                                    onSelect={handleSelectObject}
                                    draggable = {activetool==="select"}
                                    onMove={moveObject}
                                    onTransform={TransformObject}
                                />
                            );
                    }
                })}
                <Transformer
                    ref={transformerRef}
                    rotateEnabled
                    boundBoxFunc={(oldBox, newBox) => {
                        if (
                            Math.abs(newBox.width) < 10 ||
                            Math.abs(newBox.height) < 10
                        ) {
                            return oldBox;
                        }

                        return newBox;
                    }}
                />
            </Layer>
        </Stage>
        </div>
    );
}