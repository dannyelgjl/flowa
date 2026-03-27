export const theme = {
  borderRadius: {
    lg: '28px',
    md: '18px',
    sm: '12px',
    pill: '999px',
  },
  colors: {
    background: '#07111d',
    backgroundAccent: '#0d3141',
    surface: 'rgba(9, 23, 38, 0.86)',
    surfaceSoft: 'rgba(245, 239, 229, 0.08)',
    card: '#f5efe5',
    cardStrong: '#fffaf2',
    cardMuted: '#d9d3ca',
    textPrimary: '#07111d',
    textSecondary: '#4e5967',
    textInverse: '#f5efe5',
    textMutedInverse: '#aeb9c5',
    line: 'rgba(245, 239, 229, 0.14)',
    lineStrong: 'rgba(7, 17, 29, 0.12)',
    success: '#00875f',
    warning: '#bf7b12',
    danger: '#c13f32',
    info: '#0c6d7e',
    buy: '#0d8f7a',
    sell: '#cc5f35',
    accent: '#e7c66d',
    accentStrong: '#f4b942',
  },
  shadow: {
    panel: '0 28px 70px rgba(0, 0, 0, 0.28)',
    soft: '0 16px 40px rgba(0, 0, 0, 0.16)',
  },
  fonts: {
    heading: "'Space Grotesk', 'Trebuchet MS', sans-serif",
    body: "'IBM Plex Sans', 'Segoe UI', sans-serif",
    mono: "'IBM Plex Mono', 'SFMono-Regular', monospace",
  },
} as const;

export type AppTheme = typeof theme;
