import {Line} from "react-konva"
import type {Line as LineType} from "@/types/board"
import Konva from "konva";
import {scalePoints} from "@/lib/geometry"

type LineTransform = Omit<LineType , 'id' | 'type'>; 


type props = {
    object : LineType;
    onSelect: (id: string) => void;
    draggable: boolean;
    onMove : (id : string, 
        x:  number, 
        y: number,
    ) => void;
    onTransform : (id: string, changes : LineTransform) => void;
}; 

export default function LineObject({object , onSelect , draggable, onMove , onTransform} : props){
    return (
        <Line
        id={object.id}
        x={object.x}
        y={object.y}
        rotation={object.rotation && 0}
        points={object.points}
        stroke="black"
        strokeWidth={3}
        lineCap="round"
        hitStrokeWidth={12}

        draggable = {draggable}

        onTap={() => onSelect(object.id)}
        onClick={()=>onSelect(object.id)}
        onDragMove={(e)=>{
            onMove(object.id, e.target.x(), e.target.y());
        }}
        onTransformEnd={(e: Konva.KonvaEventObject<Event>) => {
            const node = e.target as Konva.Line;

            const transform = node.getTransform();

            const absolutePoints: number[] = [];

            for (
                let i = 0;
                i < object.points.length;
                i += 2
            ) {
                const point = transform.point({
                    x: object.points[i],
                    y: object.points[i + 1],
                });

                absolutePoints.push(
                    point.x,
                    point.y,
                );
            }

            const originX = absolutePoints[0];
            const originY = absolutePoints[1];

            const points: number[] = [];

            for (
                let i = 0;
                i < absolutePoints.length;
                i += 2
            ) {
                points.push(
                    absolutePoints[i] - originX,
                    absolutePoints[i + 1] - originY,
                );
            }

            node.position({
                x: originX,
                y: originY,
            });

            node.rotation(0);
            node.scaleX(1);
            node.scaleY(1);

            onTransform(object.id, {
                x: originX,
                y: originY,
                points,
                rotation: 0,
            });
        }}
        />
    );
} 