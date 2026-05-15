'use client';

import { useRef, useState } from 'react';
import { WheelSegment } from './WheelSegment';

const SEGMENT_COLORS = [
  '#8B0000', // deep red
  '#1B4332', // dark green
  '#1A237E', // deep blue
  '#4A148C', // deep purple
  '#BF360C', // dark orange-red
  '#004D40', // dark teal
  '#0D47A1', // royal blue
  '#880E4F', // dark pink
];

const NUM_SEGMENTS = 8;
const SEGMENT_ANGLE = 360 / NUM_SEGMENTS;

interface RouletteWheelProps {
  segments: string[];
  onWinner: (winner: string, index: number) => void;
}

function buildSegmentPath(i: number): string {
  const startAngle = (i / NUM_SEGMENTS) * 2 * Math.PI;
  const endAngle = ((i + 1) / NUM_SEGMENTS) * 2 * Math.PI;
  const x1 = Math.cos(startAngle);
  const y1 = Math.sin(startAngle);
  const x2 = Math.cos(endAngle);
  const y2 = Math.sin(endAngle);
  return `M 0 0 L ${x1} ${y1} A 1 1 0 0 1 ${x2} ${y2} Z`;
}

function buildLabelPosition(i: number): { x: number; y: number; angle: number } {
  const midAngle = ((i + 0.5) / NUM_SEGMENTS) * 2 * Math.PI;
  const r = 0.65;
  return {
    x: Math.cos(midAngle) * r,
    y: Math.sin(midAngle) * r,
    angle: ((i + 0.5) / NUM_SEGMENTS) * 360,
  };
}

export function RouletteWheel({ segments, onWinner }: RouletteWheelProps) {
  const rotationRef = useRef(0);
  const [cssRotation, setCssRotation] = useState(-90);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  function spin() {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinnerIndex(null);

    const extraSpins = 360 * (5 + Math.floor(Math.random() * 6));
    const randomOffset = Math.random() * 360;
    const newRotation = rotationRef.current + extraSpins + randomOffset;
    rotationRef.current = newRotation;
    setCssRotation(newRotation - 90);

    const normalized = ((newRotation % 360) + 360) % 360;
    const idx = Math.floor(((360 - normalized) % 360) / SEGMENT_ANGLE) % NUM_SEGMENTS;

    setTimeout(() => {
      setIsSpinning(false);
      setWinnerIndex(idx);
      onWinner(segments[idx], idx);
    }, 4200);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className="relative"
        style={{ '--wheel-size': 'min(400px, 85vw)' } as React.CSSProperties}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: '0 0 40px rgba(255,215,0,0.4), 0 0 80px rgba(255,215,0,0.15), inset 0 0 40px rgba(255,215,0,0.05)',
            borderRadius: '50%',
          }}
        />

        {/* Gold border ring */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-6px',
            border: '6px solid',
            borderColor: '#FFD700',
            borderRadius: '50%',
            boxShadow: '0 0 20px #FFD700, inset 0 0 20px rgba(255,215,0,0.1)',
          }}
        />

        {/* Inner decorative ring */}
        <div
          className="absolute rounded-full pointer-events-none z-10"
          style={{
            inset: '2px',
            border: '3px solid rgba(255,215,0,0.3)',
            borderRadius: '50%',
          }}
        />

        {/* Spinning wheel */}
        <div
          style={{
            transform: `rotate(${cssRotation}deg)`,
            transition: isSpinning
              ? 'transform 4.2s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
              : 'none',
            width: 'var(--wheel-size)',
            height: 'var(--wheel-size)',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="-1.05 -1.05 2.1 2.1"
            width="100%"
            height="100%"
          >
            {segments.map((label, i) => {
              const pos = buildLabelPosition(i);
              return (
                <WheelSegment
                  key={i}
                  index={i}
                  path={buildSegmentPath(i)}
                  fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                  label={label}
                  labelX={pos.x}
                  labelY={pos.y}
                  labelAngle={pos.angle}
                />
              );
            })}
            {/* Center circle */}
            <circle cx="0" cy="0" r="0.12" fill="#1a1a2e" stroke="#FFD700" strokeWidth="0.025" />
            <circle cx="0" cy="0" r="0.06" fill="#FFD700" />
          </svg>
        </div>

        {/* Pointer (top center, fixed) */}
        <div
          className="absolute pointer-events-none z-20"
          style={{
            top: -18,
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'drop-shadow(0 0 6px #FFD700)',
          }}
        >
          <svg width="28" height="42" viewBox="0 0 28 42">
            <polygon
              points="14,40 1,2 27,2"
              fill="#FFD700"
              stroke="#B8860B"
              strokeWidth="1"
            />
            <polygon
              points="14,36 5,6 23,6"
              fill="#FFF8DC"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="relative px-14 py-5 rounded-full font-black text-xl tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 select-none"
        style={{
          background: isSpinning
            ? 'linear-gradient(180deg, #B8860B 0%, #8B6914 100%)'
            : 'linear-gradient(180deg, #FFD700 0%, #B8860B 100%)',
          color: '#1a0a00',
          fontFamily: 'var(--font-cinzel)',
          animation: isSpinning ? 'none' : 'pulse-glow 2s ease-in-out infinite',
          boxShadow: isSpinning
            ? '0 4px 15px rgba(0,0,0,0.5)'
            : '0 0 20px rgba(255,215,0,0.6), 0 4px 15px rgba(0,0,0,0.3)',
          transform: isSpinning ? 'scale(0.97)' : 'scale(1)',
        }}
      >
        {isSpinning ? '🎰 Spinning...' : '🎲 SPIN'}
      </button>
    </div>
  );
}
