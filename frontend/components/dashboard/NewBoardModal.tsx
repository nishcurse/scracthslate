"use client";

import React, { useState } from "react";

type Props = {
  open: boolean;
  onCreate: (title: string) => void;
  onClose: () => void;
};

export function NewBoardModal({ open, onCreate, onClose }: Props) {
  const [title, setTitle] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate(title.trim());
    setTitle("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-none bg-paper p-6 border-[3px] border-ink shadow-brutal">
        <h3 className="mb-3 text-2xl font-black uppercase tracking-tight">Create board</h3>

        <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Marketing Plan"
          className="mt-2 w-full border-[3px] border-ink bg-paper p-3 font-mono text-sm font-bold uppercase tracking-[0.2em] focus:outline-none"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-brutal border-[3px] border-ink bg-paper px-4 py-2 text-sm font-black uppercase tracking-wide"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={!title.trim()}
            className={`btn-brutal border-[3px] border-ink px-4 py-2 text-sm font-black uppercase tracking-wide ${
              title.trim() ? "bg-acid text-ink" : "bg-acid/40 text-ink/60"
            }`}
          >
            Create board
          </button>
        </div>
      </div>
    </div>
  );
}
