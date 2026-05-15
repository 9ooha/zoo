interface WheelSegmentProps {
  path: string;
  fill: string;
  label: string;
  labelX: number;
  labelY: number;
  labelAngle: number;
  index: number;
}

export function WheelSegment({ path, fill, label, labelX, labelY, labelAngle, index }: WheelSegmentProps) {
  const lines = splitLabel(label);

  return (
    <g>
      <path
        d={path}
        fill={fill}
        stroke="#0a0a1a"
        strokeWidth="0.015"
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={labelX}
          y={labelY + (i - (lines.length - 1) / 2) * 0.14}
          fontSize="0.105"
          fill="#FFD700"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${labelAngle}, ${labelX}, ${labelY})`}
          fontFamily="var(--font-cinzel)"
          fontWeight="bold"
          style={{ textShadow: "0 0 4px rgba(0,0,0,0.8)" }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function splitLabel(label: string): string[] {
  if (label.length <= 8) return [label];
  const mid = Math.ceil(label.length / 2);
  const spaceIdx = label.indexOf(" ", mid - 3);
  if (spaceIdx > 0 && spaceIdx < label.length - 1) {
    return [label.slice(0, spaceIdx), label.slice(spaceIdx + 1)];
  }
  return [label.slice(0, mid), label.slice(mid)];
}
