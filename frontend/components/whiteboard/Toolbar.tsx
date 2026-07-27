"use client"
import { useBoardStore } from "@/stores/board-store"

export default function Toolbar() {
  const activetool = useBoardStore((state) => state.activetool);
  const setActivetool = useBoardStore((state) => state.setActivetool);

  return (
    <div className="absolute left-4 top-4 z-10 flex gap-2">
      <button
        onClick={() => setActivetool("select")}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Select
      </button>

      <button
        onClick={() => setActivetool("pen")}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Pen
      </button>
      <button
        onClick={() => setActivetool("rectangle")}
        className={`rounded-md px-4 py-2 ${activetool === "rectangle"
            ? "bg-black text-white"
            : "bg-white text-black"
          }`}
      >
        Rectangle
      </button>
      <button
        onClick={() => setActivetool("ellipse")}
        className={`rounded-md px-4 py-2 ${activetool === "ellipse"
            ? "bg-black text-white"
            : "bg-white text-black"
          }`}
      >
        Ellipse
      </button>

      <button
        onClick={() => setActivetool("line")}
        className={`rounded-md px-4 py-2 ${activetool === "line"
            ? "bg-black text-white"
            : "bg-white text-black"
          }`}
      >
        Line
      </button>
    </div>
  );
}