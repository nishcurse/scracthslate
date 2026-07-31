import {Line} from "react-konva"
import Konva from "konva"
import type {Freehand} from "@/types/board"
import {scalePoints} from "@/lib/geometry"

type FreehandTransform = Omit <Freehand, 'id' | 'type'> ;

type Props = {
  object: Freehand;
  onSelect : (id : string) => void;
  draggable : boolean, 
  onMove : (id:string, x : number, y : number) => void;
  onTransform: (id: string, changes: FreehandTransform) => void;
};

export default function FreehandObject({ object , onSelect , draggable , onMove , onTransform}: Props) {
  return (
    <Line
      id={object.id}
      x={object.x}
      y={object.y}

      rotation={object.rotation}
      points={object.points}
      draggable= {draggable}
      stroke="black"
      strokeWidth={3}

      lineCap="round"
      lineJoin="round"
      tension={0.3}

      onClick={()=>onSelect(object.id)}
      onTap={() => onSelect(object.id)}

      onDragMove={(e)=>{
        onMove(object.id , e.target.x() , e.target.y());
      }}
      onTransformEnd={(e: Konva.KonvaEventObject<Event>) => {
        const node = e.target as Konva.Line;

        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        const points = scalePoints(
          object.points,
          scaleX,
          scaleY,
        );

        node.scaleX(1);
        node.scaleY(1);

        onTransform(object.id, {
          x: node.x(),
          y: node.y(),
          points,
          rotation: node.rotation(),
        });
      }}
    />
  );
}