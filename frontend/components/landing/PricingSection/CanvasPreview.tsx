import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Cursor } from "./Cursor";

export function CanvasPreview() {
    return (
        <div className="shadow-brutal relative aspect-[4/3] w-full overflow-hidden border-[3px] border-ink bg-paper md:aspect-[21/9]">
            <div className="relative h-full w-full border-[3px] border-ink bg-white/50">
                <div className="grid-bg absolute inset-0 opacity-30" />

                <ArchitectureDiagram />

                <Cursor
                    name="Designer"
                    variant="designer"
                    className="left-[42%] top-[35%] -rotate-6"
                />

                <Cursor
                    name="Developer"
                    variant="developer"
                    className="bottom-[30%] right-[25%] rotate-12"
                />
            </div>
        </div>
    );
}