"use client"; 

import {Layer , Rect , Stage, Line} from "react-konva"; 
import {act, useRef} from "react"
import Konva from "konva"
import { useBoardStore } from "@/stores/board-store" 

import {useBoardSocket} from "@/hooks/useBoardSockets"
import { BoardObject } from "@/types/board";
import { Linden_Hill } from "next/font/google";
import { stages } from "konva/lib/Stage";

type WhiteboardProps = {
  boardId : string
}

export default function Whiteboard({boardId} : WhiteboardProps) {
  const { send } = useBoardSocket(boardId);
  const objects = useBoardStore((state) => state.objects); 
  const addObject = useBoardStore((state) => state.addObject); 
  const updateObject = useBoardStore((state) => state.updateObject);
  const removeObject = useBoardStore((state) => state.removeObject); 
  const activetool = useBoardStore((state) => state.activetool);
  const setActivetool = useBoardStore((state) => state.setActivetool);
  const appendPoints = useBoardStore((state) => state.appendPoints);
  const pendingPointsRef = useRef<number[] | null>(null);
  const drawingIdRef = useRef<string | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);

  const createRectangle = () => {
    const object : BoardObject = {
      id : crypto.randomUUID(), 
      type : "rectangle", 
      x : 100, 
      y : 100, 
      width: 200, 
      height: 120, 
    };
    addObject(object); 
    send({
      type : "object:create", 
      object,
    });
  }; 

  const moveObject = (id : string , x : number, y : number) => {
    const changes = {x, y}; 
    updateObject(id,changes); 
    send({
      type : "object:update", 
      id, 
      changes
    })
  }

  const handlePointerDown = () => {
    if(activetool != "pen")
      return; 

    const stage = stageRef.current; 
    if(!stage){
      return; 
    }
    const position = stage.getPointerPosition(); 

    if(!position){
      return;
    }

    const object : BoardObject = {
      id : crypto.randomUUID(), 
      type : "freehand", 
      points : [position.x , position.y],
    }; 
    drawingIdRef.current = object.id; 
    addObject(object); 
    send({
      type : "object:create", 
      object
    });
  };
  const handlePointerMove = () => {
    if(activetool != "pen"){
      return;
    }
    const drawingId = drawingIdRef.current; 
    if(!drawingId){
      return;
    }

    const stage = stageRef.current; 
    if(!stage){
      return;
    }
    const position = stage.getPointerPosition();
    if(!position){
      return;
    }
    const object = objects[drawingId]; 
    if(!object || object["type"] != "freehand"){
      return;
    }
    const points = [
      position.x, 
      position.y,
    ];
    appendPoints(drawingId, points);
    send({
      type: "stroke:append", 
      id : drawingId, 
      points: points
    })
  }; 
  const handlePointerUp = () =>{
    if(activetool !== "pen"){
      return;
    }
    drawingIdRef.current = null;
  }; 

  return (
    <main className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="absolute left-4 top-4 z-10 flex gap-2">
        <button
          onClick={() => setActivetool("select")}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Select
        </button>

        <button
          onClick={() => setActivetool("pen")}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Pen
        </button>

        <button
          onClick={createRectangle}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Rectangle
        </button>
      </div>

      <Stage 
      ref={stageRef}
      width={window.innerWidth} 
      height={window.innerHeight}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      >
        <Layer>
          { Object.values(objects).map((object) => {
             switch (object.type) {
                case "rectangle":
                  return (
                    <Rect
                      key={object.id}
                      x={object.x}
                      y={object.y}
                      width={object.width}
                      height={object.height}
                      fill="white"
                      stroke="black"
                      strokeWidth={2}
                      draggable
                      onDragEnd={(event) => {
                        const changes = {
                          x: event.target.x(),
                          y: event.target.y(),
                        };

                        updateObject(object.id, changes);

                        send({
                          type: "object:update",
                          id: object.id,
                          changes,
                        });
                      }}
                      onDragMove={(e) => {
                        moveObject(object.id, e.target.x(), e.target.y());
                      }}
                      onDblClick={() => {
                        removeObject(object.id);

                        send({
                          type: "object:delete",
                          id: object.id,
                        });
                      }}
                    />
                  );

                case "freehand":
                  return (
                    <Line
                      key={object.id}
                      points={object.points}
                      stroke="black"
                      strokeWidth={3}
                      lineCap="round"
                      lineJoin="round"
                      tension={0.3}
                    />
                  );

                default:
                  return null;
              }
          })}
        </Layer>
      </Stage>
    </main>
  );
}


