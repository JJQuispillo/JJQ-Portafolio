export interface Token {
  text: string;
  color?: string;
  italic?: boolean;
}

export interface CodeLine {
  tokens: Token[];
}

export interface Snippet {
  language: string;
  filename: string;
  lines: CodeLine[];
}

export type EnterDirection = 'left' | 'right' | 'top' | 'bottom';

export interface WindowData {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  language: string;
  enterAt: number;
  enterFrom: EnterDirection;
  snippet: Snippet;
}
