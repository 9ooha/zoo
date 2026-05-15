'use client';

const SEGMENT_COLORS = [
  '#8B0000',
  '#1B4332',
  '#1A237E',
  '#4A148C',
  '#BF360C',
  '#004D40',
  '#0D47A1',
  '#880E4F',
];

interface SegmentEditorProps {
  segments: string[];
  onChange: (segments: string[]) => void;
}

export function SegmentEditor({ segments, onChange }: SegmentEditorProps) {
  function handleChange(index: number, value: string) {
    const next = [...segments];
    next[index] = value;
    onChange(next);
  }

  return (
    <div
      className="rounded-2xl p-6 w-full max-w-xs"
      style={{
        background: 'linear-gradient(135deg, #0d0d1f 0%, #1a1a2e 100%)',
        border: '1px solid rgba(255,215,0,0.25)',
        boxShadow: '0 0 40px rgba(255,215,0,0.05), inset 0 1px 0 rgba(255,215,0,0.1)',
      }}
    >
      <h2
        className="text-lg font-bold mb-5 text-center tracking-wider"
        style={{
          fontFamily: 'var(--font-cinzel)',
          color: '#FFD700',
          textShadow: '0 0 10px rgba(255,215,0,0.5)',
        }}
      >
        ✦ Edit Segments ✦
      </h2>

      <div className="flex flex-col gap-3">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Color swatch */}
            <div
              className="flex-shrink-0 w-5 h-5 rounded-sm"
              style={{
                backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
                border: '1px solid rgba(255,215,0,0.4)',
                boxShadow: `0 0 6px ${SEGMENT_COLORS[i % SEGMENT_COLORS.length]}80`,
              }}
            />
            {/* Segment number */}
            <span
              className="flex-shrink-0 text-xs w-4 text-center"
              style={{ color: 'rgba(255,215,0,0.5)', fontFamily: 'var(--font-cinzel)' }}
            >
              {i + 1}
            </span>
            {/* Input */}
            <input
              type="text"
              maxLength={20}
              value={seg}
              onChange={(e) => handleChange(i, e.target.value)}
              className="flex-1 rounded px-3 py-2 text-sm outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,215,0,0.2)',
                color: '#f9fafb',
                fontFamily: 'var(--font-inter)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.7)';
                e.currentTarget.style.boxShadow = '0 0 8px rgba(255,215,0,0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        ))}
      </div>

      <p
        className="mt-4 text-center text-xs"
        style={{ color: 'rgba(255,215,0,0.3)' }}
      >
        최대 20자
      </p>
    </div>
  );
}
