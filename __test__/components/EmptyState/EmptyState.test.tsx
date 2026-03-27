import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from '@/components/EmptyState';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('EmptyState', () => {
  it('renderiza título e descrição', () => {
    renderWithProviders(
      <EmptyState
        description="Nada encontrado para os filtros aplicados."
        title="Sem resultados"
      />,
      { withRouter: false },
    );

    expect(screen.getByText('Sem resultados')).toBeInTheDocument();
    expect(
      screen.getByText('Nada encontrado para os filtros aplicados.'),
    ).toBeInTheDocument();
  });
});
