"use client";

import { useEffect, useRef , useState } from "react";
import Konva from "konva";
import { KonvaNodeComponent, Layer, Stage , Transformer} from "react-konva";

import FreehandObject from "./objects/freehand";
import RectangleObject from "./objects/rectangle";
import EllipseObject from "./objects/ellips"
import LineObject from "./objects/line"

import { useBoardStore } from "@/stores/board-store";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { serverEvent } from "@/types/socket";
import { useDrawingTools } from "@/hooks/useDrawingTools"
import { BoardObject } from "@/types/board";



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
        <Stage
            ref={stageRef}
            width={width}
            height={height}
            x={position.x}
            y={position.y}
            scaleX={scale}
            scaleY={scale}
            draggable={spacePressed}
            onWheel={handleWheel}
            onPointerDown={handleStagePointerDown}
            onPointerMove={handlePointerMove}
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
    );
}