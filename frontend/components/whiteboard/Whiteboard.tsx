"use client"; 

import {Layer , Rect , Stage} from "react-konva"; 

import { useBoardStore } from "@/stores/board-store" 

export default function Whiteboard() {
  const objects = useBoardStore((state) => state.objects); 
  const addObject = useBoardStore((state) => state.addObject); 
  const updateObject = useBoardStore((state) => state.updateObject); 

  const createRectangle = () => {
    const id = crypto.randomUUID(); 
    addObject({
      id, 
      type: "rectangle", 
      x: 100, 
      y: 100, 
      width : 200, 
      height : 120
    }); 
  }; 

  return (
    <main className="h-screen w-screen overflow-hidden bg-neutral-100">
      <button
        onClick={createRectangle}
        className="absolute left-4 top-4 z-10 rounded-md bg-black px-4 py-2 text-white"
      >
        Add Rectangle
      </button>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {Object.values(objects).map((object) => (
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
                updateObject(object.id, {
                  x: event.target.x(),
                  y: event.target.y(),
                });
              }}
            />
          ))}
        </Layer>
      </Stage>
    </main>
  );
}


