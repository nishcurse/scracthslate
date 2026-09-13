"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function Loading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 10000;
        let startTime: number | null = null;
        let frame: number;

        const animate = (timestamp: number) => {
            if (startTime === null) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;
            const current =
                ((elapsed % duration) / duration) * 100;

            setProgress(current);

            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frame);
        };
    }, []);

    const currentMB =
        ((progress / 100) * 12).toFixed(1);

    return (
        <div
            className="flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF9F6]"
            style={{
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
            <div className="relative flex flex-col items-center">
                <div className="relative border-[3px] border-[#2A2A2A] bg-[#FAF9F6] p-12 shadow-[4px_4px_0_0_#2A2A2A] md:p-20">
                    <div className="absolute left-4 top-4">
                        <span className="font-mono text-xs uppercase tracking-tighter text-[#2A2A2A]/30">
                            ScratchSlate / v1.0.4
                        </span>
                    </div>

                    <div className="relative flex h-[280px] w-[280px] items-center justify-center border-2 border-[#2A2A2A]/10 bg-white/40 md:h-[350px] md:w-[350px]">
                        <svg
                            className="h-full w-full"
                            viewBox="0 0 200 200"
                        >
                            <path
                                className="scratch-loader-draw"
                                d="M40 100 Q 60 40 100 100 T 160 100"
                                fill="none"
                                stroke="#2A2A2A"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />

                            <path
                                className="scratch-loader-draw"
                                style={{
                                    animationDelay: "0.5s",
                                }}
                                d="M50 140 Q 100 160 150 140"
                                fill="none"
                                stroke="#F0FF00"
                                strokeWidth="6"
                                strokeLinecap="round"
                            />

                            <rect
                                className="scratch-loader-draw"
                                style={{
                                    animationDelay: "1s",
                                }}
                                x="70"
                                y="60"
                                width="60"
                                height="60"
                                fill="none"
                                stroke="#2A2A2A"
                                strokeWidth="3"
                            />

                            <circle
                                className="scratch-loader-draw"
                                style={{
                                    animationDelay: "1.5s",
                                }}
                                cx="100"
                                cy="100"
                                r="80"
                                fill="none"
                                stroke="#2A2A2A"
                                strokeWidth="1.5"
                                strokeDasharray="10 10"
                            />
                        </svg>

                        <div className="pointer-events-none absolute left-10 top-10 scratch-loader-float">
                            <Icon
                                icon="ph:pencil-line-bold"
                                className="rotate-[135deg] text-4xl text-[#2A2A2A]"
                            />

                            <div className="absolute -bottom-2 -right-2 border border-[#2A2A2A] bg-[#F0FF00] px-1">
                                <span className="font-mono text-[8px] font-bold">
                                    SYSTEM
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 w-full text-center">
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="font-black text-2xl uppercase tracking-tighter text-[#2A2A2A]">
                                Preparing{" "}
                                <span className="bg-[#2A2A2A] px-2 text-[#F0FF00]">
                                    Canvas
                                </span>
                            </h2>

                            <div className="flex items-center gap-3 font-mono text-sm font-bold text-[#2A2A2A]/60">
                                <span>
                                    INITIALIZING WORKSPACE
                                </span>

                                <div className="flex gap-1">
                                    <span className="scratch-loader-blink">
                                        .
                                    </span>
                                    <span
                                        className="scratch-loader-blink"
                                        style={{
                                            animationDelay:
                                                "0.2s",
                                        }}
                                    >
                                        .
                                    </span>
                                    <span
                                        className="scratch-loader-blink"
                                        style={{
                                            animationDelay:
                                                "0.4s",
                                        }}
                                    >
                                        .
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-8 h-4 w-full overflow-hidden border-2 border-[#2A2A2A] bg-white">
                            <div
                                className="absolute left-0 top-0 h-full border-r-2 border-[#2A2A2A] bg-[#F0FF00]"
                                style={{
                                    width: `${progress}%`,
                                }}
                            >
                                <div
                                    className="h-full w-full opacity-20"
                                    style={{
                                        backgroundImage:
                                            "repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-2 flex justify-between">
                            <span className="font-mono text-[10px] text-[#2A2A2A]/40">
                                PACKETS: {currentMB}MB / 12MB
                            </span>

                            <span className="font-mono text-[10px] font-bold text-[#2A2A2A]">
                                {Math.floor(progress)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <div className="bg-[#2A2A2A] px-4 py-1 font-mono text-xs uppercase tracking-widest text-[#FAF9F6]">
                        High Performance
                    </div>

                    <div className="border-2 border-[#2A2A2A] bg-[#F0FF00] px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[#2A2A2A]">
                        Real-time Sync
                    </div>
                </div>
            </div>

            <div className="fixed left-4 top-4 h-8 w-8 border-l-[3px] border-t-[3px] border-[#2A2A2A]" />
            <div className="fixed right-4 top-4 h-8 w-8 border-r-[3px] border-t-[3px] border-[#2A2A2A]" />
            <div className="fixed bottom-4 left-4 h-8 w-8 border-b-[3px] border-l-[3px] border-[#2A2A2A]" />
            <div className="fixed bottom-4 right-4 h-8 w-8 border-b-[3px] border-r-[3px] border-[#2A2A2A]" />

            <style jsx>{`
                .scratch-loader-draw {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: scratch-draw 4s
                        cubic-bezier(0.65, 0, 0.35, 1)
                        infinite;
                    opacity: 0;
                }

                .scratch-loader-float {
                    animation: scratch-float 4s
                        ease-in-out infinite;
                }

                .scratch-loader-blink {
                    animation: scratch-blink 1.5s infinite;
                }

                @keyframes scratch-draw {
                    0% {
                        stroke-dashoffset: 1000;
                        opacity: 0;
                    }

                    10% {
                        opacity: 1;
                    }

                    50% {
                        stroke-dashoffset: 0;
                    }

                    90% {
                        opacity: 1;
                    }

                    100% {
                        stroke-dashoffset: 0;
                        opacity: 0;
                    }
                }

                @keyframes scratch-float {
                    0%,
                    100% {
                        transform: translate(0, 0)
                            rotate(-10deg);
                    }

                    50% {
                        transform: translate(100px, 80px)
                            rotate(5deg);
                    }
                }

                @keyframes scratch-blink {
                    0%,
                    100% {
                        opacity: 1;
                    }

                    50% {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}