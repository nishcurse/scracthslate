export function ArchitectureDiagram() {
    return (
        <svg
            className="absolute inset-0 h-full w-full p-4 md:p-8"
            viewBox="0 0 1000 400"
            preserveAspectRatio="xMidYMid meet"
        >
            <rect
                x="120"
                y="100"
                width="180"
                height="120"
                fill="none"
                stroke="#000"
                strokeWidth="3"
            />

            <circle
                cx="500"
                cy="200"
                r="80"
                fill="none"
                stroke="#000"
                strokeWidth="3"
            />

            <rect
                x="720"
                y="150"
                width="200"
                height="150"
                fill="none"
                stroke="#000"
                strokeWidth="3"
            />

            <line
                x1="300"
                y1="160"
                x2="420"
                y2="180"
                stroke="#000"
                strokeWidth="2"
                strokeDasharray="8 4"
            />

            <line
                x1="580"
                y1="200"
                x2="720"
                y2="225"
                stroke="#000"
                strokeWidth="2"
            />

            <text
                x="120"
                y="90"
                fontFamily="var(--font-space-mono), monospace"
                fontSize="12"
                fontWeight="700"
                fill="#000"
                opacity="0.5"
            >
                NODE_01
            </text>

            <text
                x="720"
                y="140"
                fontFamily="var(--font-space-mono), monospace"
                fontSize="12"
                fontWeight="700"
                fill="#000"
                opacity="0.5"
            >
                PROTOTYPE_V2
            </text>

            <line
                x1="120"
                y1="235"
                x2="300"
                y2="235"
                stroke="#000"
                strokeWidth="1"
                opacity="0.3"
            />

            <path
                d="M120 230 V240 M300 230 V240"
                stroke="#000"
                strokeWidth="1"
                opacity="0.3"
            />

            <text
                x="210"
                y="255"
                textAnchor="middle"
                fontFamily="var(--font-space-mono), monospace"
                fontSize="10"
                fill="#000"
                opacity="0.3"
            >
                180px
            </text>
        </svg>
    );
}