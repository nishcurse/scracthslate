import {Rect} from "react-konva"
import type {Rectangle} from "@/types/board"
import Konva from "konva";

type rectangleTransform = Omit<Rectangle, 'type' | 'id'>;

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
  onTransform : (id : string,
    changes: rectangleTransform
  ) => void;
};

export default function RectangleObject({
  object,
  draggable,
  onMove,
  onSelect,
  onDelete,
  onTransform,
}: Props) {
  return (
    <Rect
      id = {object.id}
      x={object.x}
      y={object.y}
      rotation={object.rotation ?? 0}
      width={object.width}
      height={object.height}
      fill="white"
      stroke= "black"
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
      onTransformEnd={(e: Konva.KonvaEventObject<Event>) => {
        const node = e.target;

        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        const width = Math.max(
          10,
          node.width() * scaleX,
        );

        const height = Math.max(
          10,
          node.height() * scaleY,
        );

        node.scaleX(1);
        node.scaleY(1);

        onTransform(object.id, {
          x: node.x(),
          y: node.y(),
          width,
          height,
          rotation: node.rotation(),
        });
      }}
    />
  );  
}