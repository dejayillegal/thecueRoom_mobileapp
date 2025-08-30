export const theme = {
  colors: {
    background: '#0B0B0B',
    surface: '#111111',
    primary: '#D1FF3D',
    accent: '#873BBF',
    text: '#FFFFFF',
    textMuted: '#C7C7C7',
    border: '#1E1E1E'
  },
  fonts: {
    heading: 'Inter-Black',
    body: 'Inter-Regular',
    mono: 'SourceCodePro-Regular'
  }
} as const;

export type Theme = typeof theme;
