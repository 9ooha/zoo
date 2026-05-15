'use client';

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
        background: '#fafafa',
        border: '1px solid #E8D5F5',
        boxShadow: '0 4px 20px rgba(201,169,233,0.1)',
      }}
    >
      <h2
        className="text-lg font-bold mb-5 text-center tracking-wider"
        style={{
          fontFamily: 'var(--font-cinzel)',
          color: '#9B72CF',
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
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            />
            {/* Segment number */}
            <span
              className="flex-shrink-0 text-xs w-4 text-center"
              style={{ color: '#B0B0C0', fontFamily: 'var(--font-cinzel)' }}
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
                background: '#ffffff',
                border: '1px solid #E0E0E8',
                color: '#4A4A5A',
                fontFamily: 'var(--font-inter)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#C9A9E9';
                e.currentTarget.style.boxShadow = '0 0 6px rgba(201,169,233,0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E0E0E8';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        ))}
      </div>

      <p
        className="mt-4 text-center text-xs"
        style={{ color: '#C0C0D0' }}
      >
        최대 20자
      </p>
    </div>
  );
}
