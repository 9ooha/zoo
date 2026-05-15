'use client';

import { Trophy } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface WinnerBannerProps {
  winner: string;
  color: string;
  onClose: () => void;
}

export function WinnerBanner({ winner, color, onClose }: WinnerBannerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center z-50 cursor-pointer"
      style={{
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      {/* Confetti particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm pointer-events-none"
          style={{
            background: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][i % 5],
            left: `${5 + (i * 4.5) % 90}%`,
            top: `${10 + (i * 7) % 30}%`,
            animation: `confetti-fall ${0.8 + (i % 4) * 0.3}s ease-in ${(i % 6) * 0.1}s forwards`,
            transform: `rotate(${i * 37}deg)`,
          }}
        />
      ))}

      <div
        className="relative flex flex-col items-center gap-6 rounded-3xl px-12 py-10 text-center max-w-sm mx-4"
        style={{
          background: 'linear-gradient(135deg, #0d0d1f 0%, #1a1a2e 50%, #0d0d1f 100%)',
          border: '2px solid #FFD700',
          boxShadow: '0 0 60px #FFD700, 0 0 120px rgba(255,215,0,0.3), inset 0 1px 0 rgba(255,215,0,0.2)',
          animation: 'winner-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner decorations */}
        <div className="absolute top-3 left-3 text-yellow-400 text-lg opacity-50">✦</div>
        <div className="absolute top-3 right-3 text-yellow-400 text-lg opacity-50">✦</div>
        <div className="absolute bottom-3 left-3 text-yellow-400 text-lg opacity-50">✦</div>
        <div className="absolute bottom-3 right-3 text-yellow-400 text-lg opacity-50">✦</div>

        {/* Trophy icon */}
        <div
          className="p-4 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            boxShadow: `0 0 30px ${color}60`,
          }}
        >
          <Trophy
            size={56}
            style={{ color: '#FFD700', filter: 'drop-shadow(0 0 12px #FFD700)' }}
          />
        </div>

        {/* Winner text */}
        <div>
          <p
            className="text-sm tracking-[0.3em] uppercase mb-2"
            style={{
              fontFamily: 'var(--font-cinzel)',
              color: 'rgba(255,215,0,0.7)',
            }}
          >
            🎉 Winner! 🎉
          </p>
          <h2
            className="text-3xl font-black leading-tight"
            style={{
              fontFamily: 'var(--font-cinzel)',
              color: '#FFD700',
              textShadow: '0 0 20px rgba(255,215,0,0.8)',
              wordBreak: 'break-word',
            }}
          >
            {winner}
          </h2>
        </div>

        {/* Color accent bar */}
        <div
          className="w-full h-1 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="px-8 py-3 rounded-full font-bold tracking-widest uppercase text-sm transition-all duration-200 cursor-pointer"
          style={{
            fontFamily: 'var(--font-cinzel)',
            background: 'linear-gradient(180deg, #FFD700 0%, #B8860B 100%)',
            color: '#1a0a00',
            boxShadow: '0 0 15px rgba(255,215,0,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255,215,0,0.8)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255,215,0,0.4)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          다시 돌리기
        </button>
      </div>
    </div>
  );
}
