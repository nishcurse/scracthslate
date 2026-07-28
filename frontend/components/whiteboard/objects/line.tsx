import {Line} from "react-konva"
import type {Line as LineType} from "@/types/board"

type props = {
    object : LineType;
    onSelect: (id: string) => void,
}; 

export default function LineObject({object , onSelect} : props){
    return (
        <Line
            id={object.id}

        points={object.points}
        stroke="black"
        strokeWidth={3}
        lineCap="round"
        onClick={()=>onSelect(object.id)}
        onTap={() => onSelect(object.id)}
        hitStrokeWidth={12}
        />
    );
} 