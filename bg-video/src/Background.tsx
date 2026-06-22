import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const PARTICLES = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 83) % 1920,
  top: (i * 149) % 1080,
  size: 2 + (i % 4),
  delay: i * 11,
  color: i % 3 === 0 ? '#00fff5' : i % 3 === 1 ? '#ff00aa' : '#8b00ff',
}));

const DATA_GLYPHS = ['api', 'db', '{}', '</>', 'ops', 'ui', 'fn', 'sql', 'ci', 'jwt'];

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse = interpolate(Math.sin(frame * 0.008), [-1, 1], [0.78, 1]);
  const drift = frame % 450;
  const gridOffset = (frame * 0.36) % 96;
  const ringRotation = frame * 0.06;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 78% 58% at 50% 42%, rgba(0, 255, 245, ${0.1 * pulse}), transparent 58%),
            radial-gradient(ellipse 46% 42% at 18% 72%, rgba(255, 0, 170, 0.14), transparent 68%),
            radial-gradient(ellipse 48% 48% at 82% 24%, rgba(139, 0, 255, 0.18), transparent 66%),
            radial-gradient(ellipse 90% 80% at 50% 50%, rgba(5, 5, 8, 0.1), rgba(5, 5, 8, 0.78) 72%),
            linear-gradient(160deg, #050508 0%, #070714 36%, #0d0820 66%, #050508 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.11,
          backgroundImage:
            'linear-gradient(rgba(0,255,245,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,255,0.2) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          backgroundPosition: `0 ${gridOffset}px, ${gridOffset * -0.45}px 0`,
          transform: 'perspective(900px) rotateX(58deg) translateY(210px) scale(1.35)',
          transformOrigin: '50% 78%',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.65) 34%, black 100%)',
        }}
      />

      {PARTICLES.map((particle, i) => {
        const travel = ((drift + particle.delay) % 450) / 450;
        const y = particle.top - travel * 160;
        const opacity = interpolate(Math.sin((frame + particle.delay) * 0.026), [-1, 1], [0.18, 0.7]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: particle.left,
              top: y < -20 ? y + 1120 : y,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              opacity,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${12 + particle.size * 3}px ${particle.color}`,
            }}
          />
        );
      })}

      {DATA_GLYPHS.map((glyph, i) => {
        const x = 120 + ((i * 197 + frame * 0.18) % 1680);
        const y = 110 + ((i * 89 + Math.sin(frame * 0.01 + i) * 24) % 820);

        return (
          <div
            key={glyph}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              color: i % 2 === 0 ? 'rgba(0,255,245,0.16)' : 'rgba(255,0,170,0.12)',
              fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
              fontSize: 18,
              letterSpacing: 2,
              textTransform: 'uppercase',
              transform: `translateY(${Math.sin(frame * 0.018 + i) * 9}px)`,
            }}
          >
            {glyph}
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          right: 135,
          top: 118,
          width: 390,
          height: 390,
          borderRadius: '50%',
          border: '1px solid rgba(0,255,245,0.18)',
          boxShadow: 'inset 0 0 34px rgba(0,255,245,0.08), 0 0 42px rgba(139,0,255,0.12)',
          transform: `rotate(${ringRotation}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 210,
          top: 190,
          width: 250,
          height: 250,
          borderRadius: '50%',
          border: '1px dashed rgba(255,0,170,0.22)',
          transform: `rotate(${-ringRotation * 1.6}deg)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: -160,
          bottom: 70,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,245,0.14), rgba(139,0,255,0.1) 38%, transparent 68%)',
          filter: 'blur(2px)',
          transform: `scale(${pulse})`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 48% 58% at 50% 48%, rgba(5,5,8,0.72) 0%, rgba(5,5,8,0.38) 42%, transparent 72%)',
          mixBlendMode: 'multiply',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(115deg, transparent 0%, rgba(0,255,245,0.07) 38%, transparent 51%, rgba(255,0,170,0.06) 67%, transparent 100%)',
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
};
