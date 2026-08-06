"use client";

import React from "react";
import type { Board } from "./types";

type Props = {
  board: Board;
  onDelete: (id: string) => void;
  onOpen?: (id: string) => void;
};

export function BoardCard({ board, onDelete, onOpen }: Props) {
  return (
    <article className="shadow-brutal p-4 bg-paper border-2 border-ink rounded-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold font-display">{board.title}</h3>
          {board.description && (
            <p className="mt-1 text-sm text-gray-700 font-body">{board.description}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => onOpen?.(board.id)}
            className="btn-brutal px-3 py-1 text-sm bg-ink text-paper"
            aria-label={`Open ${board.title}`}
          >
            Open
          </button>

          <button
            onClick={() => onDelete(board.id)}
            className="btn-brutal px-3 py-1 text-sm border-2 border-ink bg-acid"
            aria-label={`Delete ${board.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
