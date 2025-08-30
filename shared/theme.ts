export const theme = {
  colors: {
    bg: '#080808',
    fg: '#E6E6E6',
    muted: '#0F0F0F',
    grid: '#161616',
    card: '#0B0B0B',
    border: '#151515',
    lime: '#D1E231',
    purple: '#873BBF',
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Inter-Black',
    body: 'Inter-Regular',
    mono: 'SourceCodePro-Regular'
  },
  animations: {
    driftSlow: 36000,
    driftMed: 28000,
    blink: 10000
  }
} as const;

export type Theme = typeof theme;
