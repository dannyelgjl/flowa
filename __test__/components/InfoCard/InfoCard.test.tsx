import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InfoCard } from '@/components/InfoCard';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('InfoCard', () => {
  it('renderiza label, valor e texto de apoio', () => {
    renderWithProviders(
      <InfoCard
        label="Ordens abertas"
        support="Disponíveis para casar."
        value="5"
      />,
      { withRouter: false },
    );

    expect(screen.getByText('Ordens abertas')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Disponíveis para casar.')).toBeInTheDocument();
  });

  it('renderiza sem texto de apoio quando support não é informado', () => {
    renderWithProviders(
      <InfoCard label="Volume" tone="success" value="100" />,
      { withRouter: false },
    );

    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
