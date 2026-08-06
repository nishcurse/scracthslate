"use client";

import React from "react";

type Props = {
  open: boolean;
  targetName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmModal({ open, targetName = "item", onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      <div className="relative z-10 w-full max-w-md rounded bg-paper p-6 border-2 border-ink shadow-brutal">
        <h3 className="text-lg font-bold font-display">Confirm delete</h3>
        <p className="mt-2 text-sm font-body">Are you sure you want to delete “{targetName}”?</p>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-1 btn-brutal bg-paper border-2 border-ink">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-3 py-1 btn-brutal bg-acid border-2 border-ink">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
