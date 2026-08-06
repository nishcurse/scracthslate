"use client";

import React from "react";

export function EmptyState({ message = "No boards yet." }: { message?: string }) {
  return (
    <div className="p-12 text-center text-gray-700">
      <p className="text-xl font-bold font-display">{message}</p>
      <p className="mt-2 text-sm font-body">Create a board to get started.</p>
    </div>
  );
}
