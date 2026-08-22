"use client";

import Toolbar from "./Toolbar";
import WhiteboardCanvas from "./WhiteboardCanvas";
import BoardHeader from "./BoardHeader";
import CanvasControls from "./CanvasControls";

import { useBoardSocket } from "@/hooks/useBoardSockets";

type Props = {
  boardId: string;
};

export default function Whiteboard({ boardId }: Props) {
  const { send } = useBoardSocket(boardId);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-paper">
      <BoardHeader boardTitle={boardId} />

      <WhiteboardCanvas send={send} />

      <Toolbar />

      <CanvasControls />
    </main>
  );
}