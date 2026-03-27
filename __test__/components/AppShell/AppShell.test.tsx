import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppShell } from '@/components/AppShell';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('AppShell', () => {
  it('renderiza a navegação principal e o conteúdo interno', () => {
    renderWithProviders(
      <Routes>
        <Route element={<AppShell />} path="/">
          <Route element={<div>Conteúdo da rota</div>} index />
        </Route>
      </Routes>,
    );

    expect(screen.getByText('BASE Exchange')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Book' })).toHaveAttribute(
      'href',
      '/orders',
    );
    expect(screen.getByRole('link', { name: 'Nova ordem' })).toHaveAttribute(
      'href',
      '/orders/new',
    );
    expect(screen.getByText('Conteúdo da rota')).toBeInTheDocument();
  });
});
