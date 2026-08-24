"use client";

import { Icon } from "@iconify/react";

type Props = {
    scale: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onFit: () => void;
    onFullscreen: () => void;
};

export default function CanvasControls({
    scale,
    onZoomIn,
    onZoomOut,
    onFit,
    onFullscreen,
}: Props) {
    return (
        <div className="absolute bottom-8 left-8 z-40 flex items-center border-[3px] border-ink bg-paper shadow-brutal">

            {/* Zoom Out */}
            <button
                type="button"
                aria-label="Zoom out"
                onClick={onZoomOut}
                className="grid h-10 w-10 place-items-center border-r-[3px] border-ink bg-paper text-ink transition-colors hover:bg-acid active:translate-x-[1px] active:translate-y-[1px]"
            >
                <Icon
                    icon="ph:minus-bold"
                    className="text-base"
                />
            </button>

            {/* Zoom Level */}
            <div className="grid h-10 min-w-[72px] place-items-center border-r-[3px] border-ink bg-paper px-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]">
                    {Math.round(scale * 100)}%
                </span>
            </div>

            {/* Zoom In */}
            <button
                type="button"
                aria-label="Zoom in"
                onClick={onZoomIn}
                className="grid h-10 w-10 place-items-center border-r-[3px] border-ink bg-paper text-ink transition-colors hover:bg-acid active:translate-x-[1px] active:translate-y-[1px]"
            >
                <Icon
                    icon="ph:plus-bold"
                    className="text-base"
                />
            </button>

            {/* Fit */}
            <button
                type="button"
                onClick={onFit}
                className="h-10 border-r-[3px] border-ink bg-paper px-4 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-acid active:translate-x-[1px] active:translate-y-[1px]"
            >
                Fit
            </button>

            {/* Fullscreen */}
            <button
                type="button"
                aria-label="Fullscreen"
                onClick={onFullscreen}
                className="grid h-10 w-10 place-items-center bg-paper text-ink transition-colors hover:bg-acid active:translate-x-[1px] active:translate-y-[1px]"
            >
                <Icon
                    icon="ph:corners-out-bold"
                    className="text-base"
                />
            </button>
        </div>
    );
}