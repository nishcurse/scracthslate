"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useBoardStore } from "@/stores/board-store";

const tools = [
  {
    id: "select",
    label: "SELECT",
    shortcut: "V",
    icon: "ph:cursor-bold",
  },
  {
    id: "pen",
    label: "PEN",
    shortcut: "P",
    icon: "ph:pen-bold",
  },
  {
    id: "text",
    label: "TEXT",
    shortcut: "T",
    icon: "ph:text-t-bold",
  },
  {
    id: "rectangle",
    label: "RECTANGLE",
    shortcut: "R",
    icon: "ph:square-bold",
  },
  {
    id: "ellipse",
    label: "ELLIPSE",
    shortcut: "O",
    icon: "ph:circle-bold",
  },
  {
    id: "line",
    label: "LINE",
    shortcut: "L",
    icon: "ph:arrow-down-right-bold",
  },
  {
    id: "eraser",
    label: "ERASER",
    shortcut: "E",
    icon: "ph:eraser-bold",
  },
] as const;

export default function Toolbar() {
  const activeTool = useBoardStore(
    (state) => state.activetool
  );

  const setActiveTool = useBoardStore(
    (state) => state.setActivetool
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      // Don't change tools while typing
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = event.key.toUpperCase();

      const tool = tools.find(
        (tool) => tool.shortcut === key
      );

      if (!tool) {
        return;
      }

      setActiveTool(tool.id);
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [setActiveTool]);

  return (
    <div className="absolute left-6 top-1/2 z-40 -translate-y-1/2">
      <div className="relative flex flex-col overflow-visible border-[3px] border-ink bg-paper shadow-brutal">
        {tools.map((tool, index) => {
          const active = activeTool === tool.id;

          return (
            <div
              key={tool.id}
              className="group relative"
            >
              <button
                type="button"
                aria-label={`${tool.label} — ${tool.shortcut}`}
                aria-pressed={active}
                onClick={() =>
                  setActiveTool(tool.id)
                }
                className={[
                  "relative flex h-12 w-12 items-center justify-center",
                  "bg-paper",
                  "transition-all duration-100 ease-out",
                  "hover:bg-[#0057FF]/10",
                  "active:scale-95",
                  index !== tools.length - 1
                    ? "border-b-[3px] border-ink"
                    : "",
                  active
                    ? "bg-[#0057FF]/10"
                    : "",
                ].join(" ")}
              >
                {/* Active indicator */}
                <span
                  className={[
                    "absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2",
                    "bg-[#0057FF] transition-opacity duration-150",
                    active
                      ? "opacity-100"
                      : "opacity-0",
                  ].join(" ")}
                />

                {/* Icon */}
                <Icon
                  icon={tool.icon}
                  className={[
                    "text-lg transition-all duration-150",
                    active
                      ? "scale-110 text-[#0057FF]"
                      : "text-ink group-hover:text-[#0057FF] group-hover:scale-105",
                    tool.id === "line"
                      ? "-rotate-45"
                      : "",
                  ].join(" ")}
                />
              </button>

              {/* Hover hint */}
              <div
                className="
                  pointer-events-none
                  invisible
                  absolute
                  left-[60px]
                  top-1/2
                  z-50
                  -translate-y-1/2
                  translate-x-[-4px]
                  whitespace-nowrap
                  border-[2px]
                  border-ink
                  bg-ink
                  px-3
                  py-2
                  font-mono
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-paper
                  opacity-0
                  shadow-brutal-sm
                  transition-all
                  duration-100
                  group-hover:visible
                  group-hover:translate-x-0
                  group-hover:opacity-100
                "
              >
                <span>
                  {tool.label}
                </span>

                <span className="ml-2 text-[#0057FF]">
                  ({tool.shortcut})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}