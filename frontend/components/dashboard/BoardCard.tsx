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
    <article className="rounded-sm border-[3px] border-ink bg-paper p-4 shadow-brutal">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold font-display">{board.title}</h3>
            <span className="border-[2px] border-ink bg-acid px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
              {board.status ?? "draft"}
            </span>
          </div>

          {board.description && (
            <p className="mt-2 text-sm leading-relaxed text-ink/70 font-body">{board.description}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.2em] font-mono text-ink/70">
            <span>{board.members ?? 0} members</span>
            <span>{board.createdAt ?? "just now"}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => onOpen?.(board.id)}
            className="btn-brutal border-[2px] border-ink bg-ink px-3 py-1 text-sm font-bold text-paper"
            aria-label={`Open ${board.title}`}
          >
            Open
          </button>

          <button
            onClick={() => onDelete(board.id)}
            className="btn-brutal border-[2px] border-ink bg-acid px-3 py-1 text-sm font-bold"
            aria-label={`Delete ${board.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
