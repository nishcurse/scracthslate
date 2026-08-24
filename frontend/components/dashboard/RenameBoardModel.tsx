    "use client";

    import React, { useState } from "react";

    type Props = {
        open: boolean;
        currentTitle: string;
        onRename: (title: string) => void;
        onClose: () => void;
    };

    export function RenameBoardModal({
        open,
        currentTitle,
        onRename,
        onClose,
    }: Props) {
        const [title, setTitle] = useState(currentTitle);

        if (!open) return null;

        const handleRename = () => {
            const trimmedTitle = title.trim();

            if (!trimmedTitle) return;

            onRename(trimmedTitle);
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />

                <div className="relative z-10 w-full max-w-md rounded-none border-[3px] border-ink bg-paper p-6 shadow-brutal">
                    <h3 className="mb-3 text-2xl font-black uppercase tracking-tight">
                        Rename board
                    </h3>

                    <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
                        Title
                    </label>

                    <input
                        autoFocus
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleRename();
                            }

                            if (event.key === "Escape") {
                                onClose();
                            }
                        }}
                        className="mt-2 w-full border-[3px] border-ink bg-paper p-3 font-mono text-sm font-bold uppercase tracking-[0.2em] focus:outline-none"
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="btn-brutal border-[3px] border-ink bg-paper px-4 py-2 text-sm font-black uppercase tracking-wide"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleRename}
                            disabled={!title.trim()}
                            className={`btn-brutal border-[3px] border-ink px-4 py-2 text-sm font-black uppercase tracking-wide ${title.trim()
                                    ? "bg-acid text-ink"
                                    : "bg-acid/40 text-ink/60"
                                }`}
                        >
                            Rename board
                        </button>
                    </div>
                </div>
            </div>
        );
    }