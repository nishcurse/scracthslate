"use client";

import { useEffect, useState } from "react";
import type { Board } from "@/components/dashboard/types";
import { api } from "@/lib/api";

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchBoards() {
    setLoading(true);
    setError(null);
    try {
      const resp = await api.get<Board[]>('/boards');
      setBoards(resp.data || []);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBoard(id: string) {
    // optimistic update
    const prev = boards;
    setBoards((s) => s.filter((b) => b.id !== id));
    try {
      await api.delete(`/boards/${id}`);
    } catch (err) {
      // rollback
      setBoards(prev);
      throw err;
    }
  }

  useEffect(() => {
    fetchBoards();
  }, []);

  return { boards, loading, error, refresh: fetchBoards, deleteBoard } as const;
}
