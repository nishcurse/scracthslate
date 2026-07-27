"use client";

import Toolbar from "./Toolbar";
import WhiteboardCanvas from "./WhiteboardCanvas";

import { useBoardSocket } from "@/hooks/useBoardSockets";

type Props = {
  boardId: string;
};

export default function Whiteboard({ boardId }: Props) {
  const { send } = useBoardSocket(boardId);

  return (
    <main className="h-screen w-screen overflow-hidden bg-neutral-100">
      <Toolbar />

      <WhiteboardCanvas send={send} />
    </main>
  );
}