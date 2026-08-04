interface CodeWindowProps {
    filename: string;
    code: string;
}

export function CodeWindow({
    filename,
    code,
}: CodeWindowProps) {
    return (
        <div className="shadow-brutal-lg overflow-hidden border-[3px] border-ink">
            <div className="flex items-center justify-between bg-ink px-4 py-3">
                <span className="font-mono text-[11px] tracking-wider text-acid">
                    {filename}
                </span>

                <div className="flex gap-1.5">
                    <div className="h-3 w-3 bg-acid" />
                    <div className="h-3 w-3 bg-paper/30" />
                    <div className="h-3 w-3 bg-paper/30" />
                </div>
            </div>

            <pre className="overflow-x-auto bg-paper p-6 font-mono text-[13px] leading-relaxed text-ink">
                <code>{code}</code>
            </pre>
        </div>
    );
}