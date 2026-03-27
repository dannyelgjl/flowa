import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap');

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.textInverse};
    font-family: ${({ theme }) => theme.fonts.body};
    background:
      radial-gradient(circle at top left, rgba(231, 198, 109, 0.16), transparent 30%),
      radial-gradient(circle at top right, rgba(13, 109, 126, 0.28), transparent 28%),
      linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.backgroundAccent} 100%);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(245, 239, 229, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 239, 229, 0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
