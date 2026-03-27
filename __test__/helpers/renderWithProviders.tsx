/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

interface RenderWithProvidersOptions {
  route?: string;
  withRouter?: boolean;
}

function Providers({
  children,
  route = '/',
  withRouter = true,
}: PropsWithChildren<RenderWithProvidersOptions>) {
  const content = withRouter ? (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  ) : (
    children
  );

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', withRouter = true }: RenderWithProvidersOptions = {},
) {
  return render(
    <Providers route={route} withRouter={withRouter}>
      {ui}
    </Providers>,
  );
}
