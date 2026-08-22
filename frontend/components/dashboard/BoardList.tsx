"use client";

import React from "react";

import { Board } from "./types";

import { BoardCard } from "./BoardCard";
import { EmptyState } from "./EmptyState";

type Props = {
  boards: Board[];
  loading: boolean;
  onDeleteRequested: (id: string) => void;
  removingIds: string[];
  onRenameRequested: (board : Board) => void;
  newModal : () => void;
};

export function BoardList({
  boards,
  loading,
  onDeleteRequested,
  removingIds,
  onRenameRequested,
  newModal,
}: Props) {
  if (loading || boards.length === 0) {
    return <EmptyState newModel={newModal}/>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onDelete={onDeleteRequested}
          onRename={onRenameRequested}
          isRemoving={removingIds.includes(board.id)}
        />
      ))}
    </div>
  );
}