'use client';

import { useState } from 'react';
import { RouletteWheel } from './components/RouletteWheel';
import { SegmentEditor } from './components/SegmentEditor';
import { WinnerBanner } from './components/WinnerBanner';

const SEGMENT_COLORS = [
  '#FFB3BA',
  '#BAFFC9',
  '#BAE1FF',
  '#E8BAFF',
  '#FFDFBA',
  '#FFFFBA',
  '#FFB3DE',
  '#B5EAD7',
];

const DEFAULT_SEGMENTS = [
  '1등 🏆',
  '꽝 💀',
  '2등 🥈',
  '다시 🔄',
  '3등 🥉',
  '꽝 💀',
  '보너스 ⭐',
  '꽝 💀',
];

export default function Page() {
  const [segments, setSegments] = useState<string[]>(DEFAULT_SEGMENTS);
  const [winner, setWinner] = useState<{ text: string; index: number } | null>(null);

  function handleWinner(text: string, index: number) {
    setWinner({ text, index });
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      {/* Background decorative dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? 6 : 4,
              height: i % 5 === 0 ? 6 : 4,
              background: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#E8BAFF', '#FFDFBA'][i % 5],
              left: `${(i * 19.7 + 3) % 100}%`,
              top: `${(i * 13.3 + 7) % 100}%`,
              opacity: 0.25,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="mb-10 text-center relative z-10">
        <div
          className="text-xs tracking-[0.5em] uppercase mb-2"
          style={{ color: '#C9A9E9', fontFamily: 'var(--font-cinzel)' }}
        >
          ✦ ✦ ✦
        </div>
        <h1
          className="text-5xl md:text-6xl font-black leading-none"
          style={{
            fontFamily: 'var(--font-cinzel)',
            background: 'linear-gradient(180deg, #E8BAFF 0%, #C9A9E9 40%, #9B72CF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.05em',
          }}
        >
          Cat Roulette
        </h1>
        <div
          className="text-xs tracking-[0.5em] uppercase mt-2"
          style={{ color: '#C9A9E9', fontFamily: 'var(--font-cinzel)' }}
        >
          ✦ ✦ ✦
        </div>
        <p
          className="mt-3 text-sm"
          style={{ color: '#8A8A9A', fontFamily: 'var(--font-cinzel)' }}
        >
          행운을 시험해 보세요
        </p>
      </header>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start w-full max-w-5xl relative z-10">
        <div className="flex-1 flex justify-center">
          <RouletteWheel segments={segments} onWinner={handleWinner} />
        </div>
        <div className="flex-shrink-0 w-full max-w-xs">
          <SegmentEditor segments={segments} onChange={setSegments} />
        </div>
      </div>

      {/* Footer */}
      <footer
        className="mt-12 text-xs relative z-10"
        style={{ color: '#C9C9D9', fontFamily: 'var(--font-cinzel)' }}
      >
        © Cat Roulette
      </footer>

      {/* Winner banner */}
      {winner && (
        <WinnerBanner
          winner={winner.text}
          color={SEGMENT_COLORS[winner.index % SEGMENT_COLORS.length]}
          onClose={() => setWinner(null)}
        />
      )}
    </main>
  );
}
