import React from 'react';
import { interpolate, Easing, useCurrentFrame } from 'remotion';
import { EnterDirection } from './types';

interface MacWindowProps {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  language: string;
  enterAt: number;
  enterFrom: EnterDirection;
  windowIndex: number;
  children: React.ReactNode;
}

const WINDOW_BORDER_RADIUS = 10;

const trafficLightColors = ['#ff4fa3', '#8b00ff', '#00fff5'];

export const MacWindow: React.FC<MacWindowProps> = ({
  x,
  y,
  width,
  height,
  title,
  enterAt,
  enterFrom,
  windowIndex,
  children,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - enterAt);

  const enterDuration = 35;
  const enterProgress = interpolate(localFrame, [0, enterDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const opacity = interpolate(enterProgress, [0, 0.25, 1], [0, 0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const enterDistance = 120;
  let offsetX = 0;
  let offsetY = 0;

  if (enterFrom === 'left') offsetX = interpolate(enterProgress, [0, 1], [-enterDistance, 0]);
  else if (enterFrom === 'right') offsetX = interpolate(enterProgress, [0, 1], [enterDistance, 0]);
  else if (enterFrom === 'top') offsetY = interpolate(enterProgress, [0, 1], [-enterDistance, 0]);
  else if (enterFrom === 'bottom') offsetY = interpolate(enterProgress, [0, 1], [enterDistance, 0]);

  const floatFrame = Math.max(0, localFrame - enterDuration);
  const floatY = Math.sin(floatFrame * 0.02 + windowIndex * 1.5) * 7;
  const floatX = Math.sin(floatFrame * 0.015 + windowIndex * 2.3) * 4;
  const rotation = Math.sin(floatFrame * 0.012 + windowIndex * 1.8) * 0.18;

  const currentX = x + offsetX + floatX;
  const currentY = y + offsetY + floatY;

  return (
    <div
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        width,
        height,
        opacity,
        transform: `rotate(${rotation}deg)`,
        borderRadius: WINDOW_BORDER_RADIUS,
        background: 'linear-gradient(155deg, rgba(10, 10, 22, 0.82), rgba(12, 7, 28, 0.72))',
        border: windowIndex % 2 === 0 ? '1px solid rgba(0, 255, 245, 0.17)' : '1px solid rgba(255, 0, 170, 0.15)',
        boxShadow: `
          0 20px 70px rgba(0, 0, 0, 0.48),
          0 0 34px ${windowIndex % 2 === 0 ? 'rgba(0, 255, 245, 0.08)' : 'rgba(255, 0, 170, 0.08)'},
          inset 0 1px 0 rgba(255, 255, 255, 0.06),
          inset 0 -1px 0 rgba(0, 255, 245, 0.04)
        `,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backdropFilter: 'blur(22px) saturate(120%)',
      }}
    >
      <div
        style={{
          height: 34,
          background: 'linear-gradient(90deg, rgba(0,255,245,0.09), rgba(255,0,170,0.06), rgba(139,0,255,0.08))',
          borderBottom: '1px solid rgba(0, 255, 245, 0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          borderTopLeftRadius: WINDOW_BORDER_RADIUS,
          borderTopRightRadius: WINDOW_BORDER_RADIUS,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {trafficLightColors.map((color, i) => (
            <div
              key={i}
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                backgroundColor: color,
                opacity: 0.78,
                boxShadow: `0 0 10px ${color}`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 12,
            color: 'rgba(240,240,245,0.55)',
            fontFamily:
              "'Space Grotesk', -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
            fontWeight: 500,
            letterSpacing: 0.4,
            pointerEvents: 'none',
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};
