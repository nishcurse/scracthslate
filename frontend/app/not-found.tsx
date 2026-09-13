import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
    return (
        <div
            className="flex min-h-screen items-center justify-center overflow-hidden p-8 text-[#2A2A2A]"
            style={{
                backgroundColor: "#FAF9F6",
                backgroundImage: `
                    linear-gradient(
                        to right,
                        rgba(42,42,42,0.05) 1px,
                        transparent 1px
                    ),
                    linear-gradient(
                        to bottom,
                        rgba(42,42,42,0.05) 1px,
                        transparent 1px
                    )
                `,
                backgroundSize: "40px 40px",
            }}
        >
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <Icon
                    icon="ph:scribble-bold"
                    className="absolute left-40 top-20 animate-[scratch-float-scribble_4s_ease-in-out_infinite] text-8xl text-[#2A2A2A]/5"
                />

                <Icon
                    icon="ph:cursor-click-bold"
                    className="absolute bottom-20 right-40 animate-[scratch-bounce-hard_2s_ease-in-out_infinite] text-7xl text-[#2A2A2A]/5"
                />

                <div className="absolute left-20 top-1/2 h-32 w-32 animate-pulse rounded-full border-2 border-[#2A2A2A]/10" />

                <div className="absolute bottom-1/2 right-20 h-48 w-48 animate-[spin_20s_linear_infinite] rotate-12 border-2 border-[#2A2A2A]/10" />
            </div>

            <main className="relative z-10 w-full max-w-2xl">
                <div className="flex flex-col items-center border-[3px] border-[#2A2A2A] bg-[#FAF9F6] p-12 text-center shadow-[8px_8px_0_0_#2A2A2A] md:p-16">
                    <div className="relative mb-8">
                        <h1 className="animate-[scratch-glitch_0.4s_infinite] text-[120px] font-black leading-none tracking-tighter text-[#2A2A2A] [text-shadow:4px_4px_0_#F0FF00,-4px_-4px_0_rgba(42,42,42,0.1)] md:text-[180px]">
                            404
                        </h1>

                        <div className="absolute -right-4 -top-4 rotate-6 bg-[#2A2A2A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[#F0FF00]">
                            ERROR_FOUND
                        </div>
                    </div>

                    <div className="mb-12 space-y-4">
                        <h2 className="text-3xl font-black uppercase tracking-tighter md:text-4xl">
                            Canvas not{" "}
                            <span className="bg-[#F0FF00] px-2">
                                found
                            </span>
                        </h2>

                        <p className="mx-auto max-w-md font-mono text-sm uppercase text-[#2A2A2A]/60 md:text-base">
                            Looks like you sketched on the wrong
                            layer. This page disappeared into the
                            void of unsaved drafts.
                        </p>
                    </div>

                    <div className="mb-12 flex items-center gap-6">
                        <div className="flex h-12 w-12 rotate-12 animate-spin items-center justify-center border-2 border-[#2A2A2A]">
                            <Icon
                                icon="ph:warning-circle-bold"
                                className="text-2xl"
                            />
                        </div>

                        <div className="h-[2px] w-24 bg-[#2A2A2A]/10" />

                        <div className="flex h-12 w-12 -rotate-12 animate-bounce items-center justify-center border-2 border-[#2A2A2A] bg-[#F0FF00]">
                            <Icon
                                icon="ph:selection-all-bold"
                                className="text-2xl"
                            />
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-6 md:flex-row">
                        <Link
                            href="/"
                            className="flex flex-1 items-center justify-center gap-3 bg-[#2A2A2A] py-4 text-lg font-black uppercase tracking-tight text-[#FAF9F6] shadow-[8px_8px_0_0_#2A2A2A] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none"
                        >
                            <Icon icon="ph:arrow-left-bold" />
                            Back to Canvas
                        </Link>

                        <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-3 border-[3px] border-[#2A2A2A] bg-white py-4 text-lg font-black uppercase tracking-tight text-[#2A2A2A] shadow-[4px_4px_0_0_#2A2A2A] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none"
                        >
                            Report Bug
                            <Icon icon="ph:bug-bold" />
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between opacity-40">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                        ScratchSlate / Lost in space
                    </span>

                    <div className="flex gap-2">
                        <div className="h-2 w-2 bg-[#2A2A2A]" />
                        <div className="h-2 w-2 bg-[#F0FF00]" />
                        <div className="h-2 w-2 border border-[#2A2A2A]" />
                    </div>
                </div>
            </main>

            <div className="fixed left-4 top-4 origin-top-left rotate-90 font-mono text-[9px] font-bold text-[#2A2A2A]/20">
                DEBUG_NULL_REFERENCE_X004
            </div>

            <div className="fixed bottom-4 right-4 font-mono text-[9px] font-bold text-[#2A2A2A]/20">
                COORD: 40.7128° N, 74.0060° W
            </div>
        </div>
    );
}