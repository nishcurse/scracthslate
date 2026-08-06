"use client";

import React, { useState } from "react";
import { useBoards } from "@/hooks/useBoards";
import { BoardList } from "./BoardList";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export default function DeletableBoardsDashboard() {
  const { boards, loading, error, refresh, deleteBoard } = useBoards();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | undefined>(undefined);

  function onDeleteRequested(id: string) {
    const b = boards.find((x) => x.id === id);
    setSelectedId(id);
    setSelectedName(b?.title);
    setConfirmOpen(true);
  }

  async function onConfirmDelete() {
    if (!selectedId) return;
    try {
      await deleteBoard(selectedId);
      setConfirmOpen(false);
      setSelectedId(null);
      setSelectedName(undefined);
    } catch (err) {
      // TODO: surface error to user
      console.error(err);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">Your Boards</h2>
        <div className="text-sm text-gray-600">{loading ? "Loading..." : `${boards.length} boards`}</div>
      </header>

      {error && <div className="mb-4 text-red-600">Failed to load boards</div>}

      <BoardList boards={boards} onDeleteRequested={onDeleteRequested} />

      <DeleteConfirmModal
        open={confirmOpen}
        targetName={selectedName}
        onConfirm={onConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </section>
  );
}
