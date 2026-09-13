"use client";

import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import {
    Layer,
    Stage,
    Transformer,
    Circle,
} from "react-konva";

import FreehandObject from "./objects/freehand";
import RectangleObject from "./objects/rectangle";
import EllipseObject from "./objects/ellips";
import LineObject from "./objects/line";
import TextObject from "./objects/textobject";

import { useBoardStore } from "@/stores/board-store";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { serverEvent } from "@/types/socket";
import { useDrawingTools } from "@/hooks/useDrawingTools";
import { usePresence } from "@/hooks/usePresence";
import { BoardObject } from "@/types/board";
import { useAuthStore } from "@/stores/auth-store";
import { PresenceCursor } from "./PresenceCursor";

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

    const worldLeft = -position.x / scale;
    const worldTop = -position.y / scale;

    const worldRight =
        worldLeft + width / scale;

    const worldBottom =
        worldTop + height / scale;

    const startX =
        Math.floor(worldLeft / spacing) * spacing -
        spacing;

    const endX =
        Math.ceil(worldRight / spacing) * spacing +
        spacing;

    const startY =
        Math.floor(worldTop / spacing) * spacing -
        spacing;

    const endY =
        Math.ceil(worldBottom / spacing) * spacing +
        spacing;

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

export default function WhiteboardCanvas({
    send,
    scale,
    position,
    setScale,
    setPosition,
}: Props) {
    const stageRef =
        useRef<Konva.Stage | null>(null);

    const transformerRef =
        useRef<Konva.Transformer | null>(null);

    const textareaRef =
        useRef<HTMLTextAreaElement | null>(null);

    const textMeasureRef =
        useRef<HTMLSpanElement | null>(null);

    const editingTextIdRef =
        useRef<string | null>(null);

    const { width, height } = useWindowSize();

    const objects = useBoardStore(
        (state) => state.objects
    );

    const activetool = useBoardStore(
        (state) => state.activetool
    );

    const liveUsers = useBoardStore(
        (state) => state.liveUsers
    );

    const currentUser = useAuthStore(
        (state) => state.user
    );

    const updateObject = useBoardStore(
        (state) => state.updateObject
    );

    const removeObject = useBoardStore(
        (state) => state.removeObject
    );

    const selectObjectId = useBoardStore(
        (state) => state.selectObjectId
    );

    const selectObject = useBoardStore(
        (state) => state.selectObject
    );

    const clearSelection = useBoardStore(
        (state) => state.clearSelection
    );

    const [spacePressed, setSpacePressed] =
        useState(false);

    const [isEditingText, setIsEditingText] =
        useState(false);

    const [editingTextId, setEditingTextId] =
        useState<string | null>(null);

    const [editorText, setEditorText] =
        useState("");

    const {
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    } = useDrawingTools({
        stageRef,
        send,
        spacePressed,

        onTextCreate: (id) => {
            editingTextIdRef.current = id;
            setEditingTextId(id);
            setEditorText("");
            setIsEditingText(true);

            requestAnimationFrame(() => {
                textareaRef.current?.focus();
            });
        },
    });

    const { sendCursorPosition } =
        usePresence({ send });

    useEffect(() => {
        const handleKeyDown = (
            e: KeyboardEvent
        ) => {
            const editingTextarea =
                document.activeElement ===
                textareaRef.current;

            if (
                e.code === "Space" &&
                !editingTextarea
            ) {
                e.preventDefault();
                setSpacePressed(true);
            }
        };

        const handleKeyUp = (
            e: KeyboardEvent
        ) => {
            const editingTextarea =
                document.activeElement ===
                textareaRef.current;

            if (
                e.code === "Space" &&
                !editingTextarea
            ) {
                e.preventDefault();
                setSpacePressed(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        window.addEventListener(
            "keyup",
            handleKeyUp
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

            window.removeEventListener(
                "keyup",
                handleKeyUp
            );
        };
    }, []);

    const handleSelectObject = (
        id: string
    ) => {
        if (
            activetool !== "select" ||
            isEditingText
        ) {
            return;
        }

        selectObject(id);
    };

    const handleStagePointerDown = (
        e: Konva.KonvaEventObject<PointerEvent>
    ) => {
        const target = e.target;

        if (
            target.getParent()?.className ===
            "Transformer" ||
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

    const TransformObject = (
        id: string,
        changes: Partial<BoardObject>
    ) => {
        updateObject(id, changes);

        send({
            type: "object:update",
            id,
            changes,
        });
    };

    const moveObject = (
        id: string,
        x: number,
        y: number
    ) => {
        const changes = { x, y };

        updateObject(id, changes);

        send({
            type: "object:update",
            id,
            changes,
        });
    };

    const deleteObject = (id: string) => {
        if (selectObjectId === id) {
            transformerRef.current?.nodes([]);
            clearSelection();
        }

        removeObject(id);

        send({
            type: "object:delete",
            id,
        });
    };

    const finishTextEditing = () => {
        const id =
            editingTextIdRef.current;

        if (!id) {
            return;
        }

        const text = editorText;

        if (text.trim().length === 0) {
            deleteObject(id);
        } else {
            const changes = {
                text,
            };

            updateObject(id, changes);

            send({
                type: "object:update",
                id,
                changes,
            });
        }

        editingTextIdRef.current = null;
        setEditingTextId(null);
        setEditorText("");
        setIsEditingText(false);
    };

    const cancelTextEditing = () => {
        const id =
            editingTextIdRef.current;

        if (id) {
            deleteObject(id);
        }

        editingTextIdRef.current = null;
        setEditingTextId(null);
        setEditorText("");
        setIsEditingText(false);
    };

    const handleEditText = (id: string) => {
        if (
            activetool !== "select" ||
            isEditingText
        ) {
            return;
        }

        const object = objects[id];

        if (
            !object ||
            object.type !== "text"
        ) {
            return;
        }

        transformerRef.current?.nodes([]);

        editingTextIdRef.current = id;
        setEditingTextId(id);
        setEditorText(object.text);
        setIsEditingText(true);

        requestAnimationFrame(() => {
            const textarea =
                textareaRef.current;

            if (!textarea) {
                return;
            }

            textarea.focus();
            textarea.select();
        });
    };

    const getPointerCoordinates = () => {
        const stage = stageRef.current;

        if (!stage) {
            return;
        }

        const pointer =
            stage.getPointerPosition();

        if (!pointer) {
            return;
        }

        const transform =
            stage
                .getAbsoluteTransform()
                .copy()
                .invert();

        return transform.point(pointer);
    };

    useEffect(() => {
        if (!isEditingText) {
            return;
        }

        const id =
            editingTextIdRef.current;

        if (!id) {
            return;
        }

        const object = objects[id];

        if (
            !object ||
            object.type !== "text"
        ) {
            return;
        }

        const textarea =
            textareaRef.current;

        const measure =
            textMeasureRef.current;

        if (!textarea || !measure) {
            return;
        }

        textarea.style.left =
            `${position.x + object.x * scale}px`;

        textarea.style.top =
            `${position.y + object.y * scale}px`;

        textarea.style.fontSize =
            `${object.fontSize * scale}px`;

        textarea.style.fontFamily =
            object.fontFamily;

        textarea.style.color =
            object.fill;

        measure.style.fontSize =
            `${object.fontSize * scale}px`;

        measure.style.fontFamily =
            object.fontFamily;

        measure.textContent =
            editorText || " ";

        textarea.style.width =
            `${Math.max(
                40,
                measure.offsetWidth + 10
            )}px`;

        textarea.style.height =
            `${Math.max(
                28,
                object.fontSize * scale + 10
            )}px`;
    }, [
        isEditingText,
        editorText,
        objects,
        position,
        scale,
    ]);

    useEffect(() => {
        const transformer =
            transformerRef.current;

        const stage = stageRef.current;

        if (!transformer || !stage) {
            return;
        }

        if (isEditingText) {
            transformer.nodes([]);
            transformer.getLayer()?.batchDraw();
            return;
        }

        if (!selectObjectId) {
            transformer.nodes([]);
            transformer.getLayer()?.batchDraw();
            return;
        }

        const node = stage.findOne(
            `#${selectObjectId}`
        );

        if (!node) {
            transformer.nodes([]);
            transformer.getLayer()?.batchDraw();
            return;
        }

        transformer.nodes([node]);
        transformer.getLayer()?.batchDraw();
    }, [
        selectObjectId,
        objects,
        isEditingText,
    ]);

    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            if (isEditingText) {
                return;
            }

            if (!selectObjectId) {
                return;
            }

            if (event.key === "Escape") {
                clearSelection();
                return;
            }

            if (event.key === "Delete") {
                event.preventDefault();

                clearSelection();

                deleteObject(selectObjectId);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        selectObjectId,
        isEditingText,
    ]);

    const handleWheel = (
        e: Konva.KonvaEventObject<WheelEvent>
    ) => {
        e.evt.preventDefault();

        const stage = stageRef.current;

        if (!stage) {
            return;
        }

        const pointer =
            stage.getPointerPosition();

        if (!pointer) {
            return;
        }

        const oldScale = stage.scaleX();

        const scaleBy = 1.05;

        const mousePointTo = {
            x:
                (pointer.x - stage.x()) /
                oldScale,

            y:
                (pointer.y - stage.y()) /
                oldScale,
        };

        const direction =
            e.evt.deltaY > 0 ? -1 : 1;

        const newScale =
            direction > 0
                ? oldScale * scaleBy
                : oldScale / scaleBy;

        const clampedScale = Math.min(
            5,
            Math.max(0.2, newScale)
        );

        const newPosition = {
            x:
                pointer.x -
                mousePointTo.x *
                clampedScale,

            y:
                pointer.y -
                mousePointTo.y *
                clampedScale,
        };

        setScale(clampedScale);
        setPosition(newPosition);
    };

    return (
        <div className="absolute inset-x-0 bottom-0 top-[68px] bg-[#F7F7F5]">

            {isEditingText && (
                <>
                    <span
                        ref={textMeasureRef}
                        className="absolute invisible whitespace-pre"
                    />

                    <textarea
                        ref={textareaRef}
                        value={editorText}
                        autoFocus
                        onChange={(event) => {
                            setEditorText(
                                event.target.value
                            );
                        }}
                        onKeyDown={(event) => {
                            if (
                                event.key ===
                                "Enter"
                            ) {
                                event.preventDefault();
                                finishTextEditing();
                            }

                            if (
                                event.key ===
                                "Escape"
                            ) {
                                event.preventDefault();
                                cancelTextEditing();
                            }
                        }}
                        className="
                            absolute
                            z-50
                            resize-none
                            overflow-hidden
                            border
                            border-[#0057FF]
                            bg-transparent
                            px-1
                            py-0
                            outline-none
                        "
                    />
                </>
            )}

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
                onPointerDown={
                    handleStagePointerDown
                }
                onPointerMove={() => {
                    handlePointerMove();

                    if (spacePressed) {
                        return;
                    }

                    const pointer =
                        getPointerCoordinates();

                    if (!pointer) {
                        return;
                    }

                    sendCursorPosition(
                        pointer.x,
                        pointer.y
                    );
                }}
                onPointerUp={handlePointerUp}
                onDragEnd={(e) => {
                    if (!spacePressed) {
                        return;
                    }

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
                    if (!spacePressed) {
                        return;
                    }

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
                    {Object.values(objects).map(
                        (object) => {
                            switch (object.type) {
                                case "rectangle":
                                    return (
                                        <RectangleObject
                                            key={object.id}
                                            object={object}
                                            draggable={
                                                activetool ===
                                                "select"
                                            }
                                            onMove={
                                                moveObject
                                            }
                                            onDelete={
                                                deleteObject
                                            }
                                            onSelect={
                                                handleSelectObject
                                            }
                                            onTransform={
                                                TransformObject
                                            }
                                        />
                                    );

                                case "freehand":
                                    return (
                                        <FreehandObject
                                            key={object.id}
                                            object={object}
                                            onSelect={
                                                handleSelectObject
                                            }
                                            draggable={
                                                activetool ===
                                                "select"
                                            }
                                            onMove={
                                                moveObject
                                            }
                                            onTransform={
                                                TransformObject
                                            }
                                        />
                                    );

                                case "ellipse":
                                    return (
                                        <EllipseObject
                                            key={object.id}
                                            object={object}
                                            onSelect={
                                                handleSelectObject
                                            }
                                            draggable={
                                                activetool ===
                                                "select"
                                            }
                                            onMove={
                                                moveObject
                                            }
                                            onTransform={
                                                TransformObject
                                            }
                                        />
                                    );

                                case "line":
                                    return (
                                        <LineObject
                                            key={object.id}
                                            object={object}
                                            onSelect={
                                                handleSelectObject
                                            }
                                            draggable={
                                                activetool ===
                                                "select"
                                            }
                                            onMove={
                                                moveObject
                                            }
                                            onTransform={
                                                TransformObject
                                            }
                                        />
                                    );

                                case "text":
                                    return (
                                        <TextObject
                                            key={object.id}
                                            object={object}
                                            draggable={
                                                activetool ===
                                                "select" &&
                                                !isEditingText
                                            }
                                            editing={
                                                isEditingText &&
                                                editingTextId ===
                                                object.id
                                            }
                                            onMove={
                                                moveObject
                                            }
                                            onSelect={
                                                handleSelectObject
                                            }
                                            onEdit={
                                                handleEditText
                                            }
                                        />
                                    );
                            }
                        }
                    )}

                    {!isEditingText && (
                        <Transformer
                            ref={transformerRef}
                            rotateEnabled
                            boundBoxFunc={(
                                oldBox,
                                newBox
                            ) => {
                                if (
                                    Math.abs(
                                        newBox.width
                                    ) < 10 ||
                                    Math.abs(
                                        newBox.height
                                    ) < 10
                                ) {
                                    return oldBox;
                                }

                                return newBox;
                            }}
                        />
                    )}
                </Layer>

                <Layer listening={false}>
                    {Object.values(
                        liveUsers
                    ).map((liveUser) => {
                        if (
                            liveUser.id ===
                            currentUser?.id ||
                            !liveUser.cursor
                        ) {
                            return null;
                        }

                        return (
                            <PresenceCursor
                                key={liveUser.id}
                                userId={liveUser.id}
                            />
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
}