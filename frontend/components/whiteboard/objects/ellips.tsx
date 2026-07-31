import { Ellipse } from "react-konva"

import type { Ellipse as EllipseType } from "@/types/board"
import Konva from "konva";
type EllipseTransform = Omit<EllipseType, 'id'| 'type'>;

type props = {
    object: EllipseType;
    draggable : boolean; 
    onSelect : (id : string) => void,
    onMove : (id : string, x : number, y : number) => void,
    onTransform : (id:  string, changes : EllipseTransform) => void,
};

export default function EllipseObject({ object , onSelect, draggable, 
    onMove , onTransform
 }: props) {
    return (
        <Ellipse
            id={object.id}
            x={object.x}
            y={object.y}
            radiusX={object.radiusX}
            radiusY={object.radiusY}
            fill="white"
            stroke="black"
            strokeWidth={2}
            onClick={()=>onSelect(object.id)}
            onTap={() => onSelect(object.id)}
            rotation={object.rotation ?? 0}
            draggable = {draggable}
            onDragMove={(e) => {
                onMove(object.id, e.target.x(), e.target.y());
            }}
            onTransformEnd={(e : Konva.KonvaEventObject<Event>) => {
                const node = e.target as Konva.Ellipse; 
                if(!node) return; 
                const scaleX = node.scaleX(); 
                const scaleY = node.scaleY(); 
                const radiusX = Math.max(5, scaleX * node.radiusX()); 
                const radiusY = Math.max(5 , scaleY * node.radiusY());
                node.scaleX(1); 
                node.scaleY(1);
                onTransform(object.id , {
                    x : node.x(), 
                    y : node.y(), 
                    radiusX , 
                    radiusY ,
                    rotation: node.rotation(), 
                });
            }}
        />
    );
};