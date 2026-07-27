import {Line} from "react-konva"

import type {Freehand} from "@/types/board"

type Props = {
  object: Freehand;
};

export default function FreehandObject({ object }: Props) {
  return (
    <Line
      points={object.points}
      stroke="black"
      strokeWidth={3}
      lineCap="round"
      lineJoin="round"
      tension={0.3}
    />
  );
}