"use client";

import React, { useState } from "react";
import { useBoards } from "@/hooks/useBoards";
import { BoardList } from "./BoardList";
import { DashboardHeader } from "./DashboardHeader";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

const user = {
  name: "Mina",
  role: "Product Designer",
  email: "mina@scratchslate.dev",
  workspace: "Studio 01",
};

export default function DeletableBoardsDashboard() {
  const { boards, loading, error, deleteBoard } = useBoards();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | undefined>(undefined);

  function onDeleteRequested(id: string) {
    const board = boards.find((item) => item.id === id);
    setSelectedId(id);
    setSelectedName(board?.title);
    setConfirmOpen(true);
  }

  function onConfirmDelete() {
    if (!selectedId) return;

    deleteBoard(selectedId);
    setConfirmOpen(false);
    setSelectedId(null);
    setSelectedName(undefined);
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <DashboardHeader user={user} boardCount={boards.length} loading={loading} />

      {error && <div className="mb-4 border-[3px] border-ink bg-paper p-3 text-red-600">Failed to load boards</div>}

      <div className="rounded-sm border-[3px] border-ink bg-paper p-4 shadow-brutal">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold font-display">Board library</h3>
            <p className="text-sm font-body text-ink/70">Delete a board to remove it from the workspace.</p>
          </div>
        </div>

        <BoardList boards={boards} onDeleteRequested={onDeleteRequested} />
      </div>

      <DeleteConfirmModal
        open={confirmOpen}
        targetName={selectedName}
        onConfirm={onConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </section>
  );
}
