"use client";

import React, { useState } from "react";

type Role = "editor" | "viewer";

type Props = {
    open: boolean;
    onInvite: (
        email: string,
        role: Role,
    ) => Promise<void>;
    onClose: () => void;
};

export function ShareBoardModal({
    open,
    onInvite,
    onClose,
}: Props) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<Role>("editor");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!open) return null;

    const handleInvite = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail || loading) return;

        setError("");
        setLoading(true);

        try {
            await onInvite(trimmedEmail, role);

            setEmail("");
            setRole("editor");
            onClose();
        } catch (err : any) { 
            setError(
                err?.response?.data?.detail ||
                "Unable to invite collaborator.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) return;

        setEmail("");
        setRole("editor");
        setError("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={handleClose}
            />

            <div className="relative z-10 w-full max-w-md rounded-none border-[3px] border-ink bg-paper p-6 shadow-brutal">
                <h3 className="mb-3 text-2xl font-black uppercase tracking-tight">
                    Share board
                </h3>

                <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink/50">
                    Invite people to collaborate
                </p>

                {/* Email */}
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
                    Collaborator email
                </label>

                <input
                    autoFocus
                    type="email"
                    value={email}
                    placeholder="ENTER EMAIL..."
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleInvite();
                        }

                        if (event.key === "Escape") {
                            handleClose();
                        }
                    }}
                    className="mt-2 w-full border-[3px] border-ink bg-paper p-3 font-mono text-sm font-bold uppercase tracking-[0.2em] placeholder:text-ink/30 focus:outline-none"
                />

                {/* Role */}
                <label className="mt-5 block font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
                    Access level
                </label>

                <select
                    value={role}
                    disabled={loading}
                    onChange={(event) =>
                        setRole(event.target.value as Role)
                    }
                    className="mt-2 w-full border-[3px] border-ink bg-paper p-3 font-mono text-sm font-bold uppercase tracking-[0.2em] focus:outline-none"
                >
                    <option value="editor">
                        EDITOR
                    </option>

                    <option value="viewer">
                        VIEWER
                    </option>
                </select>

                {/* Error */}
                {error && (
                    <div className="mt-4 border-[3px] border-ink bg-red-400 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
                        {error}
                    </div>
                )}

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className="btn-brutal border-[3px] border-ink bg-paper px-4 py-2 text-sm font-black uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleInvite}
                        disabled={!email.trim() || loading}
                        className={`btn-brutal border-[3px] border-ink px-4 py-2 text-sm font-black uppercase tracking-wide ${email.trim() && !loading
                                ? "bg-acid text-ink"
                                : "bg-acid/40 text-ink/60"
                            }`}
                    >
                        {loading ? "Inviting..." : "Invite"}
                    </button>
                </div>
            </div>
        </div>
    );
}