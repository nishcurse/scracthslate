"use client";

import React from "react";
import { Icon } from "@iconify/react";
import type { Board } from "./types";

type Props = {
  board: Board;
  onDelete: (id: string) => void;
  isRemoving?: boolean;
};

export function BoardCard({ board, onDelete, isRemoving = false }: Props) {
  return (
    <div
      className={`group block border-[3px] border-ink bg-white shadow-brutal btn-brutal transition-all duration-200 ${
        isRemoving ? "scale-[0.95] opacity-0" : "opacity-100"
      }`}
    >
      <div className="grid-bg relative aspect-[16/10] overflow-hidden border-b-[3px] border-ink">
        <div className="absolute inset-0 p-4 opacity-40">
          <div className="h-full w-full border-[2px] border-ink/20" />
        </div>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1">
          <div className="h-4 w-4 rounded-full border-2 border-ink bg-acid animate-pulse" />
          <div className="h-4 w-4 rounded-full bg-ink/20" />
        </div>
      </div>

      <div className="bg-white p-5">
        <div className="mb-4 flex items-start justify-between gap-2">
          <h3 className="font-black uppercase text-lg leading-tight tracking-tight">{board.title}</h3>
          <div className="flex gap-2">
            <button
              aria-label="Rename"
              className="grid h-8 w-8 place-items-center border-2 border-transparent transition-all hover:border-ink hover:bg-acid"
            >
              <Icon icon="ph:pencil-bold" />
            </button>
            <button
              aria-label="Delete"
              onClick={() => onDelete(board.id)}
              className="grid h-8 w-8 place-items-center border-2 border-transparent transition-all hover:border-ink hover:bg-red-500 hover:text-white"
            >
              <Icon icon="ph:trash-bold" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
            {board.updatedAt}
          </span>
          <Icon
            icon="ph:arrow-right-bold"
            className="-translate-x-4 text-xl text-acid opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
