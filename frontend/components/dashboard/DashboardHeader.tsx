"use client";

import React from "react";
import Image from "next/image";
import type { DashboardUser } from "./types";

type Props = {
  user: DashboardUser;
};

export function DashboardHeader({ user }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper">
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center bg-ink text-xl font-black text-acid shadow-brutal-sm">
            S
          </div>
          <div className="hidden text-lg font-black uppercase tracking-tight sm:block">
            ScratchSlate <span className="text-ink/30">/</span> Dashboard
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r-[3px] border-ink/10 pr-6">
            <div className="hidden text-right xs:block">
              <div className="mb-1 text-[13px] font-black uppercase leading-none">{user.name} 👋</div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50">
                {user.role}
              </div>
            </div>
            <div className="h-10 w-10 overflow-hidden border-[3px] border-ink bg-acid shadow-brutal-sm">
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt="Avatar"
                width={40}
                height={40}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <button className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
