"use client";

import React, { useState } from "react";

type Props = {
  open: boolean;
  targetName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmModal({
  open,
  targetName = "item",
  onConfirm,
  onCancel,
}: Props) {
  const [confirmation, setConfirmation] = useState("");

  if (!open) return null;

  const isConfirmed =
    confirmation.trim().toUpperCase() ===
    targetName.trim().toUpperCase();

  const handleCancel = () => {
    setConfirmation("");
    onCancel();
  };

  const handleConfirm = () => {
    if (!isConfirmed) return;

    setConfirmation("");
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md border-[3px] border-ink bg-paper p-6 shadow-brutal">
        <h3 className="mb-3 text-2xl font-black uppercase tracking-tight">
          Delete Board
        </h3>

        <p className="font-mono text-[12px] font-bold uppercase leading-relaxed tracking-[0.12em] text-ink/60">
          This action cannot be undone. This will permanently
          delete the board.
        </p>

        <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink/60">
          Type{" "}
          <span className="text-ink">
            {targetName.toUpperCase()}
          </span>{" "}
          to confirm.
        </p>

        <input
          autoFocus
          value={confirmation}
          onChange={(event) =>
            setConfirmation(
              event.target.value.toUpperCase()
            )
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              isConfirmed
            ) {
              handleConfirm();
            }

            if (event.key === "Escape") {
              handleCancel();
            }
          }}
          placeholder={targetName.toUpperCase()}
          className="mt-2 w-full border-[3px] border-ink bg-paper p-3 font-mono text-sm font-bold uppercase tracking-[0.1em] focus:bg-white focus:outline-none"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="btn-brutal border-[3px] border-ink bg-paper px-4 py-2 text-sm font-black uppercase tracking-wide"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!isConfirmed}
            className={`btn-brutal border-[3px] border-ink px-4 py-2 text-sm font-black uppercase tracking-wide ${isConfirmed
                ? "bg-red-500 text-white"
                : "cursor-not-allowed bg-red-500/30 text-ink/40"
              }`}
          >
            Delete Board
          </button>
        </div>
      </div>
    </div>
  );
}