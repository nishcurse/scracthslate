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
};

export default function RectangleObject({
  object,
  draggable,
  onMove,
  onDelete,
}: Props) {
  return (
    <Rect
      x={object.x}
      y={object.y}
      width={object.width}
      height={object.height}
      fill="white"
      stroke="black"
      strokeWidth={2}
      draggable={draggable}
      onDragMove={(event) => {
        onMove(
          object.id,
          event.target.x(),
          event.target.y(),
        );
      }}
      onDblClick={() => {
        onDelete(object.id);
      }}
    />
  );
}