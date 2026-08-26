"use client";

import React from "react";
import { User } from "@/types/user";

type Props = {
  user: User;
};

export function DashboardHeader({ user }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper">
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6">
        {/* Logo / Title */}
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center bg-ink text-xl font-black text-acid shadow-brutal-sm">
            S
          </div>

          <div className="hidden text-lg font-black uppercase tracking-tight sm:block">
            ScratchSlate{" "}
            <span className="text-ink/30">/</span> Dashboard
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r-[3px] border-ink/10 pr-6">
            {/* User Info */}
            <div className="hidden text-right xs:block">
              <div className="mb-1 text-[13px] font-black uppercase leading-none">
                {user.name}
              </div>

              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50">
                Pro User
              </div>
            </div>

            {/* Profile Picture */}
            <div className="h-10 w-10 overflow-hidden border-[3px] border-ink bg-acid shadow-brutal-sm">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="block h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-lg font-black">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}