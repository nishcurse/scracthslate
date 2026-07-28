import {Line} from "react-konva"

import type {Freehand} from "@/types/board"

type Props = {
  object: Freehand;
  onSelect : (id : string) => void;
};

export default function FreehandObject({ object , onSelect }: Props) {
  return (
    <Line
      id={object.id}

      points={object.points}
      stroke="black"
      strokeWidth={3}
      lineCap="round"
      lineJoin="round"
      tension={0.3}
      onClick={()=>onSelect(object.id)}
      onTap={() => onSelect(object.id)}
    />
  );
}