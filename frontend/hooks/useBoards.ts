"use client";

import { useState } from "react";
import type { Board } from "@/components/dashboard/types";

const seedBoards: Board[] = [
  {
    id: "board-01",
    title: "System Architecture v2",
    updatedAt: "Updated 2h ago",
  },
  {
    id: "board-02",
    title: "Brainstorming Session",
    updatedAt: "Updated Yesterday",
  },
  {
    id: "board-03",
    title: "Marketing Flow",
    updatedAt: "Updated 4d ago",
  },
];

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>(seedBoards);

  function deleteBoard(id: string) {
    setBoards((current) => current.filter((board) => board.id !== id));
  }

  function createBoard(title: string) {
    const id = `board-${Date.now()}`;
    const nowLabel = "Updated just now";
    const newBoard: Board = { id, title, updatedAt: nowLabel };
    setBoards((current) => [newBoard, ...current]);
    return newBoard;
  }

  return { boards, deleteBoard, createBoard } as const;
}
