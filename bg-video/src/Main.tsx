import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Background } from './Background';
import { MacWindow } from './MacWindow';
import { CodeBlock } from './CodeBlock';
import { SNIPPETS } from './snippets';
import { WindowData } from './types';

const WINDOWS: WindowData[] = [
  {
    x: 100,
    y: 65,
    width: 530,
    height: 410,
    title: 'users.service.ts — TypeScript',
    language: 'TypeScript',
    enterAt: 0,
    enterFrom: 'left',
    snippet: SNIPPETS.typescript,
  },
  {
    x: 710,
    y: 90,
    width: 530,
    height: 400,
    title: 'routes/users.py — Python',
    language: 'Python',
    enterAt: 25,
    enterFrom: 'right',
    snippet: SNIPPETS.python,
  },
  {
    x: 1340,
    y: 55,
    width: 510,
    height: 410,
    title: 'user_repository.dart — Dart',
    language: 'Dart',
    enterAt: 50,
    enterFrom: 'top',
    snippet: SNIPPETS.dart,
  },
  {
    x: 200,
    y: 575,
    width: 1520,
    height: 350,
    title: 'UsersController.cs — C#',
    language: 'C#',
    enterAt: 75,
    enterFrom: 'bottom',
    snippet: SNIPPETS.csharp,
  },
];

export const CodingBackground: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      {WINDOWS.map((w, i) => (
        <MacWindow
          key={w.language}
          x={w.x}
          y={w.y}
          width={w.width}
          height={w.height}
          title={w.title}
          language={w.language}
          enterAt={w.enterAt}
          enterFrom={w.enterFrom}
          windowIndex={i}
        >
          <CodeBlock snippet={w.snippet} enterAt={w.enterAt + 12} linesPerSecond={0.12} />
        </MacWindow>
      ))}
    </AbsoluteFill>
  );
};
