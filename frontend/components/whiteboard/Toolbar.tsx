"use client";

import { Icon } from "@iconify/react";
import { useBoardStore } from "@/stores/board-store";

const tools = [
  {
    id: "select",
    label: "SELECT — V",
    icon: "ph:cursor-bold",
  },
  {
    id: "pen",
    label: "PEN — P",
    icon: "ph:pen-bold",
  },
  {
    id: "rectangle",
    label: "RECTANGLE — R",
    icon: "ph:square-bold",
  },
  {
    id: "ellipse",
    label: "ELLIPSE — O",
    icon: "ph:circle-bold",
  },
  {
    id: "line",
    label: "LINE — L",
    icon: "ph:line-bold",
  },
] as const;

export default function Toolbar() {
  const activeTool = useBoardStore((state) => state.activetool);
  const setActiveTool = useBoardStore((state) => state.setActivetool);

  return (
    <div className="absolute left-6 top-1/2 z-40 flex -translate-y-1/2 flex-col border-[3px] border-ink bg-paper shadow-brutal">
      {tools.map((tool, index) => {
        const active = activeTool === tool.id;

        return (
          <div key={tool.id} className="group relative">
            <button
              type="button"
              aria-label={tool.label}
              onClick={() => setActiveTool(tool.id)}
              className={[
                "flex h-12 w-12 items-center justify-center",
                "transition-all duration-100",
                "active:scale-95",
                index !== tools.length - 1
                  ? "border-b-[3px] border-ink"
                  : "",
                active
                  ? "bg-acid text-ink"
                  : "bg-paper text-ink hover:bg-acid",
              ].join(" ")}
            >
              <Icon icon={tool.icon} className="text-lg" />
            </button>

            {/* Tooltip */}
            <div className="pointer-events-none invisible absolute left-14 top-1/2 z-50 -translate-y-1/2 whitespace-nowrap bg-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-paper opacity-0 transition-all duration-100 group-hover:visible group-hover:opacity-100">
              {tool.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}