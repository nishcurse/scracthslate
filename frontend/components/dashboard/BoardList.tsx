"use client";

import React from "react";
import { Board } from "./types";
import { BoardCard } from "./BoardCard";
import { EmptyState } from "./EmptyState";

type Props = {
  boards: Board[];
  onDeleteRequested: (id: string) => void;
  removingIds: string[];
};

export function BoardList({ boards, onDeleteRequested, removingIds }: Props) {
  if (!boards || boards.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onDelete={onDeleteRequested}
          isRemoving={removingIds.includes(board.id)}
        />
      ))}
    </div>
  );
}
