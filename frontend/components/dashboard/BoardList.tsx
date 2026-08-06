"use client";

import React from "react";
import { Board } from "./types";
import { BoardCard } from "./BoardCard";
import { EmptyState } from "./EmptyState";

type Props = {
  boards: Board[];
  onDeleteRequested: (id: string) => void;
  onOpen?: (id: string) => void;
};

export function BoardList({ boards, onDeleteRequested, onOpen }: Props) {
  if (!boards || boards.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map((b) => (
        <BoardCard key={b.id} board={b} onDelete={onDeleteRequested} onOpen={onOpen} />
      ))}
    </div>
  );
}
