import { Ellipse } from "react-konva"

import type { Ellipse as EllipseType } from "@/types/board"
type props = {
    object: EllipseType;
    onSelect : (id : string) => void,
};

export default function EllipseObject({ object , onSelect }: props) {
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
        />
    );
};