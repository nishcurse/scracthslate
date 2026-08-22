"use client";

import React from "react";
import { Icon } from "@iconify/react";

type Props = {
  message?: string;
  newModel: () => void;
};

export function EmptyState({
  message = "No boards yet.",
  newModel,
}: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <div className="relative mb-10 aspect-video w-full max-w-md overflow-hidden border-[3px] border-ink bg-paper shadow-brutal">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-32 w-32 animate-spin items-center justify-center border-[3px] border-dashed border-ink duration-[8s]">
            <Icon
              icon="ph:sketch-logo-bold"
              className="text-5xl text-ink/10"
            />
          </div>
        </div>
      </div>

      <h2 className="mb-1 font-black uppercase text-3xl">
        {message}
      </h2>

      <p className="mb-4 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-ink/50">
        Start creating awesome things today
      </p>

      <p className="mb-8 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-ink/50">
        Think less. create your first project below.
      </p>

      <button
        onClick={newModel}
        className="btn-brutal border-[3px] border-ink bg-acid px-10 py-5 font-black uppercase tracking-wide text-sm text-ink shadow-brutal"
      >
        Create first board
      </button>
    </div>
  );
}