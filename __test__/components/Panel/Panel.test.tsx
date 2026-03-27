import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Panel } from '@/components/Panel';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('Panel', () => {
  it('renderiza o conteúdo interno', () => {
    renderWithProviders(<Panel>Resumo do painel</Panel>, { withRouter: false });

    expect(screen.getByText('Resumo do painel')).toBeInTheDocument();
  });
});
