import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { Snippet } from './types';

const FONT_FAMILY = "'SF Mono', 'Fira Code', 'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace";

interface CodeBlockProps {
  snippet: Snippet;
  enterAt: number;
  linesPerSecond: number;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ snippet, enterAt, linesPerSecond }) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - enterAt);

  const totalLines = snippet.lines.length;

  const revealCount = interpolate(localFrame * linesPerSecond, [0, totalLines - 1], [1, totalLines], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const visibleLines = Math.min(totalLines, Math.max(0, Math.floor(revealCount)));

  return (
    <div
      style={{
        flex: 1,
        padding: '16px 0 16px 16px',
        fontFamily: FONT_FAMILY,
        fontSize: 11,
        lineHeight: 1.6,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {snippet.lines.slice(0, visibleLines).map((line, lineIdx) => {
        const isNewLine = lineIdx === visibleLines - 1;
        const lineOpacity = isNewLine
          ? interpolate(
              localFrame * linesPerSecond,
              [visibleLines - 1, visibleLines - 0.5],
              [0.3, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
          : 1;

        return (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              opacity: lineOpacity,
              height: 18,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.2)',
                minWidth: 28,
                textAlign: 'right',
                marginRight: 16,
                fontSize: 10,
                userSelect: 'none',
              }}
            >
              {lineIdx + 1}
            </span>
            <span style={{ whiteSpace: 'pre' }}>
              {line.tokens.length === 0
                ? '\u00A0'
                : line.tokens.map((token, tokenIdx) => (
                    <span
                      key={tokenIdx}
                      style={{
                        color: token.color || '#D4D4D4',
                        fontStyle: token.italic ? 'italic' : undefined,
                      }}
                    >
                      {token.text}
                    </span>
                  ))}
            </span>
          </div>
        );
      })}
    </div>
  );
};
