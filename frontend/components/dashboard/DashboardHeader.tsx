"use client";

import React from "react";
import type { DashboardUser } from "./types";

type Props = {
  user: DashboardUser;
  boardCount: number;
  loading: boolean;
};

export function DashboardHeader({ user, boardCount, loading }: Props) {
  return (
    <div className="mb-6 border-[3px] border-ink bg-acid p-5 shadow-brutal">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-ink/70">
            Workspace overview
          </p>
          <h2 className="mt-2 text-2xl font-bold font-display">Welcome back, {user.name}</h2>
          <p className="mt-2 max-w-[55ch] text-sm font-body text-ink/80">
            {user.role} • {user.email}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="border-[3px] border-ink bg-paper px-3 py-2 text-sm font-bold font-display">
            {loading ? "Loading boards..." : `${boardCount} boards`}
          </div>
          <div className="border-[3px] border-ink bg-paper px-3 py-2 text-sm font-bold font-display">
            {user.workspace}
          </div>
        </div>
      </div>
    </div>
  );
}
