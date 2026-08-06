"use client";

import { useEffect, useState } from "react";
import type { Board } from "@/components/dashboard/types";

const seedBoards: Board[] = [
  {
    id: "board-1",
    title: "Sprint planning",
    description: "Capture goals, decisions, and next steps before the week begins.",
    createdAt: "2h ago",
    status: "review",
    members: 4,
  },
  {
    id: "board-2",
    title: "Design critique",
    description: "Collect feedback and lock the next visual direction for the dashboard.",
    createdAt: "1d ago",
    status: "draft",
    members: 3,
  },
  {
    id: "board-3",
    title: "Product launch",
    description: "Track rollout notes, owner hand-offs, and customer-facing updates.",
    createdAt: "3d ago",
    status: "published",
    members: 7,
  },
];

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  function refresh() {
    setLoading(true);
    setError(null);

    window.setTimeout(() => {
      setBoards(seedBoards);
      setLoading(false);
    }, 350);
  }

  function deleteBoard(id: string) {
    setBoards((current) => current.filter((board) => board.id !== id));
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBoards(seedBoards);
      setLoading(false);
      setError(null);
    }, 350);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return { boards, loading, error, refresh, deleteBoard } as const;
}
