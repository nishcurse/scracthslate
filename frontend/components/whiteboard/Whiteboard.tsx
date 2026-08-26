"use client";

import { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import WhiteboardCanvas from "./WhiteboardCanvas";
import { BoardHeader } from "./BoardHeader";
import CanvasControls from "./CanvasControls";

import { useBoardSocket } from "@/hooks/useBoardSockets";
import { useAuthStore } from "@/stores/auth-store";
import {boardClient} from "@/board/board-client"

type Props = {
  boardId: string;
};

export default function Whiteboard({ boardId }: Props) {
  const { send } = useBoardSocket(boardId);
  const [scale, setScale] = useState(1); 
  const [boardTitle , setBoardTitle] = useState("Loading...");


  useEffect(()=>{
    boardClient.getBoard(boardId).then((board) => {
      setBoardTitle(board.title)
    }).catch((err)=>{
      console.error(
        "failed to fetch board!", 
        err,
      )
    })
  },[boardId])

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const user = useAuthStore((st) => st.user);
  if (user === null) {
    return null;
  }
  const zoomIn = () => {
    setScale((current) =>
      Math.min(5, current * 1.1)
    );
  };

  const zoomOut = () => {
    setScale((current) =>
      Math.max(0.2, current / 1.1)
    );
  };

  const fitToScreen = () => {
    setScale(1);
    setPosition({
      x: 0,
      y: 0,
    });
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };


  return (
    <main className="relative h-screen w-screen overflow-hidden bg-paper">
      <BoardHeader
        boardTitle={boardTitle}
        user={user}
        boardId = {boardId}
      />

      <WhiteboardCanvas
        send={send}
        scale={scale}
        position={position}
        setScale={setScale}
        setPosition={setPosition}
      />

      <Toolbar />

      <CanvasControls
        scale={scale}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFit={fitToScreen}
        onFullscreen={toggleFullscreen}
      />
    </main>
  );
}