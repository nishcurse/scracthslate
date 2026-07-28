import {Rect} from "react-konva"
import type {Rectangle} from "@/types/board"

type Props = {
  object: Rectangle;
  draggable: boolean;

  onMove: (
    id: string,
    x: number,
    y: number,
  ) => void;

  onDelete: (id: string) => void;
  onSelect: (id : string) => void; 
  selected : boolean;
};

export default function RectangleObject({
  object,
  draggable,
  onMove,
  onSelect,
  onDelete,
  selected, 
}: Props) {
  return (
    <Rect
      id = {object.id}
      x={object.x}
      y={object.y}
      width={object.width}
      height={object.height}
      fill="white"
      stroke={selected ? "#2563eb" : "black"}
      strokeWidth={2}
      draggable={draggable}
      onDragMove={(event) => {
        onMove(
          object.id,
          event.target.x(),
          event.target.y(),
        );
      }}
      onClick={() => onSelect(object.id)}
      onTap={() => onSelect(object.id)}
      onDblClick={() => {
        onDelete(object.id);
      }}
    />
  );  
}