"use client";

import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useBoards } from "@/board/useBoards";
import { BoardList } from "./BoardList";
import { DashboardHeader } from "./DashboardHeader";
import { NewBoardModal } from "./NewBoardModal";
import {useAuthStore} from "@/stores/auth-store"
import {useRouter} from "next/navigation"
import {RenameBoardModal} from "./RenameBoardModel"
import { DeleteConfirmModal } from "./DeleteConfirmModal" 
import type {Board} from "./types"


export default function DeletableBoardsDashboard() {
  const { boards, deleteBoard, createBoard , loading , renameBoard } = useBoards();
  const [searchValue, setSearchValue] = useState("");
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const router = useRouter();
  const [boardToRename, setBoardToRename] = useState<Board | null>(null);
  const [boardToDelete, setBoardToDelete] = useState<Board | null>(null); 

  const filteredBoards = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return boards;

    return boards.filter((board) => board.title.toLowerCase().includes(query));
  }, [boards, searchValue]);

  function onRenameRequested(board: Board) {
    setBoardToRename(board);
  }

  function onDeleteRequested(id: string) {
    const board = boards.find((board) => board.id === id);

    if (!board) return;

    setBoardToDelete(board);
  }
  const {user} = useAuthStore();
  if(user === null) return null; 
  
  async function handleDeleteConfirmed() {
    if (!boardToDelete) return;

    const id = boardToDelete.id;

    setBoardToDelete(null);
    setRemovingIds((current) => [...current, id]);

    try {
      await deleteBoard(id);
    } finally {
      setRemovingIds((current) =>
        current.filter((boardId) => boardId !== id)
      );
    }
  }
  function StartNewModal(){
    setNewModalOpen(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <DashboardHeader user={user} />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 py-6 sm:px-10 sm:py-10">
        <section className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex-1">
            <h1 className="mb-4 font-black uppercase text-4xl leading-[0.9] tracking-tight sm:text-6xl">
              My Boards
            </h1>
            <div className="group relative max-w-xl">
              <label
                htmlFor="search-boards"
                className="absolute -top-3 left-4 bg-paper px-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50 group-focus-within:text-ink"
              >
                Search / Boards
              </label>
              <input
                id="search-boards"
                type="text"
                placeholder="FIND A PROJECT..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="w-full border-[3px] border-ink bg-paper p-4 font-mono text-sm font-bold uppercase tracking-[0.2em] shadow-brutal-sm transition-colors focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="shrink-0">
            <button onClick={StartNewModal} className="btn-brutal flex items-center gap-3 border-[3px] border-ink bg-acid px-8 py-4 font-black uppercase tracking-wide text-base text-ink shadow-brutal">
              <Icon icon="ph:plus-bold" className="text-xl" />
              New Board
            </button>
          </div>
        </section>

        <section id="boards-container" className="flex-1">
          {filteredBoards.length > 0 ? (
            <BoardList boards={filteredBoards} onDeleteRequested={onDeleteRequested} removingIds={removingIds} loading={loading} onRenameRequested={onRenameRequested} newModal={StartNewModal}/>
          ) : (
            <div className="flex h-full flex-col">
                <BoardList boards={[]} onDeleteRequested={onDeleteRequested} removingIds={removingIds} loading={loading} onRenameRequested={onRenameRequested} newModal={StartNewModal} />
            </div>
          )}
        </section>
      </main>

      <footer className="mt-auto border-t-[3px] border-ink bg-paper px-6 py-8">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="grid h-6 w-6 place-items-center bg-ink text-[10px] font-black text-acid shadow-brutal-sm">
              S
            </div>
            <span className="font-black uppercase text-xs tracking-tight">ScratchSlate Dashboard</span>
          </div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/30">
            Status: Syncing Live / v1.0.42
          </div>
        </div>
      </footer>

      <NewBoardModal
        open={newModalOpen}
        onCreate={async (title) => {
          const board = await createBoard(title);

          setNewModalOpen(false);

          router.push(`/board/${board.id}`);
        }}
        onClose={() => setNewModalOpen(false)}
      />
      <RenameBoardModal
        key={boardToRename?.id}
        open={boardToRename !== null}
        currentTitle={boardToRename?.title ?? ""}
        onRename={async (title) => {
          if (!boardToRename) return;

          await renameBoard(
            boardToRename.id,
            title,
          );

          setBoardToRename(null);
        }}
        onClose={() => setBoardToRename(null)}
      />
      <DeleteConfirmModal
        open={boardToDelete !== null}
        targetName={boardToDelete?.title}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setBoardToDelete(null)}
      />
    </div>
  );
}
