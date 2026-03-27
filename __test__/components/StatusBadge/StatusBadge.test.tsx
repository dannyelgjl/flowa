import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from '@/components/StatusBadge';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('StatusBadge', () => {
  it('traduz labels de lado e status', () => {
    renderWithProviders(
      <>
        <StatusBadge kind="side" value="BUY" />
        <StatusBadge kind="status" value="EXECUTED" />
      </>,
      { withRouter: false },
    );

    expect(screen.getByText('Compra')).toBeInTheDocument();
    expect(screen.getByText('Executada')).toBeInTheDocument();
  });
});
